import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch (parseErr) {
      console.error("Send postcard: request body parse failed", parseErr);
      return NextResponse.json(
        { error: "Request too large or invalid. Try a smaller photo or refresh and try again." },
        { status: 413 }
      );
    }
    const {
      postcardImageUrl,
      postcardImageDataUrl,
      senderName,
      senderEmail,
      recipientName,
      recipientEmail: rawRecipientEmail,
      message,
    } = body as Record<string, unknown>;

    const recipientEmail = typeof rawRecipientEmail === "string" ? rawRecipientEmail.trim() : "";
    let imageSrc = typeof postcardImageDataUrl === "string" ? postcardImageDataUrl : (typeof postcardImageUrl === "string" ? postcardImageUrl : "");
    const safeMessageStr = typeof message === "string" ? message : "";
    const safeSenderNameStr = typeof senderName === "string" ? senderName : "";

    if (!imageSrc) {
      return NextResponse.json(
        { error: "Missing postcard image." },
        { status: 400 }
      );
    }
    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Please enter the recipient email address." },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid recipient email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email is not configured. Set RESEND_API_KEY." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const escapeHtml = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    const safeMessage = safeMessageStr ? escapeHtml(safeMessageStr).replace(/\n/g, "<br>") : "Thinking of you from my trip.";
    const safeSenderName = escapeHtml(safeSenderNameStr || "A friend");

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You've received a postcard</title>
</head>
<body style="margin:0; padding:0; background:#f9f7f4; font-family: system-ui, sans-serif;">
  <div style="max-width:520px; margin:0 auto; padding:24px;">
    <div style="background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">
      <div style="padding:24px;">
        <!-- Image is now attached. Most email clients display attachments at the bottom or top. -->
        <p style="text-align:center; color:#6b6560; font-size:14px; font-style:italic;">(See the attached postcard image)</p>
        <p style="margin:24px 0 16px; font-size:16px; line-height:1.6; color:#2d2a26;">${safeMessage}</p>
        <p style="margin:0; font-size:14px; color:#4a453e;">— ${safeSenderName}</p>
      </div>
    </div>
    <p style="margin-top:16px; font-size:12px; color:#6b6560;">Sent via Travel Postcard Generator</p>
  </div>
</body>
</html>
`;

    const replyTo = typeof senderEmail === "string" && senderEmail.trim() ? senderEmail.trim() : undefined;

    const attachments = [];
    if (imageSrc.startsWith("data:image/")) {
      const parts = imageSrc.split(",");
      if (parts.length === 2) {
        let contentType = "image/jpeg";
        const match = imageSrc.match(/data:(image\/[^;]+);base64,/);
        if (match) {
          contentType = match[1];
        }
        attachments.push({
          filename: "postcard.jpg",
          content: Buffer.from(parts[1], "base64"),
          contentType: contentType,
        });
      }
    }

    const { data, error } = await resend.emails.send({
      from: "hello@arria.fun",
      to: recipientEmail,
      subject: "You've received a postcard from a trip!",
      html,
      replyTo,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("Resend API error:", error);
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "Failed to send email.";
      return NextResponse.json(
        { error: message },
        { status: 500 }
      );
    }

    console.log("Postcard email sent:", data?.id, "to", recipientEmail);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Send postcard error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to send postcard.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}


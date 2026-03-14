import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const POSTCARD_PROMPT =
  "Transform this travel photo into a beautiful illustrated travel postcard. Preserve the main scene and landmarks but apply a soft hand-painted postcard style, warm tones, vintage paper texture, and a charming travel postcard aesthetic.";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File | null;
    const prompt =
      (formData.get("prompt") as string) || POSTCARD_PROMPT;

    if (!image || !image.size) {
      return NextResponse.json(
        { error: "Missing or invalid image file." },
        { status: 400 }
      );
    }

    const apiToken = process.env.REPLICATE_API_TOKEN;
    if (!apiToken) {
      return NextResponse.json(
        { error: "AI generation is not configured. Set REPLICATE_API_TOKEN." },
        { status: 503 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString("base64");
    const mime = image.type || "image/jpeg";
    const dataUri = `data:${mime};base64,${base64}`;

    const replicate = new Replicate({ auth: apiToken });

    // Instruct-pix2pix: image + instruction -> edited image
    const output = await replicate.run(
      "timothybrooks/instruct-pix2pix:30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
      {
        input: {
          image: dataUri,
          prompt,
          num_inference_steps: 20,
          image_guidance_scale: 1.5,
          guidance_scale: 7.5,
        },
      }
    );

    // Output can be string (URL) or string[] (multiple outputs)
    const imageUrl = Array.isArray(output) ? output[0] : (output as string);
    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "No image URL returned from AI model." },
        { status: 502 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error("Generate postcard error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to generate postcard.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

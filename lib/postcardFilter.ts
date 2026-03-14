/**
 * 本地免费明信片风格：暖色 + 暗角，无需任何 API。
 * 输出尺寸和压缩控制在一定范围内，避免请求体过大。
 */

const MAX_SIZE = 800; // 最长边像素，控制生成图大小
const JPEG_QUALITY = 0.82;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Image failed to load. Try another image."));
    };
    img.src = url;
  });
}

function drawWarmPostcard(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    // 暖色：加强红/橙，略减蓝
    const warmR = Math.min(255, r * 1.08 + 12);
    const warmG = Math.min(255, g * 1.02 + 5);
    const warmB = Math.max(0, b * 0.92 - 8);
    data[i] = warmR;
    data[i + 1] = warmG;
    data[i + 2] = warmB;
  }
  ctx.putImageData(imageData, 0, 0);

  // 暗角
  const gradient = ctx.createRadialGradient(
    w / 2, h / 2, 0,
    w / 2, h / 2, Math.max(w, h) * 0.7
  );
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.6, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(40,30,20,0.35)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

export async function applyPostcardFilter(file: File): Promise<string> {
  const img = await loadImage(file);
  let { width, height } = img;

  if (width > MAX_SIZE || height > MAX_SIZE) {
    if (width >= height) {
      height = Math.round((height * MAX_SIZE) / width);
      width = MAX_SIZE;
    } else {
      width = Math.round((width * MAX_SIZE) / height);
      height = MAX_SIZE;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported. Try Chrome or Safari.");

  ctx.drawImage(img, 0, 0, width, height);
  drawWarmPostcard(ctx, width, height);

  try {
    return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
  } catch {
    throw new Error("Generation failed. Try another image.");
  }
}

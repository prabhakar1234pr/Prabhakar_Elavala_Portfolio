import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Icon() {
  const imagePath = path.join(process.cwd(), "public", "prabhakar.jpg");
  const imageBuffer = await readFile(imagePath);
  const imageDataUrl = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "8px",
          background: "#0a0a0a",
        }}
      >
        <img
          src={imageDataUrl}
          alt="Prabhakar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

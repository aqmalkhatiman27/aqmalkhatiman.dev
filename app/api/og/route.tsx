import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "aqmalkhatiman.dev OpenGraph Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function cleanParam(value: string | null, fallback: string): string {
  if (!value) {
    return fallback;
  }
  return value.trim().slice(0, 140) || fallback;
}

export async function GET(request: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(request.url);
  const title = cleanParam(
    searchParams.get("title"),
    "Aqmal Khatiman (Solihin)",
  );
  const tag = cleanParam(searchParams.get("tag"), "Technology");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f7f7f5",
          color: "#111111",
          border: "1px solid #d6d6d2",
          padding: "64px",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#4d4d4d",
          }}
        >
          <span>aqmalkhatiman.dev</span>
          <span
            style={{
              border: "1px solid #bdbdb8",
              borderRadius: 9999,
              padding: "8px 18px",
              fontSize: 20,
            }}
          >
            {tag}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.1,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            maxWidth: "1000px",
            textWrap: "balance",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#3f3f3f",
          }}
        >
          <span>Aqmal Khatiman</span>
          <span>Minimal Notes & Execution</span>
        </div>
      </div>
    ),
    size,
  );
}

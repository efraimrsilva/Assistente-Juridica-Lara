import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#142B4A",
          color: "#F5F2EA",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ color: "#CBAA5A", fontSize: 30, letterSpacing: 8, textTransform: "uppercase" }}>
          Assistente Jurídica na ACF
        </div>
        <div style={{ fontSize: 96, fontWeight: 600, marginTop: 36 }}>Lara Coelho</div>
        <div style={{ color: "#E5DFD1", fontSize: 34, marginTop: 28, textAlign: "center" }}>
          Acolhimento inicial, organização e encaminhamento.
        </div>
      </div>
    ),
    size,
  );
}

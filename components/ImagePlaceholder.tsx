import type { CSSProperties } from "react";

type ImagePlaceholderProps = {
  caption: string;
  style?: CSSProperties;
  round?: boolean;
};

/**
 * Production stand-in for the prototype's <image-slot> — a striped
 * placeholder with a monospace caption naming what goes there.
 */
export default function ImagePlaceholder({ caption, style, round }: ImagePlaceholderProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "10px",
        background:
          "repeating-linear-gradient(45deg, #EAF3F4, #EAF3F4 10px, #F5FAFA 10px, #F5FAFA 20px)",
        color: "#6D9599",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        fontSize: "11px",
        lineHeight: 1.4,
        borderRadius: round ? "50%" : undefined,
        ...style,
      }}
    >
      {caption}
    </div>
  );
}

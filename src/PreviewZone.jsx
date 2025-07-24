import React, { useEffect, useRef } from "react";
import { useShape } from "./dataContext";

export default function PreviewZone() {
  const {
    shape,
    color,
    size,
    setColor,
    drawShape,
  } = useShape();
  const previewCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
  canvas.height = 150;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawShape(
      ctx,
      shape,
      canvas.width / 2,
      canvas.height / 2,
      color,
      size,
      1
    );
  }, [shape, size, color]);
  return (
    <div>
      <canvas id="previewCanvas" ref={previewCanvasRef}></canvas>
    </div>
  );
}

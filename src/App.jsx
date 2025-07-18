import React, { useRef, useState } from "react";

export default function App() {
  const canvasRef = useRef(null);
  const [shape, setShape] = useState("");
  function drawShape(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.strokeStyle = "black";

    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    if (shape === "square") {
      ctx.fillRect(x - 20, y - 20, 40, 40);
      ctx.strokeRect(x - 20, y - 20, 40, 40);
    }

    if (shape === "triangle") {
      ctx.beginPath();
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x - 30, y + 20);
      ctx.lineTo(x + 30, y + 20);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "1px solid black" }}
        onClick={drawShape}
      />
      <button
        onClick={() => {
          setShape("circle");
        }}
      >
        O
      </button>
      <button
        onClick={() => {
          setShape("square");
        }}
      >
        ם
      </button>
      <button
        onClick={() => {
          setShape("triangle");
        }}
      >
        ^
      </button>
    </div>
  );
}

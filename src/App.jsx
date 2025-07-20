// import React, { useRef, useState } from "react";

// export default function App() {
//   const canvasRef = useRef(null);
//   const [shape, setShape] = useState("");
//   const [color, setColor] = useState("white");
//   const [size, setSize] = useState("");
//   function drawShape(event) {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     const ctx = canvas.getContext("2d");
//     ctx.fillStyle = color;
//     ctx.strokeStyle = "black";

//     if (shape === "circle") {
//       ctx.beginPath();
//       ctx.arc(x, y, 30, 0, 2 * Math.PI);
//       ctx.fill();
//       ctx.stroke();
//     }

//     if (shape === "square") {
//       ctx.fillRect(x - 20, y - 20, 60, 60);
//       ctx.strokeRect(x - 20, y - 20, 40, 40);
//     }

//     if (shape === "triangle") {
//       ctx.beginPath();
//       ctx.moveTo(x, y - 30);
//       ctx.lineTo(x - 30, y + 20);
//       ctx.lineTo(x + 30, y + 20);
//       ctx.closePath();
//       ctx.fill();
//       ctx.stroke();
//     }
//   }

//   return (
//     <div>
//       <canvas
//         ref={canvasRef}
//         width={400}
//         height={200}
//         style={{ border: "1px solid black" }}
//         onClick={drawShape}
//       />
//       <button
//         onClick={() => {
//           setShape("circle");
//         }}
//       >
//         O
//       </button>
//       <button
//         onClick={() => {
//           setShape("square");
//         }}
//       >
//         ם
//       </button>
//       <button
//         onClick={() => {
//           setShape("triangle");
//         }}
//       >
//         ^
//       </button>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect } from "react";
import { useShape } from "./dataContext";
import ColorZone from "./colorZone";
import SizeZone from "./SizeZone";
import ShapeZone from "./ShapeZone";
import "./style.css";
export default function CanvasWithShapes() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);
  const [shapes, setShapes] = useState([]);
  const { shape, setShape, size, color } = useShape();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // צייר צורות קבועות
    shapes.forEach((shape) => {
      drawShape(ctx, shape.type, shape.x, shape.y, shape.color, 1);
    });

    // צייר תצוגה מקדימה של הצורה הזמנית
    if (mousePos) {
      drawShape(ctx, shape, mousePos.x, mousePos.y, "gray", 0.3);
    }
  }, [mousePos, shapes, shape]);

  const drawShape = (ctx, type, x, y, color, opacity) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    const size = 50;

    if (type === "rect") {
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    } else if (type === "circle") {
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
      ctx.fill();
    } else if (type === "triangle") {
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2);
      ctx.lineTo(x - size / 2, y + size / 2);
      ctx.lineTo(x + size / 2, y + size / 2);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    if (mousePos) {
      setShapes([...shapes, { x: mousePos.x, y: mousePos.y, type: shape,color:color }]);
    }
  };

  return (
    <div id="app" style={{ textAlign: "center" }}>
      <div id="chooseDetails">
      <SizeZone id="sizeDetails" />

       <div id="colorDetails"> <ColorZone /></div> 
        <ShapeZone id="shapeDetails" />
      </div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      />
    </div>
  );
}

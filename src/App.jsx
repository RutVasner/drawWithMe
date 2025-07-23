import React, { useRef, useState, useEffect } from "react";
import { useShape } from "./dataContext";
import ColorZone from "./colorZone";
import SizeZone from "./SizeZone";
import ShapeZone from "./ShapeZone";
import "./style.css";
import DeleteZone from "./deleteZone";
import { Card } from "@mui/material";
export default function CanvasWithShapes() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);
  const [shapes, setShapes] = useState([]);
  const {
    shape,
    setShape,
    size,
    setSize,
    isErasing,
    setIsErasing,
    color,
    setColor,
  } = useShape();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [shadowColor, setShadowColor] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.75 * 0.8;
    canvas.height = window.innerHeight * 0.8;
    // canvas.width = canvas.offsetWidth;
    // canvas.height = canvas.offsetHeight;

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
    } else if (type === "rectangle") {
      ctx.fillRect(
        x - (size * 1.5) / 2,
        y - (size * 0.7) / 2,
        size * 1.5,
        size * 0.7
      );
    } else if (type === "ellipse") {
      ctx.beginPath();
      ctx.ellipse(x, y, (size * 1.5) / 2, (size * 0.7) / 2, 0, 0, 2 * Math.PI);
      ctx.fill();
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
    } else if (type === "pentagon") {
      const sides = 5;
      const radius = size / 2;
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * 2 * Math.PI - Math.PI / 2;
        const px = x + radius * Math.cos(angle);
        const py = y + radius * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  };
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (isErasing && isMouseDown) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const eraserSize = 50;
      ctx.clearRect(
        mousePos.x - eraserSize / 2,
        mousePos.y - eraserSize / 2,
        eraserSize,
        eraserSize
      );
      ctx.fillStyle = "white";
      ctx.fillRect(
        mousePos.x - eraserSize / 2,
        mousePos.y - eraserSize / 2,
        eraserSize,
        eraserSize
      );
    }
  };

  const handleClick = () => {
    if (shape != "") {
      if (mousePos) {
        setShapes([
          ...shapes,
          { x: mousePos.x, y: mousePos.y, type: shape, color: color },
        ]);
        if (isErasing == false) {
          setShadowColor(!shadowColor);
          setColor("white");
          setShape("");
          setSize("");
        }
      }
    }
  };

  return (
    <div id="app">
      <div id="chooseDetails">
        <Card>
          <SizeZone id="sizeDetails" />
          <div id="colorDetails">
            <ColorZone />
          </div>
          <ShapeZone id="shapeDetails" />
          <DeleteZone />
        </Card>
      </div>
      <div id="leftSide">
        <h1>Draw With Me</h1>
        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          style={{
            boxShadow: shadowColor
              ? `0px 0px 15px 0px green`
              : `0px 0px 15px 0px red`,
          }}
        />
      </div>
    </div>
  );
}

import React, { useRef, useState, useEffect } from "react";
import { useShape } from "./dataContext";
import ColorZone from "./colorZone";
import SizeZone from "./SizeZone";
import ShapeZone from "./ShapeZone";
import "./style.css";
import DeleteZone from "./deleteZone";
import { Card } from "@mui/material";
import PreviewZone from "./PreviewZone";
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
    drawShape,
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
    if (shapes.length > 0) {
      shapes.map((item) => {
        debugger;
        drawShape(ctx, item.type, item.x, item.y, item.color, item.size, 1);
      });
    }

    // צייר תצוגה מקדימה של הצורה הזמנית
    if (mousePos) {
      drawShape(ctx, shape, mousePos.x, mousePos.y, "gray", size, 0.3);
    }
  }, [mousePos, shapes, shape]);

  const getRandomRgbColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const computerTurn = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth * 0.75 * 0.8;
    const height = window.innerHeight * 0.8;
    const xSpot = Math.floor(Math.random() * width) + 1;
    const ySpot = Math.floor(Math.random() * height) + 1;
    console.log("x-y", xSpot, ySpot);
    const randomColor = getRandomRgbColor();
    console.log("color", randomColor);
    const sizeArr = [0.5, 1, 1.5];
    const randomSize = Math.floor(Math.random() * 3);
    console.log("size", sizeArr[randomSize]);
    const shapeArr = [
      "squer",
      "circle",
      "triangle",
      "ellipse",
      "pentagon",
      "rectangle",
    ];
    const randomShape = Math.floor(Math.random() * 6);
    setShape(shapeArr[randomShape]);
    drawShape(ctx, randomSize, xSpot, ySpot, randomColor, randomSize, 1);
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
          {
            x: mousePos.x,
            y: mousePos.y,
            type: shape,
            color: color,
            size: size,
          },
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
          <PreviewZone id="previewZone" />
          <ShapeZone id="shapeDetails" />
          <SizeZone id="sizeDetails" />
          <ColorZone id="colorDetails" />
          <DeleteZone />
        </Card>
      </div>
      <div id="leftSide">
        <h1>Draw With Me</h1>
        <button onClick={computerTurn}>x-y</button>
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

import React, { createContext, useContext, useState } from "react";

// יצירת הקונטקסט
const ShapeContext = createContext();

// יצירת ה-Provider
export const ShapeProvider = ({ children }) => {
  const [shape, setShape] = useState("circle"); // דוג': circle, square, triangle
  const [size, setSize] = useState(1); // דוג': גודל ב- px
  const [color, setColor] = useState("#000000"); // דוג': צבע ב-HEX
  const [isErasing, setIsErasing] = useState(false);
  const drawShape = (ctx, type, x, y, color, size, opacity) => {
    // debugger;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    const basicSize = 50;

    if (type === "squer") {
      ctx.fillRect(
        x - (basicSize * size) / 2,
        y - (basicSize * size) / 2,
        basicSize * size,
        basicSize * size
      );
    } else if (type === "rectangle") {
      ctx.fillRect(
        x - (basicSize * size * 1.5) / 2,
        y - (basicSize * size * 0.7) / 2,
        basicSize * size * 1.5,
        basicSize * size * 0.7
      );
    } else if (type === "ellipse") {
      ctx.beginPath();
      ctx.ellipse(
        x,
        y,
        (basicSize * size * 1.5) / 2,
        (basicSize * size * 0.7) / 2,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
    } else if (type === "circle") {
      ctx.beginPath();
      ctx.arc(x, y, (basicSize * size) / 2, 0, 2 * Math.PI);
      ctx.fill();
    } else if (type === "triangle") {
      ctx.beginPath();
      ctx.moveTo(x, y - (basicSize * size) / 2);
      ctx.lineTo(x - (basicSize * size) / 2, y + (basicSize * size) / 2);
      ctx.lineTo(x + (basicSize * size) / 2, y + (basicSize * size) / 2);
      ctx.closePath();
      ctx.fill();
    } else if (type === "pentagon") {
      const sides = 5;
      const radius = (basicSize * size) / 2;
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
    // debugger;
  };
  return (
    <ShapeContext.Provider
      value={{
        shape,
        setShape,
        size,
        setSize,
        color,
        setColor,
        isErasing,
        setIsErasing,
        drawShape,
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
};

// קריאה נוחה מתוך קומפוננטות אחרות
export const useShape = () => useContext(ShapeContext);

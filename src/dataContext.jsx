import React, { createContext, useContext, useState } from "react";

// יצירת הקונטקסט
const ShapeContext = createContext();

// יצירת ה-Provider
export const ShapeProvider = ({ children }) => {
  const [shape, setShape] = useState("circle"); // דוג': circle, square, triangle
  const [size, setSize] = useState(50); // דוג': גודל ב- px
  const [color, setColor] = useState("#000000"); // דוג': צבע ב-HEX
  const [isErasing, setIsErasing] = useState(false);

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
      }}
    >
      {children}
    </ShapeContext.Provider>
  );
};

// קריאה נוחה מתוך קומפוננטות אחרות
export const useShape = () => useContext(ShapeContext);

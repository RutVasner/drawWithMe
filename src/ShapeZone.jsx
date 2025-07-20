import React from 'react'
import { useShape } from './dataContext';

export default function ShapeZone() {
    const { shape,setShape, size, color } = useShape();

  return (
    <div>
        <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setShape("rect")}>ם</button>
        <button onClick={() => setShape("circle")}>O</button>
        <button onClick={() => setShape("triangle")}>^</button>
      </div>
    </div>
  )
}

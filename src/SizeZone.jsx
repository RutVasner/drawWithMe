import React from 'react'
import { useShape } from './dataContext';

export default function SizeZone() {
    const { shape, size,setSize, color } = useShape();

  return (
    <div>

        <button onClick={()=>{setSize("big")}}>BIG</button>
        <button onClick={()=>{setSize("medium")}}>MEDIUM</button>
        <button onClick={()=>{setSize("small")}}>SMALL</button>
    </div>
  )
}

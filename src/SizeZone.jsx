import React from 'react'
import { useShape } from './dataContext';
import { Button } from '@mui/material';

export default function SizeZone() {
    const { shape, size,setSize, color } = useShape();

  return (
    <div id="sizeZone">

        <Button variant="outlined" onClick={()=>{setSize(0.5)}}>קטן</Button>
        <Button variant="outlined" onClick={()=>{setSize(1)}}>רגיל</Button>
        <Button variant="outlined" onClick={()=>{setSize(1.5)}}>גדול</Button>
    </div>
  )
}

import React from 'react'
import { useShape } from './dataContext';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Button } from '@mui/material';
export default function DeleteZone() {
    const { shape,isErasing, setIsErasing, size, color } = useShape();

  return (
    <div>
        <Button id="earseBtn" onClick={()=>{setIsErasing(!isErasing);}}><AutoFixHighIcon/></Button>
    </div>
  )
}

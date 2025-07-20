import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Box, Button } from '@mui/material';
import { useShape } from './dataContext';

export default function ColorZone() {
    const [showPicker, setShowPicker] = useState(false);
    const {  color,setColor } = useShape();

    return (
        <Box>
            <Button variant="outlined" onClick={() => setShowPicker(!showPicker)}>
                בחר צבע
            </Button>
            {showPicker && (
                <SketchPicker
                    color={color}
                    onChangeComplete={(newColor) => setColor(newColor.hex)}
                />
            )}
            <Box sx={{ mt: 2, width: 100, height: 50, backgroundColor: color }} />
        </Box>
    );
}

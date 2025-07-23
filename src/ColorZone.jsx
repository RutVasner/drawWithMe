import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Box, Button } from "@mui/material";
import { useShape } from "./dataContext";

export default function ColorZone() {
  const [showPicker, setShowPicker] = useState(false);
  const { color, setColor } = useShape();

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Button variant="outlined" onClick={() => setShowPicker(!showPicker)}>
        בחר צבע
      </Button>
      {showPicker && (
        <Box
          sx={{
            position: "absolute",
            zIndex: 10,
            top: "50px",
          }}
        >
          <SketchPicker
            color={color}
            onChangeComplete={(newColor) =>{ setColor(newColor.hex);setShowPicker(false)}}
          />
        </Box>
      )}
      <Box sx={{ mt: 2, width: 100, height: 50, backgroundColor: color }} />
    </Box>
  );
}

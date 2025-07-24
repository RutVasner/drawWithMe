import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
            boxShadow: 3,
            borderRadius: 1,
            backgroundColor: "white",
          }}
        >
          {/* כפתור סגירה קטן בפינה */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton size="small" >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <SketchPicker
            color={color}
            onChange={(newColor) => setColor(newColor.hex)}
          />
        </Box>
      )}

      {/* תצוגה של הצבע הנוכחי */}
      <Box
        sx={{
          mt: 2,
          width: 100,
          height: 50,
          backgroundColor: color,
          border: "1px solid #ccc",
        }}
      />
    </Box>
  );
}

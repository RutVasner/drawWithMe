import React from "react";
import { SketchPicker, CirclePicker } from "react-color";
import { Box } from "@mui/material";
import { useShape } from "./dataContext";

export default function ColorZone() {
  const { color, setColor } = useShape();

  return (
    <Box>
      <CirclePicker onChange={(newColor) => setColor(newColor.hex)} />
    </Box>
  );
}

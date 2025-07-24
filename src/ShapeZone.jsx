import React, { useEffect } from "react";
import { useShape } from "./dataContext";
import HexagonIcon from "@mui/icons-material/Hexagon";
import SquareIcon from "@mui/icons-material/Square";
import RectangleIcon from "@mui/icons-material/Rectangle";
import PentagonIcon from "@mui/icons-material/Pentagon";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import CircleIcon from "@mui/icons-material/Circle";
import { Button, IconButton, SvgIcon } from "@mui/material";

function EllipseIcon(props) {
  return (
    <SvgIcon {...props}>
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="6"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
      />
    </SvgIcon>
  );
}
export default function ShapeZone() {
  const { shape, setShape, size, color, setColor } = useShape();
  useEffect(() => {
    setColor("black");
  }, [shape]);
  return (
    <div
      id="shapesBtn"
      style={{ marginBottom: "10px", display: "flex", flexWrap: "wrap" }}
    >
      <Button variant="outlined" onClick={() => setShape("squer")}>
        <SquareIcon />
      </Button>
      <Button variant="outlined" onClick={() => setShape("circle")}>
        <CircleIcon />
      </Button>
      <Button variant="outlined" onClick={() => setShape("triangle")}>
        <ChangeHistoryIcon />
      </Button>
      <Button variant="outlined" onClick={() => setShape("ellipse")}>
        {" "}
        <EllipseIcon />
      </Button>
      <Button variant="outlined" onClick={() => setShape("pentagon")}>
        <PentagonIcon />
      </Button>
      <Button variant="outlined" onClick={() => setShape("rectangle")}>
        <RectangleIcon />
      </Button>
    </div>
  );
}

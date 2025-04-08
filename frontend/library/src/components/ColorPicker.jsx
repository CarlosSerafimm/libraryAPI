import React, { useState } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = () => {
  const [color, setColor] = useState({ r: 255, g: 0, b: 0, a: 1 });

  const handleChange = (color) => {
    setColor(color.rgb);
  };

  const rgba = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  return (
    <div className="p-4">
      <SketchPicker color={color} onChange={handleChange} />

      <p className="mt-4 text-sm">
        Cor selecionada (RGBA): <strong>{rgba}</strong>
      </p>

      <div
        className="w-12 h-12 mt-4 rounded border"
        style={{ backgroundColor: rgba }}
      ></div>
    </div>
  );
};

export default ColorPicker;

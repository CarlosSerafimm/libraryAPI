import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

// Função utilitária para converter string RGBA para objeto
const rgbaStringToObject = (rgba) => {
  const match = rgba.match(/rgba?\((\d+), ?(\d+), ?(\d+),? ?([\d\.]+)?\)/);
  if (!match) return { r: 0, g: 0, b: 0, a: 1 };

  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
};

const ColorPicker = ({ color, onChange }) => {
  const [internalColor, setInternalColor] = useState(rgbaStringToObject(color));

  useEffect(() => {
    setInternalColor(rgbaStringToObject(color));
  }, [color]);

  const handleChange = (color) => {
    setInternalColor(color.rgb);
    const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    onChange(rgba);
  };

  const rgba = internalColor
    ? `rgba(${internalColor.r}, ${internalColor.g}, ${internalColor.b}, ${internalColor.a})`
    : "";

  return (
    <div className="p-4">
      <SketchPicker color={internalColor} onChange={handleChange} />

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

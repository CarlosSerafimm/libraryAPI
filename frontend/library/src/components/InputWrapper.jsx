
import React from "react";

function InputWrapper({ icon: Icon, children }) {
  return (
    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
      {Icon && <Icon className="text-gray-400 mr-2" size={20} />}
      {children}
    </div>
  );
}

export default InputWrapper;

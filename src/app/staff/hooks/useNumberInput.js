// hooks/useNumberInput.js
import { useState } from 'react';

export const useNumberInput = (initialValue, options = {}) => {
  const {
    min = null,
    max = null,
    allowZero = true,
    step = null,
    onChange
  } = options;

  const [value, setValue] = useState(String(initialValue));
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/^0+/, '');
    
    // 空または数値（小数点含む）のみ許可
    if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
      setValue(newValue);
      
      // 数値として有効な場合のみonChangeを呼び出す
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        if (
          (min === null || numValue >= min) &&
          (max === null || numValue <= max) &&
          (allowZero || numValue > 0)
        ) {
          onChange?.(numValue);
        }
      }
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    e.target.select();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value === '' || isNaN(parseFloat(value))) {
      const defaultValue = allowZero ? '0' : '1';
      setValue(defaultValue);
      onChange?.(parseFloat(defaultValue));
    }
  };

  return {
    inputValue: value,
    isFocused,
    inputProps: {
      value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      type: "text",
      inputMode: "decimal",
      step: step,
    }
  };
};

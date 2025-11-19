import React from 'react';

const Radio = ({ options, value, onChange, className, pokebola, ...props }) => {
  return (
    <div className={className}>
      {options.map((option) => {
        return (
          <label key={option}>
            <input
              type="radio"
              value={option}
              checked={value === option}
              onChange={onChange}
              {...props}
            />
            <span className={pokebola}>{option}</span>
          </label>
        );
      })}
    </div>
  );
};
export default Radio;

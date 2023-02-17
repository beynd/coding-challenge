import React, { MouseEventHandler, ReactNode } from 'react';

const Checkbox = ({
  name,
  onClick,
  checked,
  disabled,
  label,
}: {
  name: string;
  label?: ReactNode;
  checked?: boolean;
  onClick: MouseEventHandler<HTMLInputElement>;
  disabled?: boolean;
}) => (
  <label>
    <input
      type="checkbox"
      name={name}
      onClick={onClick}
      disabled={disabled}
      checked={checked}
      readOnly
    />
    <span>{label || name}</span>
  </label>
);

export default Checkbox;

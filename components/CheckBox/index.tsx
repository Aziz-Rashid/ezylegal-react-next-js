import { ChangeEventHandler, FC, InputHTMLAttributes, ReactNode } from "react";

import { CheckBoxWrapper } from "./CheckBox.styled";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children: ReactNode;
}

const CheckBox: FC<CheckBoxProps> = ({ name, children, ...props }) => {
  return (
    <CheckBoxWrapper className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        name={name}
        id={`checkbox-${name}`}
        {...props}
      />
      <label className="custom-control-label" htmlFor={`checkbox-${name}`}>
        {children}
      </label>
    </CheckBoxWrapper>
  );
};

export default CheckBox;

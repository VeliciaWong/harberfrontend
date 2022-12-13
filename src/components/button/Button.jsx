import React from "react";

const background = {
  primary: "bg-[#292F36] text-white",
  submit:"bg-[#78A55A] text-white",
};
const Button = ({
  children,
  className,
  variant = "primary",
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
      className={[
        "py-2 px-6 rounded-md text-lg font-semibold",
        background[variant],
        className,
      ]
        .join(" ")
        .trim()}
    >
      {children}
    </button>
  );
};

export default Button;

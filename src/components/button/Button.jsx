import React from "react";

const background = {
  primary: "bg-gradient-to-r from-[#ffffff] to-[#c1c1c1] text-black",
  secondary: "bg-gradient-to-r from-[#888888] to-[#888888]/50 text-white",
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

import { classnames } from "../../helpers/classnames";
import { forwardRef, useId } from "react";

// eslint-disable-next-line react/display-name
const CheckboxInput = forwardRef(({ label, ...rest }, ref) => {
  const id = useId();
  return (
    <div className="flex items-center py-[6px]">
      <input
        id={id}
        ref={ref}
        {...rest}
        type="checkbox"
        className={classnames(
          "w-5 h-5 text-black border-gray-300 focus:ring-black-600 ring-offset-gray-600 focus:ring-2 bg-white",
          !rest.disabled && "cursor-pointer",
          rest.className
        )}
      />
      <label
        htmlFor={id}
        className="ml-2 select-none whitespace-nowrap text-base font-medium text-black"
      >
        {label}
      </label>
    </div>
  );
});

export default CheckboxInput;

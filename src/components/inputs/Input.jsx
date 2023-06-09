import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Input = forwardRef(({ onChange, className, prefix, affix, ...rest }, ref) => {
  return (
    <div className="flex w-full border border-gray-400 rounded-md bg-white ">
      {prefix && (
        <div className="rounded-l-lg leading-10 px-4 bg-white text-black">
          {prefix}
        </div>
      )}
      <input
      onChange={onChange}
        ref={ref}
        className={[
          "py-1 px-4 w-[350px] xs:w-[250px] sm:w-[350px] h-[26px] text-base text-black rounded-md",
          className,
          prefix && "rounded-l-none pl-0",
          affix && "rounded-r-none pr-0",
        ]
          .join(" ")
          .trim()}
        {...rest}
      />
      {affix && (
        <div className="rounded-r-lg leading-10 px-4 bg-white text-black">
          {affix}
        </div>
      )}
    </div>
  );
});

export default Input;

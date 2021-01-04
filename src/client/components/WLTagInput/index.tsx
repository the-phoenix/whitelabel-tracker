import React from "react";
import { WL_TAG_PREFIX } from "../../../core/constants";

interface WLTagInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  // className: string;
}

const WLTagInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  WLTagInputProps
> = ({ className, ...props }, ref) => (
  <div className={className}>
    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
      {WL_TAG_PREFIX}
    </span>
    <input
      ref={ref}
      type="text"
      className="input-text flex-1 block rounded-none rounded-r-md sm:text-sm pl-1"
      {...props}
    />
  </div>
);

export default React.forwardRef(WLTagInput);

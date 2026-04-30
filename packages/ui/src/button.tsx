import type { ButtonHTMLAttributes, ReactElement } from "react";

import { cn } from "./cn.js";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> {
  appName: string;
}

export function Button({
  appName,
  children,
  className,
  ...props
}: Readonly<ButtonProps>): ReactElement {
  return (
    <button
      type="button"
      className={cn("bg-primary rounded-md px-4 py-2 text-white", className)}
      {...props}
    >
      {children}
    </button>
  );
}

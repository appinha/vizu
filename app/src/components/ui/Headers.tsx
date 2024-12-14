import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

// TODO: define font-heading in tailwind config

type Props = PropsWithChildren & { className?: string };

export function H1(props: Props) {
  const { className, children } = props;

  return (
    <h1 className={cn("font-heading mb-8 text-center text-3xl", className)}>
      {children}
    </h1>
  );
}

export function H2(props: Props) {
  const { className, children } = props;

  return (
    <h2
      className={cn(
        "font-heading mb-5 text-center text-2xl font-bold",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3(props: Props) {
  const { className, children } = props;

  return (
    <h3 className={cn("font-heading mb-2 text-xl font-semibold", className)}>
      {children}
    </h3>
  );
}

export function H4(props: Props) {
  const { className, children } = props;

  return <h4 className={cn("font-medium", className)}>{children}</h4>;
}

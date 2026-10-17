import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg font-medium",
      xl: "text-2xl font-semibold",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
  },
  defaultVariants: { size: "md", tone: "default" },
});

type TextProps = ComponentProps<"p"> &
  VariantProps<typeof textVariants> & { as?: "p" | "span" | "div" };

export function Text({
  as: Tag = "p",
  className,
  size,
  tone,
  ...props
}: TextProps) {
  return (
    <Tag className={cn(textVariants({ size, tone }), className)} {...props} />
  );
}

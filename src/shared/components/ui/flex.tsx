import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

const flexVariants = cva("flex", {
  variants: {
    direction: { row: "flex-row", col: "flex-col" },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    gap: { none: "gap-0", xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-6" },
  },
  defaultVariants: { direction: "row" },
});

type FlexProps = ComponentProps<"div"> & VariantProps<typeof flexVariants>;

export function Flex({
  className,
  direction,
  align,
  justify,
  gap,
  ...props
}: FlexProps) {
  return (
    <div
      className={cn(
        flexVariants({ direction, align, justify, gap }),
        className,
      )}
      {...props}
    />
  );
}

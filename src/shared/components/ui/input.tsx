"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import type { OmitKeys } from "@/shared/types/utility";
import { cn } from "@/shared/utils/cn";

import { Flex } from "./flex";

const inputVariants = cva(
  "w-full min-w-0 rounded-md border border-input bg-transparent px-3 text-base transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm",
  {
    variants: { fieldSize: { md: "h-9", lg: "h-11" } },
    defaultVariants: { fieldSize: "md" },
  },
);

type InputProps = OmitKeys<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & {
    classNames?: { container?: string; input?: string };
  };

export function Input({
  classNames,
  fieldSize,
  className,
  ...props
}: InputProps) {
  return (
    <Flex className={cn("w-full", classNames?.container)}>
      <input
        className={cn(
          inputVariants({ fieldSize }),
          classNames?.input,
          className,
        )}
        {...props}
      />
    </Flex>
  );
}

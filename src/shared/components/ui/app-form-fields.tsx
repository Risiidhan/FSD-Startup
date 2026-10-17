"use client";

import type { ComponentProps, ReactNode } from "react";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

/** Props every `*Field` wrapper accepts on top of its input component's props. */
export type FieldProps<TProps> = TProps & {
  label?: ReactNode;
  description?: ReactNode;
};

export function FieldLabel({ children }: { children: ReactNode }) {
  return <FormLabel>{children}</FormLabel>;
}

/**
 * Use inside react-hook-form's <FormField>:
 *   <FormField control={form.control} name="email"
 *     render={({ field }) => <InputField label="Email" {...field} />} />
 */
export function InputField({
  label,
  description,
  ...props
}: FieldProps<ComponentProps<typeof Input>>) {
  return (
    <FormItem>
      {label && <FieldLabel>{label}</FieldLabel>}
      <FormControl>
        <Input {...props} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

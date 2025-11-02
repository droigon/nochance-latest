"use client";

import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // ✅ Correct import path

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

export const Select = ({
  options,
  placeholder = "Select an option",
  value,
  onValueChange,
  className,
  label,
  helperText,
  errorMessage,
}: SelectProps) => {
  const hasError = !!errorMessage;

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <RadixSelect.Root value={value} onValueChange={onValueChange}>
        <RadixSelect.Trigger
          className={cn(
            "w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm outline-none transition-all",
            hasError
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400",
            "bg-white text-gray-900",
            className
          )}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className="z-50 mt-1 rounded-md border border-gray-200 bg-white shadow-lg"
            position="popper"
          >
            <RadixSelect.Viewport>
              {options.map((option) => (
                <RadixSelect.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex cursor-pointer select-none items-center py-2 pl-10 pr-4 text-sm text-gray-900 hover:bg-purple-50 outline-none"
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Check className="h-4 w-4 text-purple-600" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {(helperText || errorMessage) && (
        <p
          className={cn(
            "text-xs mt-1",
            hasError ? "text-red-500" : "text-gray-500"
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

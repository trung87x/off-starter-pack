import React from "react";
import clsx from "clsx";

export default function Example() {
  const isActive = true;
  const isError = false;

  return (
    <button
      className={clsx(
        "rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700",
        isActive && "opacity-50",
        isError && "bg-red-500",
      )}
    >
      Click me
    </button>
  );
}

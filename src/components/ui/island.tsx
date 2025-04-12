import type * as React from "react";

export function Island({ children }: React.ComponentProps<"div">) {
  return (
    <div className="min-w-50 py-2 px-5 rounded-full border-gray-100 dark:border-gray-800 border-1 shadow-lg/10 shadow-gray-700 dark:shadow-gray-300 flex items-center justify-center">
      {children}
    </div>
  );
}

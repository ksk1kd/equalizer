import { cn } from "@/lib/utils";

function FormItem({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid gap-3", className)} {...props}>
      {children}
    </div>
  );
}

function FormLabel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-md", className)} {...props}>
      {children}
    </div>
  );
}
function FormControl({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export { FormItem, FormLabel, FormControl };

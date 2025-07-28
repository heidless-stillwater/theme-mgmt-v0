import { cn } from "@/lib/utils"
import type { SVGProps } from "react";

interface ColorfulThemeIconProps extends SVGProps<SVGSVGElement> {
    primary: string;
    accent: string;
}

export function ColorfulThemeIcon({ primary, accent, className, ...props }: ColorfulThemeIconProps) {
  return (
    <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-4 w-4", className)}
        {...props}
    >
        <circle cx="6" cy="6" r="5.5" fill={primary} stroke="rgba(128,128,128,0.2)" />
        <circle cx="10" cy="10" r="5.5" fill={accent} stroke="rgba(128,128,128,0.2)" />
    </svg>
  );
}

import type { SVGProps } from "react";

export function PipeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 5h3v14H2V5z" />
      <path d="M5 12h14" />
      <path d="M19 5h3v14h-3V5z" />
    </svg>
  );
}

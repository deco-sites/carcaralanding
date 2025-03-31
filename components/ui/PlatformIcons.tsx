/** @jsxImportSource preact */
import { JSX } from "preact/jsx-runtime";

interface IconProps extends JSX.SVGAttributes<SVGSVGElement> {
  size?: number;
  color?: string;
  animated?: boolean;
}

/**
 * Custom SVG icon for Slack
 */
export function SlackIcon({
  size = 48,
  color = "#FBBF24", // amarelo
  className = "",
  animated = true,
  ...props
}: IconProps) {
  const animationClasses = animated
    ? "transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
    : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animationClasses}`}
      {...props}
    >
      <path
        d="M14.5 10C13.672 10 13 10.672 13 11.5V16.5C13 17.328 13.672 18 14.5 18C15.328 18 16 17.328 16 16.5V11.5C16 10.672 15.328 10 14.5 10Z"
        fill={color}
        className="transition-all duration-300 group-hover:fill-white"
      />
      <path
        d="M8.5 10C7.672 10 7 10.672 7 11.5V16.5C7 17.328 7.672 18 8.5 18C9.328 18 10 17.328 10 16.5V11.5C10 10.672 9.328 10 8.5 10Z"
        fill={color}
        className="transition-all duration-500 group-hover:fill-white"
      />
      <path
        d="M10 8.5C10 7.672 9.328 7 8.5 7H3.5C2.672 7 2 7.672 2 8.5C2 9.328 2.672 10 3.5 10H8.5C9.328 10 10 9.328 10 8.5Z"
        fill={color}
        className="transition-all duration-700 group-hover:fill-white"
      />
      <path
        d="M16 8.5C16 7.672 15.328 7 14.5 7H11.5C10.672 7 10 7.672 10 8.5C10 9.328 10.672 10 11.5 10H14.5C15.328 10 16 9.328 16 8.5Z"
        fill={color}
        className="transition-all duration-900 group-hover:fill-white"
      />
      <path
        d="M8.5 6C9.328 6 10 5.328 10 4.5V3.5C10 2.672 9.328 2 8.5 2C7.672 2 7 2.672 7 3.5V4.5C7 5.328 7.672 6 8.5 6Z"
        fill={color}
        className="transition-all duration-300 group-hover:fill-white"
      />
      <path
        d="M14.5 6C15.328 6 16 5.328 16 4.5V3.5C16 2.672 15.328 2 14.5 2C13.672 2 13 2.672 13 3.5V4.5C13 5.328 13.672 6 14.5 6Z"
        fill={color}
        className="transition-all duration-500 group-hover:fill-white"
      />
      <path
        d="M19.5 10C20.328 10 21 9.328 21 8.5C21 7.672 20.328 7 19.5 7H18.5C17.672 7 17 7.672 17 8.5C17 9.328 17.672 10 18.5 10H19.5Z"
        fill={color}
        className="transition-all duration-700 group-hover:fill-white"
      />
      <path
        d="M16 14.5C16 15.328 16.672 16 17.5 16H19.5C20.328 16 21 15.328 21 14.5C21 13.672 20.328 13 19.5 13H17.5C16.672 13 16 13.672 16 14.5Z"
        fill={color}
        className="transition-all duration-900 group-hover:fill-white"
      />
    </svg>
  );
}

/**
 * Custom SVG icon for Microsoft Teams
 */
export function TeamsIcon({
  size = 48,
  color = "#FBBF24", // amarelo
  className = "",
  animated = true,
  ...props
}: IconProps) {
  const animationClasses = animated
    ? "transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
    : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animationClasses}`}
      {...props}
    >
      <path
        d="M21 5.5C21 4.4 20.1 3.5 19 3.5H14.56C14.29 2.35 13.24 1.5 12 1.5C10.76 1.5 9.72 2.35 9.44 3.5H5C3.9 3.5 3 4.4 3 5.5V19.5C3 20.6 3.9 21.5 5 21.5H19C20.1 21.5 21 20.6 21 19.5V5.5ZM12 3.5C12.55 3.5 13 3.95 13 4.5C13 5.05 12.55 5.5 12 5.5C11.45 5.5 11 5.05 11 4.5C11 3.95 11.45 3.5 12 3.5ZM18 18.5H6V17.5H18V18.5ZM16.3 14.35C16.65 14.8 17.35 14.8 17.7 14.35L18 14L17.7 13.65C17.35 13.2 16.65 13.2 16.3 13.65L16 14L16.3 14.35ZM18 13.5H6V12.5H18V13.5ZM18 10.5H6V6.5H18V10.5Z"
        fill={color}
        className="transition-all duration-300 group-hover:fill-white"
      />
    </svg>
  );
}

/**
 * Custom SVG icon for deco.cx platform
 */
export function DecoIcon({
  size = 48,
  color = "#FBBF24", // amarelo
  className = "",
  animated = true,
  ...props
}: IconProps) {
  const animationClasses = animated
    ? "transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
    : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animationClasses}`}
      {...props}
    >
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        fill={color}
        className="transition-all duration-300 group-hover:fill-white"
      />
      <path
        d="M2 17L12 22L22 17M2 12L12 17L22 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500 group-hover:stroke-white"
      />
    </svg>
  );
}

export default {
  SlackIcon,
  TeamsIcon,
  DecoIcon,
};

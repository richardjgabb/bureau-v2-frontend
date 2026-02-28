import type { LoadingSpinnerProps } from "./types";

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-3",
  lg: "w-12 h-12 border-4",
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "text-purple",
  label,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`animate-spin rounded-full border-t-transparent ${sizeMap[size]} border-current ${color}`}
        style={{ borderStyle: "solid" }}
      ></div>
      {label && <span className="text-gray-600 text-sm">{label}</span>}
    </div>
  );
};

export default LoadingSpinner;

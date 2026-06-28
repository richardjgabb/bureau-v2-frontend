import React from 'react';

interface PauseIconProps {
  className?: string;
}

const PauseIcon: React.FC<PauseIconProps> = ({ className = "w-4 h-4" }) => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="4 4 16 16"
        strokeWidth={2}
        stroke="currentColor"
        className={className}
        aria-hidden="true"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6.75v10.5M14 6.75v10.5"
        />
    </svg>

  );
};

export default PauseIcon;
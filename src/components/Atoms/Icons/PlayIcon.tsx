import React from 'react';

interface PlayIconProps {
  className?: string;
}

const PlayIcon: React.FC<PlayIconProps> = ({ className = "w-8 h-8" }) => {
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
            d="M8.25 6.75l7.5 5.25-7.5 5.25V6.75z"
        />
    </svg>
  );
};

export default PlayIcon;
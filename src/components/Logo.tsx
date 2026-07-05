
interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      <defs>
        {/* Purple to Cyan gradient matching the logo theme */}
        <linearGradient id="logoGrad" x1="15" y1="15" x2="105" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D946EF" /> {/* Vibrant Purple */}
          <stop offset="50%" stopColor="#C084FC" /> {/* Light Purple */}
          <stop offset="100%" stopColor="#06B6D4" /> {/* Bright Cyan */}
        </linearGradient>

        {/* Mask to cut out the 4 diamond circles */}
        <mask id="logoMask">
          {/* Keep the whole hexagon shape */}
          <rect x="0" y="0" width="120" height="120" fill="#FFFFFF" />
          {/* Subtract the 4 circles */}
          <circle cx="60" cy="44" r="10.5" fill="#000000" />
          <circle cx="60" cy="76" r="10.5" fill="#000000" />
          <circle cx="44" cy="60" r="10.5" fill="#000000" />
          <circle cx="76" cy="60" r="10.5" fill="#000000" />
        </mask>
      </defs>

      {/* Hexagon shape with the mask applied */}
      <path
        d="M 38 18 
           L 82 18 
           Q 87 18 90 23 
           L 107 54 
           Q 110 60 107 66 
           L 90 97 
           Q 87 102 82 102 
           L 38 102 
           Q 33 102 30 97 
           L 13 66 
           Q 10 60 13 54 
           L 30 23 
           Q 33 18 38 18 
           Z"
        fill="url(#logoGrad)"
        mask="url(#logoMask)"
      />
    </svg>
  );
}

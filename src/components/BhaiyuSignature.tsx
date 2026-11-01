import React, { useEffect, useState } from 'react';

interface BhaiyuSignatureProps {
  className?: string;
  color?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
}

export const BhaiyuSignature: React.FC<BhaiyuSignatureProps> = ({
  className = '',
  color = '#222222',
  animated = true,
  size = 'md',
  strokeWidth = 2.5,
}) => {
  const [isDrawn, setIsDrawn] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsDrawn(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const sizeDimensions = {
    sm: { width: 110, height: 42 },
    md: { width: 160, height: 60 },
    lg: { width: 220, height: 84 },
    xl: { width: 300, height: 115 },
  };

  const { width, height } = sizeDimensions[size];

  // Artisanal cursive path for "bhaiyu" with distinctive character:
  // 'b' tall loop + bowl -> 'h' arch -> 'a' oval & downstroke -> 'i' stem -> 'y' basin & sweeping flourish loop -> 'u' cup & finish underline swoosh
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      title="bhaiyu signature"
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 240 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-label="bhaiyu signature"
      >
        {/* Main signature letter flow */}
        <path
          d="
            M 18 64
            C 20 45, 24 22, 32 14
            C 38 7, 43 14, 40 26
            C 36 42, 30 64, 30 65
            C 30 65, 34 50, 42 46
            C 50 42, 54 53, 52 64
            C 51 68, 55 42, 63 36
            C 72 30, 75 48, 73 63
            C 73 63, 76 52, 85 45
            C 94 38, 102 44, 98 56
            C 94 67, 85 68, 86 64
            C 88 56, 101 54, 106 63
            C 109 68, 114 47, 120 48
            C 124 49, 122 62, 126 63
            C 131 64, 134 52, 142 50
            C 149 48, 153 58, 150 64
            C 145 74, 136 88, 128 85
            C 122 82, 128 72, 145 68
            C 160 64, 172 52, 178 50
            C 184 48, 182 62, 187 63
            C 193 64, 202 52, 207 55
            C 211 58, 209 63, 214 62
          "
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 900,
            strokeDashoffset: isDrawn ? 0 : 900,
            transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* 'i' dot flourish */}
        <circle
          cx="124"
          cy="36"
          r="2.5"
          fill={color}
          style={{
            opacity: isDrawn ? 1 : 0,
            transform: isDrawn ? 'scale(1)' : 'scale(0)',
            transition: 'opacity 0.4s ease 1.2s, transform 0.4s ease 1.2s',
            transformOrigin: '124px 36px',
          }}
        />

        {/* Expressive underline flourish that loops back */}
        <path
          d="
            M 35 74
            C 75 72, 130 76, 190 70
            C 210 68, 228 65, 232 63
            C 235 61, 230 60, 222 61
          "
          stroke={color}
          strokeWidth={strokeWidth * 0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: isDrawn ? 0 : 300,
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
          }}
        />

        {/* Small creative spark star on the end */}
        <g
          style={{
            opacity: isDrawn ? 0.9 : 0,
            transform: isDrawn ? 'scale(1)' : 'scale(0)',
            transition: 'opacity 0.4s ease 1.6s, transform 0.4s ease 1.6s',
            transformOrigin: '230px 58px',
          }}
        >
          <line x1="230" y1="52" x2="230" y2="64" stroke="#FF887D" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="224" y1="58" x2="236" y2="58" stroke="#FF887D" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

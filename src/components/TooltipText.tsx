import React from 'react';
import { devopsTooltipMap, recruiterTranslationMap } from '../data/devopsData';

interface TooltipTextProps {
  text: string;
  mode: 'devops' | 'recruiter';
}

const TooltipText: React.FC<TooltipTextProps> = ({ text, mode }) => {
  // Regex to split text by word boundaries, keeping delimiters/words intact
  const tokens = text.split(/(\s+|,|\.|\(|\)|:)/);

  return (
    <>
      {tokens.map((token, i) => {
        // Clean token for map lookup
        const cleanToken = token.trim().replace(/[.,:()]/g, '');
        const tooltip = devopsTooltipMap[cleanToken];

        if (tooltip) {
          const displayText = mode === 'recruiter' 
            ? (recruiterTranslationMap[cleanToken] || cleanToken)
            : cleanToken;

          // Replace cleanToken in the original token to preserve surrounding punctuation
          const finalToken = token.replace(cleanToken, displayText);

          return (
            <span key={i} className="relative group inline-block font-mono">
              <span className="underline decoration-dotted decoration-cyan-400 text-cyan-300 hover:text-cyan-100 cursor-help transition-colors">
                {finalToken}
              </span>
              {/* Tooltip Overlay */}
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-black/95 text-xs text-white border border-cyan-500/50 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 leading-relaxed font-sans normal-case text-center">
                {tooltip}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/95" />
              </span>
            </span>
          );
        }

        return <React.Fragment key={i}>{token}</React.Fragment>;
      })}
    </>
  );
};

export default TooltipText;

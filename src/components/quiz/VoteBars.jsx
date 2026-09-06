import React from 'react';
import { OPTION_LABELS, OPTION_COLORS } from '../../config/constants';
import { Check } from 'lucide-react';

export default function VoteBars({
  votes = {},
  totalVotes = 0,
  correctAnswerIndex = null,
  isRevealed = false,
  optionsCount = 4,
}) {
  const labels = OPTION_LABELS.slice(0, optionsCount);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${labels.length}, 1fr)`,
        gap: '12px',
        alignItems: 'flex-end',
        width: '100%',
        padding: '16px 0',
      }}
    >
      {labels.map((label, index) => {
        const count = votes[label] || 0;
        const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
        const isCorrect = isRevealed && index === correctAnswerIndex;
        const baseColor = OPTION_COLORS[label] || '#475569';
        const displayColor = isCorrect ? '#16A34A' : baseColor;

        return (
          <div
            key={label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '14px',
                fontWeight: 700,
                color: isRevealed && !isCorrect ? '#94A3B8' : displayColor,
              }}
            >
              {count}
            </span>

            <div
              style={{
                width: '100%',
                height: '110px',
                backgroundColor: '#F1F5F9',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #E2E8F0',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: `${Math.max(percentage, count > 0 ? 6 : 0)}%`,
                  backgroundColor: displayColor,
                  borderRadius: '6px 6px 0 0',
                  opacity: isRevealed && !isCorrect ? 0.35 : 1,
                  transition: 'height 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease',
                }}
              />
            </div>

            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: isCorrect ? '#DCFCE7' : '#FFFFFF',
                border: `2px solid ${displayColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '16px',
                color: displayColor,
                opacity: isRevealed && !isCorrect ? 0.5 : 1,
                transition: 'all 0.3s ease',
              }}
            >
              {isCorrect ? <Check size={20} strokeWidth={3} /> : label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

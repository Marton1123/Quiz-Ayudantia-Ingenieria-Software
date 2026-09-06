import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { BookOpen, AlertCircle } from 'lucide-react';
import { OPTION_LABELS, OPTION_COLORS } from '../../config/constants';

export default function QuestionCard({
  question,
  currentIndex = 0,
  totalQuestions = 1,
  selectedAnswerIndex = null,
  onSelectAnswer = null,
  isRevealed = false,
  showExplanation = false,
}) {
  if (!question) return null;

  return (
    <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <Badge variant="navy" icon={BookOpen}>
          {question.topic || 'Modelamiento UML'}
        </Badge>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
          Pregunta {currentIndex + 1} de {totalQuestions}
        </span>
      </div>

      <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#0F172A', marginBottom: '16px', lineHeight: 1.4 }}>
        {question.q}
      </h2>

      {question.diagramSnippet && (
        <div
          style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '18px',
            fontFamily: 'Consolas, monospace',
            fontSize: '13px',
            color: '#1E2761',
            whiteSpace: 'pre-wrap',
          }}
        >
          {question.diagramSnippet}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
        {question.opts.map((optionText, idx) => {
          const label = OPTION_LABELS[idx] || String(idx + 1);
          const isSelected = selectedAnswerIndex === idx;
          const isCorrect = isRevealed && idx === question.ans;
          const isWrongSelection = isRevealed && isSelected && !isCorrect;

          let btnBg = '#FFFFFF';
          let borderColor = '#E2E8F0';
          let textColor = '#1E293B';

          if (isRevealed) {
            if (isCorrect) {
              btnBg = '#DCFCE7';
              borderColor = '#16A34A';
              textColor = '#15803D';
            } else if (isWrongSelection) {
              btnBg = '#FEE2E2';
              borderColor = '#DC2626';
              textColor = '#B91C1C';
            } else {
              btnBg = '#F8FAFC';
              borderColor = '#E2E8F0';
              textColor = '#94A3B8';
            }
          } else if (isSelected) {
            btnBg = '#EFF6FF';
            borderColor = '#2563EB';
            textColor = '#1D4ED8';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectAnswer && !isRevealed && onSelectAnswer(idx)}
              disabled={isRevealed || !onSelectAnswer}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: '10px',
                backgroundColor: btnBg,
                border: `2px solid ${borderColor}`,
                color: textColor,
                textAlign: 'left',
                cursor: isRevealed || !onSelectAnswer ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: OPTION_COLORS[label] || '#475569',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '14px',
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <span style={{ fontSize: '15px', fontWeight: 500, flex: 1 }}>
                {optionText}
              </span>
            </button>
          );
        })}
      </div>

      {showExplanation && question.exp && (
        <div
          style={{
            marginTop: '20px',
            padding: '14px 18px',
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803D', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
            <AlertCircle size={16} />
            <span>Fundamento Tecnico</span>
          </div>
          <p style={{ fontSize: '13.5px', color: '#166534', lineHeight: 1.5 }}>
            {question.exp}
          </p>
        </div>
      )}
    </Card>
  );
}

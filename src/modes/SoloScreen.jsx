import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import QuestionCard from '../components/quiz/QuestionCard';
import { BookOpen, ArrowRight, RotateCcw, ArrowLeft, Trophy, CheckCircle, XCircle } from 'lucide-react';

export default function SoloScreen({ ayudantia, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = ayudantia.questions || [];
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectAnswer = (index) => {
    if (isAnswerRevealed) return;
    setSelectedOptionIndex(index);
    setIsAnswerRevealed(true);

    const isCorrect = index === currentQuestion.ans;
    if (isCorrect) {
      setScore((prev) => prev + (ayudantia.pointsPerQuestion || 1000));
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedOptionIndex(null);
    setIsAnswerRevealed(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setCorrectAnswersCount(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const accuracy = Math.round((correctAnswersCount / questions.length) * 100);

    return (
      <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 16px' }}>
        <Card style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Trophy size={36} color="#D97706" />
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1E2761', marginBottom: '6px' }}>
            Practica Completada
          </h2>
          <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '24px' }}>
            Has completado las {questions.length} preguntas de {ayudantia.title}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>Aciertos</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#16A34A' }}>
                {correctAnswersCount} / {questions.length}
              </span>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>Precision</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#1E2761' }}>
                {accuracy}%
              </span>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block' }}>Puntaje</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#D97706' }}>
                {score}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button variant="secondary" icon={RotateCcw} onClick={handleRestart}>
              Reintentar Quiz
            </Button>
            <Button variant="primary" icon={ArrowLeft} onClick={onExit}>
              Volver al Menu
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '820px', margin: '24px auto', padding: '0 16px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Button variant="secondary" size="sm" icon={ArrowLeft} onClick={onExit}>
          Menu
        </Button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Badge variant="amber">Puntaje: {score} pts</Badge>
          <Badge variant="navy">Aciertos: {correctAnswersCount}</Badge>
        </div>
      </header>

      <QuestionCard
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        selectedAnswerIndex={selectedOptionIndex}
        onSelectAnswer={handleSelectAnswer}
        isRevealed={isAnswerRevealed}
        showExplanation={isAnswerRevealed}
      />

      {isAnswerRevealed && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" size="lg" icon={ArrowRight} onClick={handleNext}>
            {isLastQuestion ? 'Ver Resultados Finales' : 'Siguiente Pregunta'}
          </Button>
        </div>
      )}
    </div>
  );
}

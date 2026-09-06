import React, { useState, useEffect, useRef } from 'react';
import { RealtimeQuizService } from '../services/realtimeService';
import { GAME_PHASES } from '../config/constants';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import TimerRing from '../components/quiz/TimerRing';
import VoteBars from '../components/quiz/VoteBars';
import Leaderboard from '../components/quiz/Leaderboard';
import QuestionCard from '../components/quiz/QuestionCard';
import { Monitor, Users, Play, ArrowRight, Eye, Trophy, RotateCcw, ArrowLeft } from 'lucide-react';

export default function HostScreen({ ayudantia, roomCode, onExit }) {
  const [phase, setPhase] = useState(GAME_PHASES.LOBBY);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [votes, setVotes] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(ayudantia.defaultTimerSeconds || 30);
  const timerRef = useRef(null);
  const serviceRef = useRef(null);

  const currentQuestion = ayudantia.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === ayudantia.questions.length - 1;

  useEffect(() => {
    const service = new RealtimeQuizService(roomCode);
    serviceRef.current = service;

    service.subscribe({
      onPlayerJoin: (player) => {
        setPlayers((prev) => {
          if (prev.some((p) => p.name === player.name)) return prev;
          return [...prev, { ...player, score: 0 }];
        });
      },
      onPlayerVote: ({ playerName, optionLabel }) => {
        setVotes((prev) => ({
          ...prev,
          [optionLabel]: (prev[optionLabel] || 0) + 1,
        }));
      },
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      service.unsubscribe();
    };
  }, [roomCode]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const totalTime = ayudantia.defaultTimerSeconds || 30;
    setRemainingSeconds(totalTime);

    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleRevealAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStartGame = () => {
    setCurrentQuestionIndex(0);
    setVotes({});
    setPhase(GAME_PHASES.QUESTION);
    startTimer();

    if (serviceRef.current) {
      serviceRef.current.broadcastNext({
        questionIndex: 0,
        totalQuestions: ayudantia.questions.length,
        timerSeconds: ayudantia.defaultTimerSeconds || 30,
      });
    }
  };

  const handleRevealAnswer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase(GAME_PHASES.REVEAL);

    if (serviceRef.current) {
      serviceRef.current.broadcastState({
        phase: GAME_PHASES.REVEAL,
        correctAnswerIndex: currentQuestion.ans,
      });
    }
  };

  const handleShowLeaderboard = () => {
    setPhase(GAME_PHASES.LEADERBOARD);
    if (serviceRef.current) {
      serviceRef.current.broadcastState({
        phase: GAME_PHASES.LEADERBOARD,
        players,
      });
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setPhase(GAME_PHASES.FINISHED);
      if (serviceRef.current) {
        serviceRef.current.broadcastEnd({ players });
      }
      return;
    }

    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    setVotes({});
    setPhase(GAME_PHASES.QUESTION);
    startTimer();

    if (serviceRef.current) {
      serviceRef.current.broadcastNext({
        questionIndex: nextIndex,
        totalQuestions: ayudantia.questions.length,
        timerSeconds: ayudantia.defaultTimerSeconds || 30,
      });
    }
  };

  const totalVotesCount = Object.values(votes).reduce((sum, val) => sum + val, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '24px 20px' }}>
      <header style={{ maxWidth: '1100px', margin: '0 auto 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="secondary" size="sm" icon={ArrowLeft} onClick={onExit}>
            Salir al Menu
          </Button>
          <span style={{ fontWeight: 700, color: '#1E2761', fontSize: '16px' }}>
            {ayudantia.title}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Badge variant="amber" icon={Users}>
            {players.length} conectados
          </Badge>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>SALA:</span>
            <span style={{ fontFamily: 'Consolas, monospace', fontWeight: 800, fontSize: '16px', color: '#1E2761' }}>
              {roomCode}
            </span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* 1. Fase Lobby */}
        {phase === GAME_PHASES.LOBBY && (
          <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <Monitor size={32} color="#1E2761" />
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1E2761', marginBottom: '8px' }}>
              Sala de Espera del Quiz
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', marginBottom: '24px' }}>
              Pide a los estudiantes ingresar desde su celular con el codigo de sala:
            </p>

            <div style={{ display: 'inline-block', padding: '16px 36px', backgroundColor: '#0F172A', color: '#FFFFFF', borderRadius: '12px', marginBottom: '32px' }}>
              <span style={{ fontSize: '13px', display: 'block', color: '#94A3B8', letterSpacing: '1px', marginBottom: '4px' }}>CODIGO PIN</span>
              <span style={{ fontFamily: 'Consolas, monospace', fontSize: '40px', fontWeight: 900, letterSpacing: '4px' }}>
                {roomCode}
              </span>
            </div>

            <div style={{ maxWidth: '640px', margin: '0 auto 32px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#334155', marginBottom: '14px' }}>
                Estudiantes en la sala ({players.length}):
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', minHeight: '60px' }}>
                {players.map((p, idx) => (
                  <Badge key={idx} variant="navy">
                    {p.name}
                  </Badge>
                ))}
                {players.length === 0 && (
                  <p style={{ color: '#94A3B8', fontSize: '14px', fontStyle: 'italic' }}>
                    Esperando a que los participantes ingresen su alias...
                  </p>
                )}
              </div>
            </div>

            <Button variant="accent" size="lg" icon={Play} onClick={handleStartGame}>
              Iniciar Quiz Ahora
            </Button>
          </Card>
        )}

        {/* 2. Fase Pregunta y Votacion */}
        {phase === GAME_PHASES.QUESTION && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Badge variant="navy">
                Pregunta {currentQuestionIndex + 1} de {ayudantia.questions.length}
              </Badge>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <TimerRing remainingSeconds={remainingSeconds} totalSeconds={ayudantia.defaultTimerSeconds || 30} />
                <Button variant="secondary" icon={Eye} onClick={handleRevealAnswer}>
                  Cerrar Votacion
                </Button>
              </div>
            </div>

            <QuestionCard
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={ayudantia.questions.length}
              isRevealed={false}
            />

            <div style={{ marginTop: '24px' }}>
              <VoteBars
                votes={votes}
                totalVotes={totalVotesCount}
                optionsCount={currentQuestion.opts.length}
                isRevealed={false}
              />
            </div>
          </div>
        )}

        {/* 3. Fase Revelacion de Respuesta */}
        {phase === GAME_PHASES.REVEAL && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Badge variant="success">Respuesta Revelada</Badge>
              <Button variant="primary" icon={ArrowRight} onClick={handleShowLeaderboard}>
                Ver Tabla de Posiciones
              </Button>
            </div>

            <QuestionCard
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={ayudantia.questions.length}
              isRevealed={true}
              showExplanation={true}
            />

            <div style={{ marginTop: '24px' }}>
              <VoteBars
                votes={votes}
                totalVotes={totalVotesCount}
                correctAnswerIndex={currentQuestion.ans}
                optionsCount={currentQuestion.opts.length}
                isRevealed={true}
              />
            </div>
          </div>
        )}

        {/* 4. Fase Tabla de Posiciones */}
        {phase === GAME_PHASES.LEADERBOARD && (
          <Card style={{ textAlign: 'center', padding: '36px 20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1E2761', marginBottom: '20px' }}>
              Tabla de Posiciones
            </h2>
            <Leaderboard players={players} />
            <div style={{ marginTop: '28px' }}>
              <Button variant="accent" size="lg" icon={ArrowRight} onClick={handleNextQuestion}>
                {isLastQuestion ? 'Finalizar Quiz' : 'Siguiente Pregunta'}
              </Button>
            </div>
          </Card>
        )}

        {/* 5. Fase Final */}
        {phase === GAME_PHASES.FINISHED && (
          <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Trophy size={36} color="#D97706" />
            </div>
            <h2 style={{ fontSize: '30px', fontWeight: 800, color: '#1E2761', marginBottom: '8px' }}>
              Quiz Finalizado
            </h2>
            <p style={{ color: '#64748B', fontSize: '16px', marginBottom: '28px' }}>
              Resultados finales de la actividad de modelamiento UML
            </p>
            <Leaderboard players={players} maxEntries={10} />
            <div style={{ marginTop: '32px' }}>
              <Button variant="primary" icon={RotateCcw} onClick={onExit}>
                Volver al Menu Principal
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}

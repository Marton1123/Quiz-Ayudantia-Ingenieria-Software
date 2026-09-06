import React, { useState, useEffect, useRef } from 'react';
import { RealtimeQuizService } from '../services/realtimeService';
import { GAME_PHASES, OPTION_LABELS, OPTION_COLORS } from '../config/constants';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { Smartphone, CheckCircle, Clock, Trophy, ArrowLeft } from 'lucide-react';

export default function PlayerScreen({ playerInfo, onExit }) {
  const [gameState, setGameState] = useState({
    phase: GAME_PHASES.LOBBY,
    questionIndex: 0,
    totalQuestions: 1,
    correctAnswerIndex: null,
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const serviceRef = useRef(null);

  useEffect(() => {
    const service = new RealtimeQuizService(playerInfo.roomCode);
    serviceRef.current = service;

    service.subscribe({
      onGameState: (state) => {
        setGameState((prev) => ({ ...prev, ...state }));
      },
      onNextQuestion: (data) => {
        setGameState((prev) => ({
          ...prev,
          phase: GAME_PHASES.QUESTION,
          questionIndex: data.questionIndex,
          totalQuestions: data.totalQuestions,
          correctAnswerIndex: null,
        }));
        setSelectedOption(null);
        setHasVoted(false);
      },
      onGameEnd: () => {
        setGameState((prev) => ({ ...prev, phase: GAME_PHASES.FINISHED }));
      },
    });

    service.broadcastJoin({
      id: Math.random().toString(36).substring(2, 9),
      name: playerInfo.name,
    });

    return () => {
      service.unsubscribe();
    };
  }, [playerInfo]);

  const handleVote = (label) => {
    if (hasVoted || gameState.phase !== GAME_PHASES.QUESTION) return;
    setSelectedOption(label);
    setHasVoted(true);

    if (serviceRef.current) {
      serviceRef.current.broadcastVote({
        playerName: playerInfo.name,
        optionLabel: label,
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '16px' }}>
      <header style={{ maxWidth: '480px', margin: '0 auto 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          onClick={onExit}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B', fontSize: '13px', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} />
          <span>Salir</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge variant="navy">{playerInfo.name}</Badge>
          <Badge variant="amber">{playerInfo.roomCode}</Badge>
        </div>
      </header>

      <main style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* 1. Espera en Lobby */}
        {gameState.phase === GAME_PHASES.LOBBY && (
          <Card style={{ textAlign: 'center', padding: '36px 16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Clock size={28} color="#D97706" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1E2761', marginBottom: '8px' }}>
              Estas dentro de la sala
            </h3>
            <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.5 }}>
              Espera a que el docente o ayudante inicie el quiz en la pantalla del proyector.
            </p>
          </Card>
        )}

        {/* 2. Pantalla de Votacion */}
        {gameState.phase === GAME_PHASES.QUESTION && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>
                Pregunta {gameState.questionIndex + 1} de {gameState.totalQuestions}
              </span>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>
                Elige tu respuesta:
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {['A', 'B', 'C', 'D'].map((label) => {
                const color = OPTION_COLORS[label] || '#475569';
                const isSelected = selectedOption === label;

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleVote(label)}
                    disabled={hasVoted}
                    style={{
                      height: '110px',
                      borderRadius: '12px',
                      backgroundColor: color,
                      color: '#FFFFFF',
                      border: isSelected ? '4px solid #0F172A' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px',
                      fontWeight: 900,
                      fontFamily: 'Consolas, monospace',
                      cursor: hasVoted ? 'default' : 'pointer',
                      opacity: hasVoted && !isSelected ? 0.45 : 1,
                      transform: isSelected ? 'scale(1.02)' : 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {hasVoted && (
              <div style={{ textAlign: 'center', marginTop: '20px', padding: '12px', backgroundColor: '#DCFCE7', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#15803D', fontWeight: 700, fontSize: '14px' }}>
                  <CheckCircle size={16} />
                  <span>Voto registrado: Opcion {selectedOption}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#166534', marginTop: '2px' }}>
                  Esperando el cierre del tiempo en el proyector...
                </p>
              </div>
            )}
          </div>
        )}

        {/* 3. Pantalla de Revelacion */}
        {gameState.phase === GAME_PHASES.REVEAL && (
          <Card style={{ textAlign: 'center', padding: '28px 16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              Pregunta Cerrada
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Revisa la pantalla principal del proyector para ver el fundamento tecnico y la respuesta correcta.
            </p>
          </Card>
        )}

        {/* 4. Pantalla de Leaderboard */}
        {gameState.phase === GAME_PHASES.LEADERBOARD && (
          <Card style={{ textAlign: 'center', padding: '28px 16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E2761', marginBottom: '6px' }}>
              Resultados Parciales
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Mira el proyector para conocer la tabla de clasificacion actualizada.
            </p>
          </Card>
        )}

        {/* 5. Pantalla Final */}
        {gameState.phase === GAME_PHASES.FINISHED && (
          <Card style={{ textAlign: 'center', padding: '36px 16px' }}>
            <Trophy size={36} color="#D97706" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1E2761', marginBottom: '8px' }}>
              Quiz Finalizado
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
              Gracias por participar en la actividad de modelamiento UML.
            </p>
            <Button variant="primary" fullWidth onClick={onExit}>
              Salir al Menu
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
}

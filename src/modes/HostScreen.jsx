import React, { useState, useEffect, useRef } from "react";
import { RealtimeQuizService } from "../services/realtimeService";
import { GAME_PHASES, OPTION_LABELS } from "../config/constants";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import QRCodeDisplay from "../components/common/QRCodeDisplay";
import TimerRing from "../components/quiz/TimerRing";
import VoteBars from "../components/quiz/VoteBars";
import Leaderboard from "../components/quiz/Leaderboard";
import QuestionCard from "../components/quiz/QuestionCard";
import {
  Monitor,
  Users,
  Play,
  ArrowRight,
  Eye,
  Trophy,
  RotateCcw,
  ArrowLeft,
  QrCode,
  X,
  Smartphone,
} from "lucide-react";

export default function HostScreen({ ayudantia, roomCode, onExit }) {
  const [phase, setPhase] = useState(GAME_PHASES.LOBBY);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [votes, setVotes] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(ayudantia.defaultTimerSeconds || 30);
  const [showQrModal, setShowQrModal] = useState(false);

  const timerRef = useRef(null);
  const serviceRef = useRef(null);
  const playersRef = useRef([]);
  const gameStateRef = useRef({ phase: GAME_PHASES.LOBBY, index: 0 });

  const currentQuestion = ayudantia.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === ayudantia.questions.length - 1;

  useEffect(() => {
    playersRef.current = players;
  }, [players]);

  useEffect(() => {
    gameStateRef.current = { phase, index: currentQuestionIndex };
  }, [phase, currentQuestionIndex]);

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://quiz-ayudantia-ingenieria-software.vercel.app";
  const joinUrl = `${origin}/?join=${roomCode}`;



  useEffect(() => {
    const service = new RealtimeQuizService(roomCode);
    serviceRef.current = service;

    service.subscribe({
      onConnected: () => {
        service.trackPresence({ role: "host", name: "Docente-Host" });
      },
      onPresenceSync: (activePresences) => {
        setPlayers((prev) => {
          const currentMap = new Map(prev.map((p) => [p.name.toLowerCase(), p]));
          let updated = false;

          for (const item of activePresences) {
            if (item.role === "host") continue;
            const lower = item.name.toLowerCase();
            const existing = currentMap.get(lower);

            if (!existing) {
              currentMap.set(lower, {
                id: item.id || Math.random().toString(36).substring(2, 9),
                name: item.name,
                score: item.score || 0,
              });
              updated = true;
            } else if (item.id && existing.id !== item.id) {
              currentMap.set(lower, {
                ...existing,
                id: item.id,
              });
              updated = true;
            }
          }

          return updated ? Array.from(currentMap.values()) : prev;
        });
      },
      onPlayerJoin: (player) => {
        setPlayers((prev) => {
          const lower = player.name.toLowerCase();
          const existingIdx = prev.findIndex(
            (p) => p.name.toLowerCase() === lower || (player.id && p.id === player.id)
          );

          if (serviceRef.current) {
            const currentQ = ayudantia.questions[gameStateRef.current.index];
            serviceRef.current.broadcastState({
              phase: gameStateRef.current.phase,
              questionIndex: gameStateRef.current.index,
              totalQuestions: ayudantia.questions.length,
              correctAnswerIndex:
                gameStateRef.current.phase === GAME_PHASES.REVEAL ? currentQ.ans : null,
            });
          }

          if (existingIdx >= 0) {
            const copy = [...prev];
            copy[existingIdx] = {
              ...copy[existingIdx],
              id: player.id || copy[existingIdx].id,
              name: player.name,
            };
            return copy;
          }

          return [
            ...prev,
            {
              id: player.id || Math.random().toString(36).substring(2, 9),
              name: player.name,
              score: 0,
            },
          ];
        });
      },
      onPlayerVote: ({ playerName, optionLabel }) => {
        setVotes((prev) => ({
          ...prev,
          [optionLabel]: (prev[optionLabel] || 0) + 1,
        }));

        const correctLabel = OPTION_LABELS[currentQuestion.ans];
        if (optionLabel === correctLabel) {
          setPlayers((prev) =>
            prev.map((p) =>
              p.name.toLowerCase() === playerName.toLowerCase()
                ? { ...p, score: p.score + 100 }
                : p
            )
          );
        }
      },
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      service.unsubscribe();
    };
  }, [roomCode, currentQuestion.ans, ayudantia.questions]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const duration = ayudantia.defaultTimerSeconds || 30;
    setRemainingSeconds(duration);

    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTimeUp = () => {
    setPhase(GAME_PHASES.VOTES);
    if (serviceRef.current) {
      serviceRef.current.broadcastState({ phase: GAME_PHASES.VOTES });
    }
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
      serviceRef.current.broadcastState({ phase: GAME_PHASES.LEADERBOARD });
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setPhase(GAME_PHASES.FINISHED);
      if (serviceRef.current) {
        serviceRef.current.broadcastEnd({
          players: playersRef.current,
        });
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
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", padding: "24px 20px" }}>
      <header style={{ maxWidth: "1100px", margin: "0 auto 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button variant="secondary" size="sm" icon={ArrowLeft} onClick={onExit}>
            Salir al Menu
          </Button>
          <span style={{ fontWeight: 700, color: "#1E2761", fontSize: "16px" }}>
            {ayudantia.title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button
            variant="secondary"
            size="sm"
            icon={QrCode}
            onClick={() => setShowQrModal(true)}
            title="Mostrar codigo QR para estudiantes rezagados"
          >
            QR Sala
          </Button>
          <Badge variant="amber" icon={Users}>
            {players.length} conectados
          </Badge>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
            <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>SALA:</span>
            <span style={{ fontFamily: "Consolas, monospace", fontWeight: 800, fontSize: "16px", color: "#1E2761" }}>
              {roomCode}
            </span>
          </div>
        </div>
      </header>

      {/* Modal accesible de QR durante el juego */}
      {showQrModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowQrModal(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "20px",
              padding: "28px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.2)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748B",
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1E2761", marginBottom: "4px", textAlign: "center" }}>
              Unirse al Quiz
            </h3>
            <p style={{ fontSize: "13px", color: "#64748B", textAlign: "center", marginBottom: "16px" }}>
              Escanea el codigo o entra directamente desde tu celular
            </p>

            <QRCodeDisplay url={joinUrl} pin={roomCode} size={200} />

            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Button variant="secondary" fullWidth onClick={() => setShowQrModal(false)}>
                Cerrar Ventana
              </Button>
            </div>
          </div>
        </div>
      )}

      <main style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* 1. Fase Lobby */}
        {phase === GAME_PHASES.LOBBY && (
          <Card style={{ padding: "40px 32px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", backgroundColor: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <Monitor size={28} color="#1E2761" />
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#1E2761", marginBottom: "6px" }}>
                Sala de Espera del Quiz
              </h2>
              <p style={{ color: "#64748B", fontSize: "16px" }}>
                Escanea el codigo QR con tu celular o ingresa la direccion web y el PIN para participar:
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "center", marginBottom: "36px" }}>
              {/* Columna Izquierda: Generador de QR */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <QRCodeDisplay url={joinUrl} pin={roomCode} size={220} />
              </div>

              {/* Columna Derecha: Instrucciones y Alumnos Conectados */}
              <div>
                <div style={{ padding: "18px", backgroundColor: "#F8FAFC", borderRadius: "12px", border: "1px solid #E2E8F0", marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1E2761", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Smartphone size={18} color="#D97706" />
                    <span>Instrucciones para los estudiantes:</span>
                  </h4>
                  <ol style={{ margin: 0, paddingLeft: "20px", fontSize: "13.5px", color: "#475569", lineHeight: 1.6 }}>
                    <li>Apunta la camara de tu celular al codigo QR o ingresa la URL mostrada.</li>
                    <li>Verifica o edita tu apodo (o presiona Aleatorio).</li>
                    <li>Presiona <strong>Entrar a la Sala</strong> para votar en vivo.</li>
                  </ol>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#334155" }}>
                      Estudiantes Conectados ({players.length}):
                    </h4>
                    <Badge variant={players.length > 0 ? "success" : "neutral"}>
                      {players.length > 0 ? "Listo para iniciar" : "Esperando alumnos"}
                    </Badge>
                  </div>

                  {players.length === 0 ? (
                    <div style={{ padding: "24px", backgroundColor: "#F8FAFC", borderRadius: "10px", border: "1px dashed #CBD5E1", color: "#64748B", fontSize: "14px", textAlign: "center" }}>
                      Aun no hay estudiantes conectados. Escanea el codigo para comenzar.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", maxHeight: "150px", overflowY: "auto", padding: "4px" }}>
                      {players.map((p) => (
                        <span
                          key={p.name}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: "#EEF2FF",
                            color: "#1E2761",
                            fontWeight: 700,
                            borderRadius: "16px",
                            fontSize: "13px",
                            border: "1px solid #C7D2FE",
                          }}
                        >
                          {p.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", borderTop: "1px solid #E2E8F0", paddingTop: "24px" }}>
              <Button
                variant="accent"
                size="lg"
                icon={Play}
                onClick={handleStartGame}
                disabled={players.length === 0}
              >
                Comenzar Quiz ({players.length} estudiantes)
              </Button>
            </div>
          </Card>
        )}

        {/* 2. Fase de Pregunta y Votacion */}
        {phase === GAME_PHASES.QUESTION && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <Badge variant="navy">
                Pregunta {currentQuestionIndex + 1} de {ayudantia.questions.length}
              </Badge>
              <TimerRing
                remainingSeconds={remainingSeconds}
                totalSeconds={ayudantia.defaultTimerSeconds || 30}
                size={84}
              />
              <Badge variant="amber" icon={Users}>
                {totalVotesCount} / {players.length} votos
              </Badge>
            </div>

            <QuestionCard
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={ayudantia.questions.length}
              isRevealed={false}
              showExplanation={false}
            />

            <div style={{ marginTop: "24px", textAlign: "right" }}>
              <Button variant="secondary" onClick={handleTimeUp}>
                Cerrar Tiempo Manualmente
              </Button>
            </div>
          </div>
        )}

        {/* 3. Fase de Votos Recibidos */}
        {phase === GAME_PHASES.VOTES && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <Badge variant="neutral">Tiempo Finalizado</Badge>
              <Badge variant="amber">Votos emitidos: {totalVotesCount}</Badge>
            </div>

            <QuestionCard
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={ayudantia.questions.length}
              isRevealed={false}
              showExplanation={false}
            />

            <Card title="Distribucion de Respuestas" subtitle="Votos emitidos por los estudiantes en la sala" style={{ marginTop: "20px" }}>
              <VoteBars votes={votes} totalVotes={totalVotesCount} />
            </Card>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" icon={Eye} onClick={handleRevealAnswer}>
                Revelar Respuesta Correcta
              </Button>
            </div>
          </div>
        )}

        {/* 4. Fase de Revelacion */}
        {phase === GAME_PHASES.REVEAL && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <Badge variant="success">Respuesta Oficial y Fundamento</Badge>
              <Badge variant="amber">Votos emitidos: {totalVotesCount}</Badge>
            </div>

            <QuestionCard
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={ayudantia.questions.length}
              isRevealed={true}
              showExplanation={true}
            />

            <Card title="Distribucion de Respuestas" subtitle="La barra verde senala la opcion correcta" style={{ marginTop: "20px" }}>
              <VoteBars
                votes={votes}
                totalVotes={totalVotesCount}
                correctAnswerIndex={currentQuestion.ans}
                isRevealed={true}
              />
            </Card>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
              <Button variant="primary" icon={ArrowRight} onClick={handleShowLeaderboard}>
                Ver Tabla de Posiciones
              </Button>
            </div>
          </div>
        )}

        {/* 5. Fase de Tabla de Posiciones */}
        {phase === GAME_PHASES.LEADERBOARD && (
          <div>
            <Card title="Tabla de Posiciones Parcial" subtitle="Puntajes acumulados tras la pregunta actual">
              <Leaderboard players={players} />
            </Card>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
              <Button variant="accent" icon={ArrowRight} onClick={handleNextQuestion}>
                {isLastQuestion ? "Ver Podio Final" : "Siguiente Pregunta"}
              </Button>
            </div>
          </div>
        )}

        {/* 6. Fase Final y Podio */}
        {phase === GAME_PHASES.FINISHED && (
          <div>
            <Card style={{ textAlign: "center", padding: "40px 24px", marginBottom: "24px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", backgroundColor: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Trophy size={36} color="#D97706" />
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#1E2761", marginBottom: "8px" }}>
                Quiz Finalizado con Exito
              </h2>
              <p style={{ color: "#64748B", fontSize: "16px" }}>
                Felicitaciones a todos los participantes de la ayudantia.
              </p>
            </Card>

            <Card title="Podio Final y Clasificacion" subtitle="Resultados definitivos de la sesion">
              <Leaderboard players={players} />
            </Card>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "12px" }}>
              <Button variant="primary" icon={RotateCcw} onClick={handleStartGame}>
                Reiniciar Mismo Quiz
              </Button>
              <Button variant="secondary" onClick={onExit}>
                Volver al Hub
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

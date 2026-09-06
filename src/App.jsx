import React, { useState } from "react";
import HubScreen from "./modes/HubScreen";
import HostScreen from "./modes/HostScreen";
import PlayerScreen from "./modes/PlayerScreen";
import SoloScreen from "./modes/SoloScreen";

function getInitialRoomCode() {
  if (typeof window !== "undefined" && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const joinRoom = params.get("join") || params.get("room") || "";
    return joinRoom.trim().toUpperCase();
  }
  return "";
}

export default function App() {
  const [currentView, setCurrentView] = useState("hub");
  const [sessionData, setSessionData] = useState(null);
  const [initialRoomCode] = useState(getInitialRoomCode);

  const handleStartHost = ({ ayudantia, roomCode }) => {
    setSessionData({ ayudantia, roomCode });
    setCurrentView("host");
  };

  const handleJoinPlayer = ({ name, roomCode, ayudantia }) => {
    setSessionData({ name, roomCode, ayudantia });
    setCurrentView("player");
  };

  const handleStartSolo = ({ ayudantia }) => {
    setSessionData({ ayudantia });
    setCurrentView("solo");
  };

  const handleExitToHub = () => {
    setSessionData(null);
    setCurrentView("hub");
  };

  return (
    <div>
      {currentView === "hub" && (
        <HubScreen
          onStartHost={handleStartHost}
          onJoinPlayer={handleJoinPlayer}
          onStartSolo={handleStartSolo}
          initialRoomCode={initialRoomCode}
        />
      )}

      {currentView === "host" && sessionData && (
        <HostScreen
          ayudantia={sessionData.ayudantia}
          roomCode={sessionData.roomCode}
          onExit={handleExitToHub}
        />
      )}

      {currentView === "player" && sessionData && (
        <PlayerScreen
          playerInfo={sessionData}
          onExit={handleExitToHub}
        />
      )}

      {currentView === "solo" && sessionData && (
        <SoloScreen
          ayudantia={sessionData.ayudantia}
          onExit={handleExitToHub}
        />
      )}
    </div>
  );
}

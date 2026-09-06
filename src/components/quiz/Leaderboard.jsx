import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard({ players = [], maxEntries = 8 }) {
  const sortedPlayers = [...players]
    .sort((a, b) => (b.score || 0) - (a.score || 0))
    .slice(0, maxEntries);

  const getRankBadge = (rank) => {
    if (rank === 0) return <Trophy size={20} color="#D97706" />;
    if (rank === 1) return <Medal size={20} color="#64748B" />;
    if (rank === 2) return <Award size={20} color="#B45309" />;
    return <span style={{ fontWeight: 700, color: '#94A3B8' }}>{rank + 1}</span>;
  };

  const getCardStyle = (rank) => {
    const isTopThree = rank < 3;
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '12px 18px',
      borderRadius: '10px',
      backgroundColor: isTopThree ? '#FFFFFF' : '#F8FAFC',
      border: isTopThree
        ? rank === 0
          ? '2px solid #FCD34D'
          : rank === 1
          ? '2px solid #CBD5E1'
          : '2px solid #FDBA74'
        : '1px solid #E2E8F0',
      boxShadow: rank === 0 ? '0 4px 12px -2px rgb(217 119 6 / 0.15)' : 'none',
      transform: rank === 0 ? 'scale(1.02)' : 'none',
      transition: 'all 0.3s ease',
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
      {sortedPlayers.map((player, index) => (
        <div key={player.id || index} style={getCardStyle(index)}>
          <div style={{ width: '32px', display: 'flex', justifyContent: 'center' }}>
            {getRankBadge(index)}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {player.name || 'Estudiante'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span style={{ fontFamily: 'Consolas, monospace', fontWeight: 800, fontSize: '18px', color: index === 0 ? '#D97706' : '#1E2761' }}>
              {player.score || 0}
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>pts</span>
          </div>
        </div>
      ))}

      {sortedPlayers.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '14px', padding: '24px 0' }}>
          Esperando participantes...
        </p>
      )}
    </div>
  );
}

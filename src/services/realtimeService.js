import { supabase, isSupabaseConfigured } from "./supabaseClient";

export class RealtimeQuizService {
  constructor(roomCode) {
    this.roomCode = roomCode;
    this.channel = null;
    this.isSubscribed = false;
  }

  subscribe({ onPlayerJoin, onPlayerVote, onGameState, onNextQuestion, onGameEnd }) {
    if (!isSupabaseConfigured || !supabase) {
      console.warn("Supabase no esta configurado. Ejecutando en modo local.");
      return;
    }

    const channelName = `quiz-room-${this.roomCode}`;
    this.channel = supabase.channel(channelName, {
      config: {
        broadcast: { ack: true, self: false },
      },
    });

    if (onPlayerJoin) {
      this.channel.on("broadcast", { event: "player:join" }, ({ payload }) => {
        onPlayerJoin(payload);
      });
    }

    if (onPlayerVote) {
      this.channel.on("broadcast", { event: "player:vote" }, ({ payload }) => {
        onPlayerVote(payload);
      });
    }

    if (onGameState) {
      this.channel.on("broadcast", { event: "game:state" }, ({ payload }) => {
        onGameState(payload);
      });
    }

    if (onNextQuestion) {
      this.channel.on("broadcast", { event: "game:next" }, ({ payload }) => {
        onNextQuestion(payload);
      });
    }

    if (onGameEnd) {
      this.channel.on("broadcast", { event: "game:end" }, ({ payload }) => {
        onGameEnd(payload);
      });
    }

    this.channel.subscribe((status) => {
      this.isSubscribed = status === "SUBSCRIBED";
    });
  }

  async broadcastEvent(eventName, payload) {
    if (!this.channel || !this.isSubscribed) {
      return false;
    }
    try {
      await this.channel.send({
        type: "broadcast",
        event: eventName,
        payload,
      });
      return true;
    } catch (err) {
      console.error("Error al emitir evento broadcast:", err);
      return false;
    }
  }

  broadcastJoin(player) {
    return this.broadcastEvent("player:join", player);
  }

  broadcastVote(votePayload) {
    return this.broadcastEvent("player:vote", votePayload);
  }

  broadcastState(statePayload) {
    return this.broadcastEvent("game:state", statePayload);
  }

  broadcastNext(nextPayload) {
    return this.broadcastEvent("game:next", nextPayload);
  }

  broadcastEnd(summaryPayload) {
    return this.broadcastEvent("game:end", summaryPayload);
  }

  unsubscribe() {
    if (this.channel) {
      supabase.removeChannel(this.channel);
      this.channel = null;
      this.isSubscribed = false;
    }
  }
}

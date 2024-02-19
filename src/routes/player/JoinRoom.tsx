import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { WS_EVENTS } from "../../socket/events";
import { observable } from "@legendapp/state";

// global state
const State = observable({
  player: {
    id: '',
  }
});

// generate a random number from 1-1000 and append to string 'player'
const generatePlayerId = () => `player${Math.floor(Math.random() * 1000) + 1}`;

function JoinRoom() {
  const navigate = useNavigate();
  // Extract room_id from the URL
  const { room_id: roomId } = useParams();

  useEffect(() => {
    // Check if roomId is available before emitting the message
    if (roomId) {
      // join websocket room for communication of specific events
      socket.emit(WS_EVENTS.JOIN_ROOM, roomId);
      // set playerId
      State.player.id.set(generatePlayerId());
      // let everyone in the room know there is a new player
      socket.emit(WS_EVENTS.NEW_PLAYER, {
        roomId,
        playerId: State.player.id.get(),
      });
      navigate(`/room/${roomId}/waiting-player`);
    }
    //
  }, [roomId, navigate]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Join room</h1>
    </>
  );
}

export default JoinRoom;

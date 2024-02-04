import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

function JoinRoom() {
    // Extract room_id from the URL
    const { room_id: roomId } = useParams();

    useEffect(() => {
        // Check if room_id is available before emitting the message
        if (roomId) {
            // Emit a "joinRoom" event to the server with the roomId
            socket.emit("joinRoom", roomId);
        }

        // disconnect ws connection on unmount
        return () => {
            socket.close();
        }
    }, [roomId]);

    return (
        <>
            <h1 className="text-3xl font-bold underline">Join room</h1>
        </>
    );
}

export default JoinRoom;

import { io } from "socket.io-client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:3000");

function App() {
    const { room_id } = useParams(); // Extract room_id from the URL

    // NOTE: For some reason, the component unmounts and remounts so the effect is called twice. This results in the room_id being emitted twice.
    useEffect(() => {
        // Check if room_id is available before emitting the message
        if (room_id) {
            // Emit a "joinRoom" message to the server with the room_id
            socket.emit("joinRoom", room_id);
            console.log("test");
        }
    }, [room_id]);

    return (
        <>
            <h1 className="text-3xl font-bold underline">!Toohak Frontend</h1>
        </>
    );
}

export default App;

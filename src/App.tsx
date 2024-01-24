// import { socket } from './socket';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
    return (
        <>
            <h1 className="text-3xl font-bold underline">!Toohak Frontend</h1>
        </>
    );
}

export default App;

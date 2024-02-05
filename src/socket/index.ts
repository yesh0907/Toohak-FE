import { io } from "socket.io-client";

// get WebSocket URL from env file
const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;

// expose a global socket instance that connects on page first load
export const socket = io(websocketUrl);

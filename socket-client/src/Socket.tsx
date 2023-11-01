import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { io } from "socket.io-client";
import "./App.css";
const socket = io("ws://localhost:4300");

function SocketC() {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [chatRows, setChatRows] = useState<Array<string>>([]);

  useEffect(() => {
    socket.on("message-from-server", (m: string) => {
      setChatRows([...chatRows, m]);
    });

    socket.on("new-user-logged-in", (m: string) => {
      setChatRows([...chatRows, m]);
    });
  }, [chatRows]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button
          onClick={() => {
            setIsLoading(true);
            socket.timeout(4000).emit("client-login", userName, () => {
              setIsLoading(false);
            });
          }}
        >
          login
        </button>
        <input
          type="text"
          value={userName}
          onChange={(e: any) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      {isLoading && <h1> Loading.... </h1>}
      <div className="card">
        <button
          onClick={() => {
            socket.emit("client-send-message", message);
          }}
        >
          Start Chat
        </button>
        <input
          type="text"
          value={message}
          onChange={(e: any) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <div>
        {chatRows.map((r) => (
          <h3 key={r}>{r}</h3>
        ))}
      </div>
    </>
  );
}

export default SocketC;

import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const SendMessage = ({ socket, name, room, setRefresh }) => {
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();

  const send = () => {
    if (message !== "") {
      const createdAt = new Date();
      socket.emit("send", { message, name, room, createdAt });
      setMessage("");
    }
  };

  const exitRoom = () => {
    window.sessionStorage.setItem("text-room", "");
    window.sessionStorage.setItem("text-name", "");
    // navigate('/', { replace: true });
    window.location.href = '/';
  };

  const refreshRoom = () => {
    setRefresh(true);
    socket.emit("refresh", { room });
  };

  return (
    <div className=" p-4 grid grid-cols-7">
      <button
        type="button"
        onClick={exitRoom}
        className=" col-start-1 col-end-2 px-3 py-2 rounded font-bold text-sm bg-red-600 text-fuchsia-100 hover:bg-red-800"
      >
        Keluar
      </button>
      <button
        type="button"
        onClick={refreshRoom}
        className=" col-start-2 col-end-3 ml-4 px-3 py-2 rounded font-bold text-sm bg-blue-600 text-fuchsia-100 hover:bg-blue-800"
      >
        Reload
      </button>
      <input
        value={message}
        placeholder="Ketik pesan"
        onChange={(event) => setMessage(event.target.value)}
        className=" col-start-3 col-end-7 p-3 mx-4 border border-slate-500 rounded-md text-base"
      />
      <button
        onClick={send}
        className=" px-3 py-2 rounded font-bold text-sm bg-slate-200 hover:bg-slate-400"
      >
        Kirim
      </button>
    </div>
  );
};

export default SendMessage;

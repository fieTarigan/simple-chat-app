// import './App.css';
import Login from "./pages/login";
import Chat from "./pages/chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import io from "socket.io-client";

const PORT = process.env.PORT || 3003;
let socket = io.connect("http://127.0.0.1:" + PORT);

console.log('luar App', socket.id);

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [refresh, setRefresh] = useState(false);

  let textRoom = window.sessionStorage.getItem("text-room");

  if (textRoom === null || textRoom === '') {
    console.log('masuk textroom: ', textRoom);
    textRoom = room;
  }

  console.log('dalam App socket id: ', socket.id);
  console.log('dalam App room: ', room);
  console.log('dalam App text room: ', textRoom);

  return (
    <BrowserRouter>
      <div className=" bg-slate-800">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                name={name}
                setName={setName}
                room={room}
                setRoom={setRoom}
                socket={socket}
                setRefresh={setRefresh}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat name={name} room={room} socket={socket} refresh={refresh} setRefresh={setRefresh} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

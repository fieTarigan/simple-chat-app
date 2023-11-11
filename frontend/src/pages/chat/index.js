import Messages from "./receiveMessages";
import SendMessage from "./sendMessage";

const Chat = ({ name, room, socket, refresh, setRefresh }) => {
  let textRoom = window.sessionStorage.getItem("text-room");
  let dispRoom = window.sessionStorage.getItem("disp-room");
  let textName = window.sessionStorage.getItem("text-name");

  if (room === "umum") {
    dispRoom = "Chat Umum";
  } else if (room === "grup1") {
    dispRoom = "Chat Grup 1";
  } else if (room === "grup2") {
    dispRoom = "Chat Grup 2";
  }

  window.sessionStorage.setItem("disp-room", dispRoom);

  return (
    <div className=" h-screen grid grid-rows-6 w-screen content-center">
      <div className="row-start-1 row-end-2 text-center text-blue-300">
        <div className=" p-6 align-center text-2xl font-bold">
          {dispRoom}
        </div>
      </div>
      <div className="row-start-2 row-end-6">
        <Messages refresh={refresh} socket={socket} />
      </div>
      <div className="row-start-6 content-center">
        <SendMessage socket={socket} name={textName} room={textRoom} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default Chat;

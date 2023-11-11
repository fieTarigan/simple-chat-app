import { useState, useEffect } from "react";

// let oldSocketId;

const Messages = ({ refresh, socket }) => {
  const [messages, setMessages] = useState([]);
  // const [oldMsgLoaded, setOldMsgLoaded] = useState(false);

  // console.log(messages);
  // console.log(socket.id);
// let i = 0;

  useEffect(() => {
    // console.log(i++);
    // let messagesStored = window.sessionStorage.getItem("messagesStored");
    // console.log("messagesStored", messagesStored);
    // console.log("new old socket", socket.id);

    // if (messagesStored === null) {
    //   messagesStored = [];
    //   oldSocketId = socket.id;
    // } 
    // if (oldSocketId !== socket.id && oldMsgLoaded) {
    //   setMessages(JSON.parse(messagesStored));
    //   oldSocketId = socket.id;
    // }

    socket.on("receive", (data) => {
      // console.log('receive new ', socket.id);
      setMessages((state) => {
        const newState = [
          ...state,
          {
            message: data.message,
            name: data.name,
            createdAt: data.createdAt,
          },
        ];
        // window.sessionStorage.setItem("messagesStored", JSON.stringify(newState));
        return newState;
      });
    });

    socket.on("old_messages", (oldMessages) => {
      // console.log('receive old ', socket.id);
      // console.log('old messages', oldMessages);

      oldMessages = oldMessages.sort(
        (a, b) => parseInt(a.createdAt) - parseInt(b.createdAt)
      );

      // setOldMsgLoaded(true);

      setMessages((state) => {
        if (refresh) {
          return [...oldMessages];
        } else {
          return [...oldMessages, ...state];
        }
        // const newState = [...oldMessages, ...state];
        // window.sessionStorage.setItem("messagesStored", JSON.stringify(oldMessages));
        // return newState;
      });

    });
    

    return () => {
      socket.off("receive");
      socket.off("old_messages");
    };
  }, [refresh, socket]);

  return (
    <div className=" h-full overflow-auto ">
      <div className=" flex flex-col items-center justify-center">
        {messages.map((message, i) => (
          <div key={i} className=" rounded-md mb-5 w-1/2 text-fuchsia-200 ">
            <div className=" flex justify-between">
              <span className=" text-base font-bold">{message.name}</span>
              <span className=" text-xs">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>
            <p>{message.message}</p> <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;

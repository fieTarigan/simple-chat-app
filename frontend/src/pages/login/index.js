import { useNavigate } from "react-router-dom";

const Login = ({ name, setName, room, setRoom, socket, setRefresh }) => {
  const navigate = useNavigate();
  const join = () => {
    if (name !== '' && room !== '') {
      window.sessionStorage.setItem("text-name", name);
      window.sessionStorage.setItem("text-room", room);
      setRefresh(false);

      socket.emit('join', {name, room});

      navigate('/chat', { replace: true });
    }
  };

  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <div className="flex flex-col w-1/2 p-8 items-center gap-7 rounded-md bg-slate-600">
        <h1 className=" text-xl font-bold text-blue-200">Masuk Ruang Chat</h1>

        <input
          className=" w-full p-3 rounded-sm border-blue-900 text-base"
          placeholder="Nama"
          onChange={(change) => setName(change.target.value)}
        />

        <select 
          className=" w-full p-2 rounded-sm border-blue-900 text-sm cursor-pointer"
          onChange={(change) => setRoom(change.target.value)}
        >
          <option value="">Pilih ruang chat</option>
          <option value="umum">Chat Umum</option>
          <option value="grup1">Chat Grup 1</option>
          <option value="grup2">Chat Grup 2</option>
        </select>

        <button
          className=" px-3 py-2 rounded font-bold text-sm bg-slate-200 hover:bg-slate-400"
          onClick={join}
        >
          masuk
        </button>
      </div>
    </div>
  );
};

export default Login;


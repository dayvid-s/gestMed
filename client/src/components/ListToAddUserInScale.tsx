import { UserDataWithSelected } from "@/@types/userTypes";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Dayvid from "../assets/dayvid 1.png";

interface ListToAddUserInScaleProps {
  users: UserDataWithSelected[];
  setUsers: Dispatch<SetStateAction<UserDataWithSelected[]>>;
  usersSelected: UserDataWithSelected[];

  loading: boolean;
  error: string | null;
}

export function ListToAddUserInScale({
  users,
  setUsers,
  loading,
  error,
}: ListToAddUserInScaleProps) {
  const handleWithUserSelected = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, selected: !user.selected } : user
      )
    );
  };

  return (
    <>
      <div className="ml-2 flex flex-row flex-wrap items-center justify-start w-full gap-x-6 gap-y-4">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          users.map((user) => (
            <div
              onClick={() => handleWithUserSelected(user.id)}
              key={user.id}
              className={`static p-5 border-2 rounded-md flex flex-row w-72 h-28 cursor-pointer transform transition-all duration-500 ease-in-out ${user.selected ? "bg-green500 border-green500 scale-105" : "bg-white border-gray-300 hover:scale-105"}`}
            >
              <Image
                quality={100}
                className="mr-2 cursor-pointer h-18 w-18 transform transition-transform duration-500 ease-in-out hover:rotate-12"
                src={Dayvid}
                alt="Foto de perfil"
              />
              <div className="flex flex-col">
                <p
                  className={`text-xl font-extrabold block whitespace-nowrap w-44 overflow-x-clip overflow-ellipsis h-auto transition-colors duration-500 ease-in-out ${user.selected ? "text-white" : "text-black"}`}
                >
                  {user.name}
                </p>
                <span className="text-gray-900">Cardiologista</span>
                <span className="text-slate-950 font-medium">
                  {user.shift?.start_time.substring(0, 5)} - {user.shift?.end_time.substring(0, 5)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

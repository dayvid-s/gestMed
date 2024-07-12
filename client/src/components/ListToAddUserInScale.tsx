import { UserData, UserDataWithSelected } from "@/@types/userTypes";
import { fetchDoctors } from "@/features/doctorSclice";
import { fetchUsers } from "@/features/userSlice";
import { AppDispatch } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Dayvid from "../assets/dayvid 1.png";

export function ListToAddUserInScale() {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<UserDataWithSelected[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const action = await dispatch(fetchDoctors());
        if (fetchDoctors.fulfilled.match(action)) {
          const fetchedUsers: UserData[] = action.payload;

          const updatedUsers = fetchedUsers.map((user: UserData) => ({
            ...user,
            selected: false,
          }));

          setUsers(updatedUsers);
        } else {
          if (fetchUsers.rejected.match(action)) {
            setError(action.payload || "Erro ao buscar usuários");
          }
        }
      } catch (err) {
        setError("Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(users);

  function handleWithUserSelected(id: number) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, selected: !user.selected } : user
      )
    );
  }

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-start w-full gap-x-6 gap-y-4">
        {users.map((user) => {
          return (
            <div
              onClick={() => handleWithUserSelected(user.id)}
              key={user.id}
              className={`p-5 border-2 rounded-md flex flex-row w-72 h-28 cursor-pointer transform transition-all duration-500 ease-in-out ${user.selected ? "bg-green500 border-green500 scale-105" : "bg-white border-gray-300 hover:scale-105"}`}
            >
              <Image
                quality={100}
                className="mr-2 cursor-pointer h-18 w-18 transform transition-transform duration-500 ease-in-out hover:rotate-12"
                src={Dayvid}
                alt="Foto de perfil"
              />

              <div className="flex flex-col">
                <p className={`text-xl font-extrabold block whitespace-nowrap w-44 overflow-x-clip overflow-ellipsis h-auto transition-colors duration-500 ease-in-out ${user.selected ? "text-white" : "text-black"}`}>
                  {user.name}
                </p>

                <span className="text-gray-900">Cardiologista</span>
                <span className="text-slate-950 font-medium">
                  {user.shift?.start_time.substring(0, 5)} - {user.shift?.end_time.substring(0, 5)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

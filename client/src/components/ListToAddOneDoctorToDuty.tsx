import { UserDataWithSelected } from "@/@types/userTypes";
import { showAlert } from "@/features/alertSlice";
import { fetchDoctors } from "@/features/doctorSclice";
import { AppDispatch } from "@/store";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import Dayvid from "../assets/dayvid 1.png";

interface AddOneDoctorToDutyProps {
  doctors: UserDataWithSelected[];
  setDoctors: Dispatch<SetStateAction<UserDataWithSelected[]>>;
}

export function AddOneDoctorToDuty({ doctors, setDoctors }: AddOneDoctorToDutyProps) {

  const dispatch = useDispatch<AppDispatch>();

  const handleWithUserSelected = (id: number) => {
    setDoctors((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        selected: user.id === id ? !user.selected : false,
      }))
    );
  };

  const fetchAllDoctors = async () => {
    try {
      const action = await dispatch(fetchDoctors());
      if (fetchDoctors.fulfilled.match(action)) {
        const fetchedUsers = action.payload as UserDataWithSelected[];
        const updatedUsers = fetchedUsers.map((user) => ({
          ...user,
          selected: false,
        }));
        setDoctors(updatedUsers); // Usando updatedUsers
        console.log("ac");
      } else if (fetchDoctors.rejected.match(action)) {
        console.log("ax");
        dispatch(
          showAlert({
            placement: "bottomEnd",
            type: "error",
            title: "Erro ao buscar doutores",
          })
        );
      }
    } catch (err) {
      console.log("ao");
      dispatch(
        showAlert({
          placement: "bottomEnd",
          type: "error",
          title: "Erro ao buscar doutores",
        })
      );
    }
  };

  useEffect(() => {
    fetchAllDoctors();
    console.log(doctors);
  }, []);

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-start w-full gap-x-6 gap-y-4">
        {doctors.map((user) => (
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
              <span className="text-gray-900">{user.specialization}</span>
              <span className="text-slate-950 font-medium">
                {user.shift?.start_time.substring(0, 5)} - {user.shift?.end_time.substring(0, 5)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
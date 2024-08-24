import { Shift, UserData } from "@/@types/userTypes";

import Image from "next/image";
import Dayvid from "../assets/dayvid 1.png";

interface ListToAddUserInScaleProps {
  user: UserData | undefined;
  shift: Shift | undefined
}

export function PreviewOfDoctor({
  user,
  shift,
}: ListToAddUserInScaleProps) {



  return (
    <>
      <span
        className=" mt-5 mb-2 text-xl font-extrabold block whitespace-nowrap w-44 overflow-x-clip overflow-ellipsis h-auto transition-colors duration-500 ease-in-out text-black"
      >Informações</span>
      <div
        // onClick={() => handleWithUserSelected(user.id)}
        key={user?.id}
        className="static bg-gray-100 p-5  rounded-xl flex flex-row   cursor-pointer w-3/4 "
      >

        <div className="flex flex-row">
          <div className=" flex flex-col min-w-60 " >
            <h4 className="  text-black text-xl font-extrabold " >Nome</h4>
            <span
              className=" mb-4  block whitespace-nowrap w-44 overflow-x-clip overflow-ellipsis h-auto "
            >
              {user?.name}
            </span>

            <h4 className="  text-black text-xl font-extrabold">Turno do médico</h4>
            <span> {user?.shift?.name}</span>

          </div>
          <div className="flex flex-col min-w-40 " >
            <h4 className="  text-black text-xl font-extrabold">Especialidade</h4>
            <span className="text-gray-900 mb-4 ">{user?.specialization}</span>

            <h4 className="  text-black text-xl font-extrabold">Plantão Atual</h4>
            <span>{shift?.name == "SD" ? "Plantão Diurno" : "Plantão Noturno"} - {shift?.name}</span>
          </div>

          <Image
            quality={100}
            className="ml-12 cursor-pointer h-18 w-24 "
            src={Dayvid}
            alt="Foto de perfil"
          />
        </div>
      </div>
    </>
  );
}
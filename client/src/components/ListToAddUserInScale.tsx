import { UserData } from "@/@types/userTypes";
import { fetchDoctors } from "@/features/doctorSclice";
import { fetchUsers } from "@/features/userSlice";
import { AppDispatch } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Dayvid from "../assets/dayvid 1.png";

export function ListToAddUserInScale() {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<UserData[]>([]);
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
            selected: false
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

  return (

    <>
      <div className='flex flex-row flex-wrap items-center justify-start w-full gap-x-6 gap-y-4 ' >
        {users.map((user) => {
          return (


            <div key={user.id} className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row  bg-green500' >

              <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

              {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

              <div className='flex flex-col cursor-pointer ' >

                <p className='text-xl font-extrabold text-white '>
                  {user.name}
                  {/* {userName} */}
                </p>

                <span className='text-gray-900 ' > Cardiologista</span>
                <span className='text-slate-950 font-medium '>
                  {user.shift?.start_time.substring(0, 5)} - {user.shift?.end_time.substring(0, 5)}
                </span>


              </div>
            </div>
          );
        })}
      </div>

      <div className='flex flex-row flex-wrap items-center justify-start w-full gap-x-6 gap-y-4 ' >


        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row  bg-green500' >

          <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

          {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

          <div className='flex flex-col cursor-pointer ' >

            <p className='text-xl font-extrabold text-white '>
              Dr. Carlos Santos
              {/* {userName} */}
            </p>

            <span className='text-gray-900 ' > Cardiologista</span>
            <span className='text-slate-950 font-medium ' > 07:00 - 19:00</span>

          </div>




        </div>

        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row' >

          <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

          {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

          <div className='flex flex-col cursor-pointer ' >

            <p className='text-xl font-extrabold text-black '>
              Dr. Dayvid Santos
              {/* {userName} */}
            </p>

            <span className='text-slate-500 ' > Cardiologista</span>
            <span className='text-slate-500 ' > 07:00 - 19:00</span>

          </div>




        </div>
        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row' >

          <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

          {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

          <div className='flex flex-col cursor-pointer ' >

            <p className='text-xl font-extrabold text-black '>
              Dr. Dayvid Santos
              {/* {userName} */}
            </p>

            <span className='text-slate-500 ' > Cardiologista</span>
            <span className='text-slate-500 ' > 07:00 - 19:00</span>

          </div>




        </div>
        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row' >

          <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

          {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

          <div className='flex flex-col cursor-pointer ' >

            <p className='text-xl  text-black '>
              Dr. Dayvid Santos
              {/* {userName} */}
            </p>

            <span className='text-slate-500 ' > Cardiologista</span>
            <span className='text-slate-500 ' > 07:00 - 19:00</span>

          </div>




        </div>
        <div className='p-5 border-2 border-bg[#green500] rounded-md flex flex-row' >

          <Image quality={100} className="mr-2 cursor-pointer h-18 w-18 " src={Dayvid} alt="Foto de perfil" />

          {/* <MdAccountCircle className="ml-auto text-black w-7 h-7 " /> */}

          <div className='flex flex-col cursor-pointer ' >

            <p className='text-xl font-extrabold text-black '>
              Dr. Dayvid Santos
              {/* {userName} */}
            </p>

            <span className='text-slate-500 ' > Cardiologista</span>
            <span className='text-slate-500 ' > 07:00 - 19:00</span>

          </div>




        </div>
      </div>


    </>

  );
}

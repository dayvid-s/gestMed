import { MainScaleDutyInBackend } from "@/@types/MainScaleDutyTypes";
import { UserDataWithSelected } from "@/@types/userTypes";
import { showAlert } from "@/features/alertSlice";
import { fetchDoctors } from "@/features/doctorSclice";
import { createMainScaleDuty } from "@/features/MainScaleDutySlice";
import { fetchShifts } from "@/features/shiftSlice";
import { AppDispatch } from "@/store";
import { removeProperty } from "@/utils/ObjectManipulation";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "rsuite";
import { ListToAddUserInScale } from "./ListToAddUserInScale";
import { SearchForDoctor } from "./SearchForDoctor";

const manrope = Manrope({ subsets: ["latin"] });

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<{
    modalToAddUserInDuty: boolean;
    modalForDoctorSolicitDuty: boolean
  }>>;
  shift_id: number | null;
  scale_date: string | null;
}

export function ModalToAddUsersToMainScale({ modalIsOpen, setIsOpen, scale_date, shift_id }: ImodalProps) {
  const [queryInfo, setQueryInfo] = useState({
    name: "",
    especiality: "",
  });

  const handleClose = () => {
    setIsOpen((prev) => ({ ...prev, modalToAddUserInDuty: false }));
  };
  const dispatch = useDispatch<AppDispatch>();

  const [doctors, setDoctors] = useState<UserDataWithSelected[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userToAddInMainScale, setUserToAddInScaleMain] = useState<UserDataWithSelected[]>([]);

  useEffect(() => {
    dispatch(fetchShifts());
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filteredUsers = doctors.filter((user) => user.selected);
    setUserToAddInScaleMain(filteredUsers.map(obj => removeProperty(obj, "selected")));
  }, [doctors]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const action = await dispatch(fetchDoctors());
      if (fetchDoctors.fulfilled.match(action)) {
        const fetchedUsers = action.payload as UserDataWithSelected[];
        const updatedUsers = fetchedUsers.map((user) => ({
          ...user,
          selected: false,
        }));
        setDoctors(updatedUsers);
      } else {
        if (fetchDoctors.rejected.match(action)) {
          setError(action.payload || "Erro ao buscar doutores");
        }
      }
    } catch (err) {
      setError("Erro ao buscar doutores");
    } finally {
      setLoading(false);
    }
  };


  const handleWithcreateScaleMainDuty = async () => {
    try {
      const newMainScaleDuties: MainScaleDutyInBackend[] = userToAddInMainScale.map((user) => ({
        scale_id: 1,
        user_id: user.id,
        shift_id: shift_id,
        scale_date: scale_date,
      }));


      await dispatch(createMainScaleDuty(newMainScaleDuties)).unwrap();
      dispatch(showAlert({
        placement: "bottomEnd", type: "success", title:
          userToAddInMainScale.length > 1 ?
            `${userToAddInMainScale.length} médicos adicionados no plantão` :
            "Médico adicionado no plantão"
      }));

      resetForm();
      handleClose();
    } catch (error) {
      console.error("Falha ao criar plantão da escala principal", error);
      dispatch(showAlert({ placement: "bottomEnd", type: "error", title: "Falha ao criar plantão da escala principal" }));
    }
  };

  const resetForm = () => {
    setQueryInfo({ name: "", especiality: "" });
    setDoctors(doctors.map(doctor => ({ ...doctor, selected: false })));
  };

  return (
    <div className={manrope.className}>
      <Modal
        className={manrope.className}
        backdrop={true}
        size="lg"
        open={modalIsOpen}
        onClose={handleClose}
      >
        <Modal.Header>
          <h4 className="text-4xl font-semibold">Adicionar Médicos na Escala Principal</h4>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh", padding: "10px" }}>
          <SearchForDoctor queryInfo={queryInfo} setQueryInfo={setQueryInfo} />
          <ListToAddUserInScale
            usersSelected={userToAddInMainScale}
            users={doctors}
            setUsers={setDoctors}
            loading={loading}
            error={error}
          />
        </Modal.Body>
        <Modal.Footer className="flex" >
          <p className="font-medium">
            Obs: Os médicos serão adicionados no plantão <span className="font-bold">{shift_id === 1 ? "diurno" : "noturno"}</span>, dia <span className="font-bold">{scale_date ? `${scale_date.split("-")[2]}/${scale_date.split("-")[1]}` : "data inválida"}</span>.
          </p>
          <button
            className="ml-0 md:ml-auto mr-6 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={resetForm}
            disabled={!userToAddInMainScale}
          >
            Redefinir
          </button>
          <button
            className="flex flex-row ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={handleWithcreateScaleMainDuty}
          >
            {userToAddInMainScale.length > 0 &&
              <div className="w-6 mr-1 bg-white rounded-xl">
                <p className="font-semibold text-black">{userToAddInMainScale.length}</p>
              </div>
            }
            Adicionar {userToAddInMainScale.length > 1 ? "Médicos" : "Médico"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

import { ModelScaleDutyInBackend } from "@/@types/ModelScaleDutyTypes";
import { UserDataWithSelected } from "@/@types/userTypes";
import { showAlert } from "@/features/alertSlice";
import { fetchDoctors } from "@/features/doctorSclice";
import { createModelScaleDuty } from "@/features/ModelScaleDutySlice";
import { fetchShifts } from "@/features/shiftSlice";
import { AppDispatch } from "@/store";
import { removeProperty } from "@/utils/ObjectManipulation";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal } from "rsuite";
import { ListToAddUserInScale } from "./ListToAddUserInScale";

const manrope = Manrope({ subsets: ["latin"] });

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  scale_id: number | undefined;
  shift_id: number | null;
  scale_date: string | null;
}

export function ModalToAddUsersToModelScale({ modalIsOpen, setIsOpen, scale_date, scale_id, shift_id }: ImodalProps) {
  const [queryInfo, setQueryInfo] = useState({
    name: "",
    especiality: "",
    quantityOfDays: "null",
  });

  const handleClose = () => setIsOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  const [doctors, setDoctors] = useState<UserDataWithSelected[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userToAddInScaleModel, setUserToAddInScaleModel] = useState<UserDataWithSelected[]>([]);

  useEffect(() => {
    dispatch(fetchShifts());
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filteredUsers = doctors.filter((user) => user.selected);
    setUserToAddInScaleModel(filteredUsers.map(obj => removeProperty(obj, "selected")));
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

  const handleInputChange = (name: string, value: string) => {
    setQueryInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleWithcreateScaleModelDuty = async () => {
    try {
      const newModelScaleDuties: ModelScaleDutyInBackend[] = userToAddInScaleModel.map((user) => ({
        scale_id,
        user_id: user.id,
        shift_id,
        scale_date,
      }));

      await dispatch(createModelScaleDuty(newModelScaleDuties)).unwrap();
      dispatch(showAlert({
        placement: "bottomEnd", type: "success", title:
          userToAddInScaleModel.length > 1 ?
            `${userToAddInScaleModel.length} médicos adicionado na escala modelo` :
            "Médico adicionado à escala modelo"
      }));

      resetForm();
      handleClose();
    } catch (error) {
      console.error("Falha ao criar plantão de escala modelo", error);
      dispatch(showAlert({ placement: "bottomEnd", type: "error", title: "Erro ao criar plantão de escala modelo" }));
    }
  };


  const resetForm = () => {
    setQueryInfo({ name: "", especiality: "", quantityOfDays: "null" });
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
          <h4 className="text-4xl font-semibold">Adicionar Médicos na Escala Modelo</h4>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh", padding: "10px" }}>
          <Form>
            <div className="flex flex-col flex-wrap items-baseline sm:flex-row ">
              <Form.Group controlId="name">
                <Form.ControlLabel className="font-medium ">
                  Nome do Médico
                </Form.ControlLabel>
                <Form.Control
                  name="name"
                  value={queryInfo.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
              </Form.Group>
              <Form.Group className="ml-10" >
                <Form.ControlLabel className=" mlfont-medium">
                  Especialidade
                </Form.ControlLabel>
                <Form.Control
                  name="speciality"
                  value={queryInfo.especiality}
                  onChange={(value) => handleInputChange("especiality", value)}
                />
              </Form.Group>
            </div>
          </Form>
          <ListToAddUserInScale
            usersSelected={userToAddInScaleModel}
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
          >
            Redefinir
          </button>
          <button
            className="flex flex-row ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={handleWithcreateScaleModelDuty}
          >
            {userToAddInScaleModel.length > 0 &&
              <div className="w-6 mr-1 bg-white rounded-xl">
                <p className="font-semibold text-black">{userToAddInScaleModel.length}</p>
              </div>
            }
            Adicionar {userToAddInScaleModel.length > 1 ? "Médicos" : "Médico"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

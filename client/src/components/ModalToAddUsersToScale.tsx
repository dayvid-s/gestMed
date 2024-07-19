import { ModelScaleDutyInBackend } from "@/@types/ModelScaleDutyTypes";
import { UserDataWithSelected } from "@/@types/userTypes";
import { fetchDoctors } from "@/features/doctorSclice";
import { createModelScaleDuty } from "@/features/ModelScaleDutySlice";
import { fetchShifts } from "@/features/shiftSlice";
import { fetchUsers } from "@/features/userSlice";
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
  scale_date: number | null
}

export function ModalToAddUsersToScale({ modalIsOpen, setIsOpen, scale_date, scale_id, shift_id }: ImodalProps) {
  const [queryInfo, setQueryInfo] = useState({
    name: "",
    especiality: "",
    quantityOfDays: "null",
  });

  const handleClose = () => setIsOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  const [users, setUsers] = useState<UserDataWithSelected[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userToAddInScaleModel, setUserToAddInScaleModel] = useState<UserDataWithSelected[]>([]);

  useEffect(() => {
    dispatch(fetchShifts());
    fetchData();
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.selected);
    setUserToAddInScaleModel(filteredUsers.map(obj => removeProperty(obj, "selected")));
  }, [users]);


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

  const handleInputChange = (name: string, value: string) => {
    setQueryInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleWithcreateScaleModelDuty = async () => {
    try {
      const newModelScaleDuties: ModelScaleDutyInBackend[] = userToAddInScaleModel.map((user) => ({
        scale_id: scale_id,
        user_id: user.id,
        shift_id: shift_id,
        scale_date: scale_date,
      }));

      console.log(newModelScaleDuties, "new");

      await dispatch(createModelScaleDuty(newModelScaleDuties)).unwrap();
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Falha ao criar plantão de escala modelo", error);
    }
  };

  const resetForm = () => {
    setQueryInfo({ name: "", especiality: "", quantityOfDays: "null" });
    setUsers(users.map(user => ({ ...user, selected: false })));
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
          <h4 className="text-4xl font-semibold">Adicionar Médicos na Escala</h4>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh", overflowX: "hidden" }}>
          <Form>
            <div className="flex flex-col sm:flex-row flex-wrap items-baseline ml-2">
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
            users={users}
            setUsers={setUsers}
            loading={loading}
            error={error}
          />
        </Modal.Body>
        <Modal.Footer className="flex" >
          <p className="font-medium">
            Obs: Os médicos serão adicionados no plantão <span className="font-bold">{shift_id === 1 ? "diurno" : "noturno"}</span>, dia <span className="font-bold">{scale_date}</span>.
          </p>
          <button
            className="ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
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
              <div className="w-6 bg-white rounded-xl mr-1">
                <p className="text-black font-semibold">{userToAddInScaleModel.length}</p>
              </div>
            }
            Adicionar {userToAddInScaleModel.length > 1 ? "Médicos" : "Médico"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

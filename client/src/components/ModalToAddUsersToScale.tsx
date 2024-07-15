import { ModelScaleDutyInBackend } from "@/@types/ModelScaleDutyTypes";
import { UserDataWithSelected } from "@/@types/userTypes";
import { fetchDoctors } from "@/features/doctorSclice";
import { createModelScaleDuty } from "@/features/ModelScaleDutySlice";
import { fetchShifts } from "@/features/shiftSlice";
import { fetchUsers } from "@/features/userSlice";
import { AppDispatch } from "@/store";
import { removeProperty } from "@/utils/ObjectManipulation";
import { useAppSelector } from "@/utils/useSelectorHook";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, SelectPicker } from "rsuite";
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

  const shifts = useAppSelector((state) => state.shift.shifts);

  const [users, setUsers] = useState<UserDataWithSelected[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchShifts());
    fetchData();
  }, []);

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

  const shiftOptions = shifts?.map((shift) => ({
    id: shift.id,
    shiftName: shift.name,
    start_time: shift.start_time,
    end_time: shift.end_time,
    label: shift.name,
    value: shift,
  }));

  const handleInputChange = (name: string, value: string) => {
    setQueryInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleWithcreateScaleModelDuty = async () => {
    let userToAddInScaleModel = users.filter((user) => user.selected);
    userToAddInScaleModel = userToAddInScaleModel.map(obj => removeProperty(obj, "selected"));

    console.log(userToAddInScaleModel);


    try {
      const newModelScaleDuties: ModelScaleDutyInBackend[] = users.map((user) => ({

        user_id: user.id,
        scale_id,
        scale_date,
        shift_id,
      }));

      await dispatch(createModelScaleDuty(newModelScaleDuties)).unwrap();
      handleClose();
    } catch (error) {
      console.error("Falha ao criar plantão de escala modelo", error);
    }

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
        <Modal.Body style={{ height: "80vh" }}>
          <Form>
            <div className="flex flex-col sm:flex-row flex-wrap gap-y-3.5 justify-between items-center">
              <Form.Group controlId="name">
                <Form.ControlLabel className="font-medium">
                  Nome do Médico
                </Form.ControlLabel>
                <Form.Control
                  name="name"
                  value={queryInfo.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel className="font-medium">
                  Especialidade
                </Form.ControlLabel>
                <Form.Control
                  name="speciality"
                  value={queryInfo.especiality}
                  onChange={(value) => handleInputChange("especiality", value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel className="font-medium">
                  Turno
                </Form.ControlLabel>
                <SelectPicker
                  searchable={false}
                  name="quantityOfDays"
                  data={shiftOptions}
                  // @ts-expect-error shift não é nulo
                  onChange={(value) => handleInputChange("quantityOfDays", value)}
                />
              </Form.Group>
              {/* <Checkbox
                                    checked={doctorInfo.isAutoFilled}
                                    onChange={handleIsAutoFilledChange}>
                                    Preencher Automaticamente
                                </Checkbox> */}
            </div>
          </Form>
          <ListToAddUserInScale
            users={users}
            setUsers={setUsers}
            loading={loading}
            error={error}
          />
        </Modal.Body>
        <Modal.Footer className="flex" >

          <p className="font-semibold">Obs: Os médicos serão adicionados no plantão noturno, dia {scale_date}.</p>
          <button
            className="ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={() => setQueryInfo({ name: "", especiality: "", quantityOfDays: "null" })}
          >
            Redefinir
          </button>
          <button
            className="ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={handleWithcreateScaleModelDuty}
          >
            Adicionar Médicos
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

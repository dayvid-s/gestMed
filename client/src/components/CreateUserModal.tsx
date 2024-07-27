import { Shift, UserData, roles } from "@/@types/userTypes";
import { fetchShifts } from "@/features/shiftSlice";
import { createUser } from "@/features/userSlice";
import { AppDispatch, RootState } from "@/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "rsuite";
import { CreateUserForm } from "./CreateUserForm";

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateUserModal({ modalIsOpen, setIsOpen }: ImodalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { shifts, loading, error } = useSelector((state: RootState) => state.shift);

  const handleClose = () => setIsOpen(false);
  const [userRole, setUserRole] = useState<roles | null>("Médico");
  const [userShift, setUserShift] = useState<Shift | null>(null);

  const [userData, setUserData] = useState<UserData>({
    id: 1,
    name: "",
    email: "",
    crm: "",
    uf: "",
    city: "",
    phone: "",
    cpf: "",
    rg: "",
    address: "",
    bank: "",
    agency: "",
    account: "",
    password: "",
    specialization: "",
    role: userRole,
    gender: "",
    shift: userShift
  });


  useEffect(() => {
    dispatch(fetchShifts());
  }, []);

  const handleRoleChange = (value: roles | null) => {
    setUserRole(value);
    setUserData(prevData => ({
      ...prevData,
      role: value,
    }));
  };

  const handleShiftChange = (value: Shift | null) => {
    setUserShift(value);
    setUserData(prevData => ({
      ...prevData,
      shift: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(createUser(userData)).unwrap();
      // console.log("Usuário criado com sucesso");
      handleClose();
    } catch (error) {
      console.error("Falha ao criar usuário", error);
    }
  };

  return (
    <>
      <Modal className='z-10 ' backdrop={true} size="lg" open={modalIsOpen} onClose={handleClose}>
        <Modal.Header>
          <h4 className='text-4xl ' >Criar Médico</h4>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh" }} >
          <CreateUserForm
            handleRoleChange={handleRoleChange}
            handleShiftChange={handleShiftChange}
            handleInputChange={setUserData}
            userData={userData}
            shifts={shifts}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className='' onClick={handleClose} appearance="ghost">
            Cancelar
          </Button>
          <Button className='bg-sky-600' onClick={handleSubmit} appearance="primary"  >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import { Shifts, UserData, roles } from "@/@types/userTypes";
import { createUser } from "@/features/userSlice";
import { AppDispatch } from "@/store";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "rsuite";
import { UserForm } from "./UserForm";





export interface ImodalProps {
    modalIsOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateUserModal({ modalIsOpen, setIsOpen }: ImodalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => setIsOpen(false);
  const [userRole, setUserRole] = useState<roles | null>(null);
  const [userShift, setUserShift] = useState<Shifts | null>(null);

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
  console.log(userData);


  const handleRoleChange = (value: roles | null) => {
    setUserRole(value);
    setUserData(prevData => ({
      ...prevData,
      role: value,
    }));
  };

  const handleShiftChange = (value: Shifts | null) => {
    setUserShift(value);
    setUserData(prevData => ({
      ...prevData,
      shift: value,
    }));
  };


  const handleSubmit = async () => {
    try {
      // Validações adicionais podem ser realizadas aqui
      await dispatch(createUser(userData)).unwrap();
      console.log("Usuário criado com sucesso");
      // Atualizações adicionais após a criação do usuário
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
          <UserForm
            handleRoleChange={handleRoleChange}
            handleShiftChange={handleShiftChange}
            handleInputChange={setUserData}
            userData={userData}
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

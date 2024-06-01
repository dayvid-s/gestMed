import { Button, Modal } from 'rsuite';
import React, { Dispatch, SetStateAction, useState } from "react";
import { UserForm } from './UserForm';
import { axiosClient } from '../services/axiosClient';
import { CreateScaleForm } from './CreateScaleForm';


interface UserData {
    name: string;
    email: string;
    crm: string;
    uf: string;
    city: string;
    phone: string;
    cpf: string;
    rg: string;
    address: string;
    bank: string;
    agency: string;
    account: string;
    password: string;
    department: string | null;
    role: string | null;
}




export interface ImodalProps {
    modalIsOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateScaleModal({ modalIsOpen, setIsOpen }: ImodalProps) {
    const handleClose = () => setIsOpen(false);
    const [userDepartment, setUserDepartment] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        crm: '',
        uf: '',
        city: '',
        phone: '',
        cpf: '',
        rg: '',
        address: '',
        bank: '',
        agency: '',
        account: '',
        password: '',
        department: userDepartment,
        role: userRole,
    });
    console.log(userData);

    const handleDepartmentChange = (value: string | null) => {
        setUserDepartment(value);
        setUserData(prevData => ({
            ...prevData,
            department: value,
        }));
    };

    const handleRoleChange = (value: string | null) => {
        setUserRole(value);
        setUserData(prevData => ({
            ...prevData,
            role: value,
        }));
    };


    async function handleSubmit() {
        try {
            // Validações adicionais podem ser realizadas aqui

            const response = await axiosClient.post('/user', userData);

            if (response.status < 300) {
                console.log('Usuário criado com sucesso');
                // Atualiza a lista de usuários após a criação
                // Você pode chamar a função fetchData ou setUsers para atualizar a lista na tabela
                //  e tambem notificar o usuario que o usuario foi criado
                //  e também limpar o form
                //  e tambem adicionar validações. deixe com o fabio. 
            } else {
                console.error('Falha ao criar usuário', response);
            }
        } catch (error) {
            console.error('Falha ao criar usuário', error);
        }

        handleClose();
    }


    return (
        <>
            <Modal className='z-10 ' backdrop={true} size="lg" open={modalIsOpen} onClose={handleClose}>
                <Modal.Header>
                    <h4 className='text-4xl  ' >Criar Escala</h4>
                </Modal.Header>
                <Modal.Body style={{ height: "80vh" }} >
                    <CreateScaleForm
                        handleDepartmentChange={handleDepartmentChange}
                        handleRoleChange={handleRoleChange}
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

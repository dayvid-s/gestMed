import { Nav } from 'rsuite';
import { CreateUserModal } from '../components/CreateUserModal'
import { useState } from 'react';
export default function ActiveItem() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <div className='flex flex-row align-center white' >
            <Nav className='whitespace-normal' appearance="subtle">
                <Nav.Item active>Todos</Nav.Item>
                <Nav.Item >Administradores</Nav.Item>
                <Nav.Item >Membros básicos</Nav.Item>
                <Nav.Menu title="Por setor">
                    <Nav.Item>TI</Nav.Item>
                    {/* <Nav.Item active>Financeiro</Nav.Item> */}
                    <Nav.Item>Financeiro</Nav.Item>
                    <Nav.Item>Setor Oncólogico</Nav.Item>
                </Nav.Menu>

            </Nav>
            <button
                className='ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-[#1B1E59] hover:bg-[#0056b3] text-white'
                type="button"
                onClick={() => { setModalIsOpen(true) }}
            >
                Criar Usuário
            </button>
            <CreateUserModal setIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
        </div>
    );
};
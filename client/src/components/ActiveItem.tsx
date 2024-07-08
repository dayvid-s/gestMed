import { Nav } from 'rsuite';
import { CreateUserModal } from '../components/CreateUserModal'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { closeSideBar } from '@/features/sideBarSlice';
export default function ActiveItem() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className='flex flex-row align-center white' >
            <Nav className='whitespace-normal' appearance="subtle">
                <Nav.Item active>Todos</Nav.Item>
                <Nav.Item >Usuário Master</Nav.Item>
                <Nav.Item >Coordernadores</Nav.Item>
                <Nav.Menu title="Por Especialização">
                    {/* <Nav.Item active>Financeiro</Nav.Item> */}
                    <Nav.Item>Cardiologista</Nav.Item>
                    <Nav.Item>Ginecologista</Nav.Item>
                </Nav.Menu>

            </Nav>
            <button
                className='ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white'
                type="button"
                onClick={() => { setModalIsOpen(true), dispatch(closeSideBar()) }}
            >
                Criar Médico
            </button>
            <CreateUserModal setIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
        </div>
    );
};
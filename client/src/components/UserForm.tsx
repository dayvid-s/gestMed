import React, { Dispatch, SetStateAction } from 'react';
import { Form } from 'rsuite';
import { SelectPicker } from 'rsuite';
import { userDepartments, userRoles } from '../utils/userDepartmentHelper';

type UserData = {
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
    sexo: string | null
};

type UserFormProps = {
    handleInputChange: Dispatch<SetStateAction<UserData>>;
    userData: UserData;
    handleDepartmentChange: (value: string | null) => void;
    handleRoleChange: (value: string | null) => void;
};

export function UserForm({ handleInputChange, userData, handleDepartmentChange, handleRoleChange }: UserFormProps) {
    const handleInput = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        handleInputChange(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Form>
            <div className='flex flex-col sm:flex-row flex-wrap gap-y-3.5 justify-between'>
                <Form.Group controlId="name">
                    <Form.ControlLabel>Nome de usuário</Form.ControlLabel>
                    <Form.Control
                        className='max-w-36'
                        name="name" value={userData.name} onChange={handleInput} />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" type="email" value={userData.email} onChange={handleInput} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.ControlLabel>Senha</Form.ControlLabel>
                    <Form.Control name="password" onChange={handleInput} type="password" autoComplete="off" value={userData.password} />
                </Form.Group>

                <div className="flex flex-row flex-wrap gap-x-4">
                    <Form.Group controlId="select-12">
                        <div>
                            <Form.ControlLabel>Permissão</Form.ControlLabel>
                            <SelectPicker
                                name="role"
                                className="max-w-32 sm:max-w-max"
                                value={userData.role}
                                data={userRoles.map(item => ({ label: item, value: item }))}
                                onChange={handleRoleChange}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="select-10">
                        <div className="ml-10">
                            <Form.ControlLabel>Setor</Form.ControlLabel>
                            <SelectPicker
                                className="max-w-32 sm:max-w-max"
                                value={userData.department}
                                name="department"
                                onChange={handleDepartmentChange}
                                data={userDepartments.map(
                                    item => ({ label: item, value: item })
                                )}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="crm">
                        <Form.ControlLabel>CRM</Form.ControlLabel>
                        <Form.Control name="crm" value={userData.crm} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="uf">
                        <Form.ControlLabel>UF</Form.ControlLabel>
                        <Form.Control name="uf" value={userData.uf} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.ControlLabel>Cidade</Form.ControlLabel>
                        <Form.Control name="city" value={userData.city} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.ControlLabel>Telefone</Form.ControlLabel>
                        <Form.Control name="phone" value={userData.phone} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="cpf">
                        <Form.ControlLabel>CPF</Form.ControlLabel>
                        <Form.Control name="cpf" value={userData.cpf} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="rg">
                        <Form.ControlLabel>RG</Form.ControlLabel>
                        <Form.Control name="rg" value={userData.rg} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="address">
                        <Form.ControlLabel>Endereço</Form.ControlLabel>
                        <Form.Control name="address" value={userData.address} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="bank">
                        <Form.ControlLabel>Banco</Form.ControlLabel>
                        <Form.Control name="bank" value={userData.bank} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="agency">
                        <Form.ControlLabel>Agência</Form.ControlLabel>
                        <Form.Control name="agency" value={userData.agency} onChange={handleInput} />
                    </Form.Group>
                    <Form.Group controlId="account">
                        <Form.ControlLabel>Conta</Form.ControlLabel>
                        <Form.Control name="account" value={userData.account} onChange={handleInput} />
                    </Form.Group>
                </div>
            </div>
        </Form>
    );
};
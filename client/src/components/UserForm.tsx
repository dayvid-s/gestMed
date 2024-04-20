import React, { Dispatch, SetStateAction } from 'react';
import { Form } from 'rsuite';
import { SelectPicker } from 'rsuite';
import { userDepartments, userRoles } from '../utils/userDepartmentHelper'
type UserData = {
    name: string;
    email: string;
    password: string;
    department: string | null;
    role: string | null;
};


type UserFormProps = {
    handleInputChange: Dispatch<SetStateAction<UserData>>;
    userData: UserData;
    handleDepartmentChange:  (value: string | null) => void;
    handleRoleChange:  (value: string | null) => void;
};

export function UserForm({ handleInputChange, userData,
    handleDepartmentChange,
    handleRoleChange

}: UserFormProps) {

    const handleInput = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        handleInputChange(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Form  >
            <div className='flex flex-col sm:flex-row flex-wrap gap-y-3.5 justify-between' >
                <Form.Group controlId="name">
                    <Form.ControlLabel>Nome de usuário</Form.ControlLabel>
                    <Form.Control name="name" value={userData.name} onChange={handleInput} />

                </Form.Group>
                <Form.Group controlId="email">
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" type="email" value={userData.email} onChange={handleInput} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.ControlLabel>Senha</Form.ControlLabel>
                    <Form.Control name="password" onChange={handleInput} type="password" autoComplete="off" value={userData.password} />
                </Form.Group>

                <div className="flex flex-row">
                    <Form.Group controlId="select-10">
                        <div>
                            <Form.ControlLabel>Setor</Form.ControlLabel>
                            <SelectPicker
                                className="max-w-32 sm:max-w-max"
                                value={userData.department}
                                name="department"

                                onChange={handleDepartmentChange

                                }
                                data={userDepartments.map(
                                    item => ({ label: item, value: item })
                                )}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="select-12">
                        <div className="ml-10">
                            <Form.ControlLabel>Permissão</Form.ControlLabel>
                            <SelectPicker
                                name='role'
                                className="max-w-32 sm:max-w-max"
                                value={userData.role}
                                data={userRoles.map(item => ({ label: item, value: item }))}
                                onChange={handleRoleChange}
                            />


                        </div>
                    </Form.Group>
                </div>
            </div>
        </Form>

    );
};

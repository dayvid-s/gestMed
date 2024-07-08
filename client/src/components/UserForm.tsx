import { Shifts, UserData, roles } from "@/@types/userTypes";
import { userRoles, userShits } from "@/utils/userHelper";
import React, { Dispatch, SetStateAction } from "react";
import { Form, SelectPicker } from "rsuite";

type UserFormProps = {
    handleInputChange: Dispatch<SetStateAction<UserData>>;
    userData: UserData;
    handleShiftChange: (value: Shifts | null) => void;
    handleRoleChange: (value: roles | null) => void;
};

export function UserForm({ handleInputChange, userData, handleShiftChange, handleRoleChange }: UserFormProps) {
  const handleInput = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    handleInputChange(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Form>
      <div className='flex flex-col sm:flex-row flex-wrap gap-y-3.5 justify-between'>
        <Form.Group controlId="name">
          <Form.ControlLabel>Nome de usuário</Form.ControlLabel>

          {/* @ts-ignore */}
          <Form.Control
            className='max-w-36'
            name="name"
            value={userData.name}
            onChange={handleInput}
            placeholder="Digite o nome de usuário"
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          {/* @ts-ignore */}
          <Form.Control
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInput}
            placeholder="Digite o email"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.ControlLabel>Senha</Form.ControlLabel>
          {/* @ts-ignore */}
          <Form.Control
            name="password"
            onChange={handleInput}
            type="password"
            autoComplete="off"
            value={userData.password}
            placeholder="Digite a senha"
          />
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
                placeholder="Selecione a permissão"
              />
            </div>
          </Form.Group>
          {userData.role === "Médico" ?
            <>
              <Form.Group controlId="select-10">
                <div className="ml-10">
                  <Form.ControlLabel>Especialização</Form.ControlLabel>
                  {/* @ts-ignore */}
                  <Form.Control
                    placeholder="Digite a especialização"
                    className="max-w-32 sm:max-w-max"
                    value={userData.specialization}
                    name="specialization"
                    onChange={handleInput}
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="crm">
                <Form.ControlLabel>CRM</Form.ControlLabel>
                <Form.Control
                  name="crm"
                  value={userData.crm}
                  onChange={handleInput}
                  placeholder="Digite o CRM"
                />
              </Form.Group>
              <Form.Group controlId="uf">
                <Form.ControlLabel>UF</Form.ControlLabel>
                <Form.Control
                  name="uf"
                  value={userData.uf}
                  onChange={handleInput}
                  placeholder="Digite a UF"
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.ControlLabel>Cidade</Form.ControlLabel>
                <Form.Control
                  name="city"
                  value={userData.city}
                  onChange={handleInput}
                  placeholder="Digite a cidade"
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.ControlLabel>Telefone</Form.ControlLabel>
                <Form.Control
                  name="phone"
                  value={userData.phone}
                  onChange={handleInput}
                  placeholder="Digite o telefone"
                />
              </Form.Group>
              <Form.Group controlId="cpf">
                <Form.ControlLabel>CPF</Form.ControlLabel>
                <Form.Control
                  name="cpf"
                  value={userData.cpf}
                  onChange={handleInput}
                  placeholder="Digite o CPF"
                />
              </Form.Group>
              <Form.Group controlId="rg">
                <Form.ControlLabel>RG</Form.ControlLabel>
                <Form.Control
                  name="rg"
                  value={userData.rg}
                  onChange={handleInput}
                  placeholder="Digite o RG"
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.ControlLabel>Endereço</Form.ControlLabel>
                <Form.Control
                  name="address"
                  value={userData.address}
                  onChange={handleInput}
                  placeholder="Digite o endereço"
                />
              </Form.Group>
              <Form.Group controlId="bank">
                <Form.ControlLabel>Banco</Form.ControlLabel>
                <Form.Control
                  name="bank"
                  value={userData.bank}
                  onChange={handleInput}
                  placeholder="Digite o banco"
                />
              </Form.Group>
              <Form.Group controlId="agency">
                <Form.ControlLabel>Agência</Form.ControlLabel>
                <Form.Control
                  name="agency"
                  value={userData.agency}
                  onChange={handleInput}
                  placeholder="Digite a agência"
                />
              </Form.Group>
              <Form.Group controlId="account">
                <Form.ControlLabel>Conta</Form.ControlLabel>
                <Form.Control
                  name="account"
                  value={userData.account}
                  onChange={handleInput}
                  placeholder="Digite a conta"
                />
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.ControlLabel>Sexo</Form.ControlLabel>
                <Form.Control
                  name="gender"
                  value={userData.gender}
                  onChange={handleInput}
                  placeholder="Digite o sexo"
                />
              </Form.Group>
              <Form.Group controlId="select-type">
                <Form.ControlLabel>Turno</Form.ControlLabel>
                <SelectPicker
                  placement="topStart"
                  name="type"
                  className="max-w-32 sm:max-w-max"
                  value={userData.shift}
                  data={userShits.map(item => ({ label: item, value: item }))}
                  onChange={handleShiftChange}
                  placeholder="Selecione o turno"
                />
              </Form.Group>
            </>
            : null}
        </div>
      </div>
    </Form>
  );
}

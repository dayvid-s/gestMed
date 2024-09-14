export type roles = "Básico" | "Médico" | "Coordenador" | "Master";
export type Shifts = "SD" | "SN" | "SD/SN"

export type genders = "Masculino" | "Feminino" | "";

export interface Shift {
  id: number;
  name: Shifts;
  start_time: string;
  end_time: string;
}

export interface UserType {
  id: number | null;
  name: string | null;
  email: string | null;
  specialization: string | null;
  password: string | null;
  role: roles | null;
  shift: Shift | null;
}
export interface UserData {
  id: number;
  name: string | null;
  email: string | null;
  specialization: string | null;
  password: string | null;
  role: roles | null;
  shift: Shift | null;
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
  gender: genders;
}


export interface UserDataWithSelected extends UserData {
  selected: boolean;
}
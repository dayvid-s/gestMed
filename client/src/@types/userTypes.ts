export type roles = "Básico" | "Médico" | "Coordenador" | "Master";
export type Shifts = "SD" | "SN" | "SD/SN"

export type genders = "Masculino" | "Feminino" | "";

export interface Shift {
  id: number;
  name: Shifts;
  start_time: string;
  end_time: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  specialization: string | null;
  password: string | null;
  role: roles | null;
  shift: Shift | null;
  crm?: string | null;
  uf?: string | null;
  city?: string | null;
  phone?: string | null;
  cpf?: string | null;
  rg?: string | null;
  address?: string | null;
  bank?: string | null;
  agency?: string | null;
  account?: string | null;
  gender: genders;
}


export interface UserDataWithSelected extends UserData {
  selected: boolean;
}
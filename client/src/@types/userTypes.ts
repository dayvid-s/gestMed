export type roles = 'Básico' | 'Médico' | 'Coordenador' | 'Master';
export type genders = 'Masculino' | 'Feminino' | '';

export interface Shift {
    id: number;
    name: string;
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
    shifts: Shift[];
}

export type UserData = Omit<UserType, 'id'> & {
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
    specialization: string | null;
    gender: genders;
};

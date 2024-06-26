export type roles = 'Básico' | 'Médico' | 'Coordernador' | 'Master'


export interface UserType {
    id: number | null;
    name: string | null;
    email: string | null;
    specialization: string | null;
    password: string | null;
    role: roles | null;
}
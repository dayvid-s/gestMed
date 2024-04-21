export type roles  = 'Básico' | 'Admin'


export interface UserType {
    id: number;
    name: string;
    especialization: string;
    password: string;
    role: roles;
}
import { ScaleData } from "@/@types/scaleTypes";
import { api } from "./axiosClient";

export async function fetchAllSchedules() {
    try {
        const response = await api.get<ScaleData[]>('/schedule');

        if (response.status < 300) {
            console.log('Escalas obtidas com sucesso');
            return response.data; 
        } else {
            console.error('Falha ao obter escalas', response);
        }
    } catch (error) {
        console.error('Falha ao obter escalas', error);
    }
}

export async function createSchedule(name: string, total_of_schedule_days: number | null, is_auto_filled: boolean) {
    try {
        const response = await api.post('/schedule', {
            name,
            total_of_schedule_days,
            is_auto_filled
        });

        console.log(process.env.SERVER_URL)
        if (response.status < 300) {
            console.log('Escala criada com sucesso');
        } else {
            console.error('Falha ao criar escala', response);
        }
    } catch (error) {
        console.error('Falha ao criar escala', error);
    }
}

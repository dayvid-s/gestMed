import { Shift } from '../entities/Shift';

export function createDefaultShifts(): Shift[] {
    const dayShift = new Shift();
    dayShift.name = 'SD';
    dayShift.start_time = '08:00:00';
    dayShift.end_time = '16:00:00';

    const nightShift = new Shift();
    nightShift.name = 'SN';
    nightShift.start_time = '16:00:00';
    nightShift.end_time = '00:00:00';

    return [dayShift, nightShift];
}
import { Shift } from '../entities/Shift';

export function createDefaultShifts(): Shift[] {
    const dayShift = new Shift();
    dayShift.name = 'SD';
    dayShift.start_time = '07:00:00';
    dayShift.end_time = '19:00:00';

    const nightShift = new Shift();
    nightShift.name = 'SN';
    nightShift.start_time = '19:00:00';
    nightShift.end_time = '07:00:00';

    return [dayShift, nightShift];
}
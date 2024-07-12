import { Shift } from '../entities/Shift';

export function createDefaultShifts(): Shift[] {
  const dayShift = new Shift();

  dayShift.id = 1;
  dayShift.name = 'SD';
  dayShift.start_time = '07:00:00';
  dayShift.end_time = '19:00:00';

  const nightShift = new Shift();

  nightShift.id = 2;
  nightShift.name = 'SN';
  nightShift.start_time = '19:00:00';
  nightShift.end_time = '07:00:00';

  const allDayShift = new Shift();
  allDayShift.id = 3;
  allDayShift.name = 'SN/SD';
  allDayShift.start_time = '00:00:00';
  allDayShift.end_time = '23:59:00';

  return [dayShift, nightShift, allDayShift];
}

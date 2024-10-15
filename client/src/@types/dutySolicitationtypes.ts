import { MainScaleDuty } from "./MainScaleDutyTypes";
import { Shift, UserData } from "./userTypes";

export interface DutySolicitation {
  id: number;
  status: 'in progress' | 'rejected' | 'approved';
  existentDuty: MainScaleDuty | null;
  message: string | null;
  shift: Shift | null;
  scale_date: string | null;
  user: UserData;
  created_at: string;
  updated_at: string;
}
import { ScaleData } from "./scaleTypes";
import { Shift, UserData } from "./userTypes";

export interface ModelScaleDuty {
  id: number;
  scale: ScaleData;
  user: UserData;
  shift: Shift;
  scale_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ModelScaleDutyInBackend {
  id?: number;
  scale_id: number | null;
  user_id: number | null;
  shift_id: number | null;
  scale_date: number | null;
  created_at?: Date;
  updated_at?: Date;
}

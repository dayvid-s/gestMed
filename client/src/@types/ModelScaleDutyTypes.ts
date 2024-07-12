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
  scale_id: number;
  user_id: number;
  shift_id: number;
  scale_date: number;
  created_at?: Date;
  updated_at?: Date;
}

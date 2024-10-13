import { ScaleData } from "./scaleTypes";
import { Shift, UserData } from "./userTypes";

export interface ScaleDutyType {
  id: number;
  scale: ScaleData;
  user: UserData | null;
  shift: Shift;
  scale_date: string;
  created_at: Date;
  updated_at: Date;
}

export interface ModelScaleDutyInBackend {
  id?: number;
  scale_id: number | undefined;
  user_id: number | null;
  shift_id: number | null;
  scale_date: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type QuantityOfDaysTypes = 7 | 30;

export interface ScaleData {
  name: string;
  isAutoFilled: boolean;
  quantityOfDays: QuantityOfDaysTypes | null;
  created_at?: Date;
  updated_at?: Date;
}


export interface ScaleBackendModel {
  id: number;
  name: string;
  is_auto_filled: boolean;
  total_of_scale_days: number;
  created_at: string;
  updated_at: string;
}
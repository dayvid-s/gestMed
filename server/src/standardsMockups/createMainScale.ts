import { Main_scale } from '../entities/Main_Scale';

export function createMainScale(): Main_scale[] {
  const mainScale = new Main_scale();

  mainScale.total_of_scale_days = 30


  return [mainScale];
}

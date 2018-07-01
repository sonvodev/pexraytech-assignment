import { ActivityStatus } from '../common/enums/activity.enum';

export interface IRootState {
  activityStatus?: ActivityStatus
}

export class RootState implements IRootState {
  activityStatus?: ActivityStatus
  constructor(opt: IRootState = {}) {
    this.activityStatus = opt.activityStatus || ActivityStatus.NoActivity
  }
}

export const initialState = new RootState({ activityStatus: ActivityStatus.NoActivity })
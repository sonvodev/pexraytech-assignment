import { ActivityStatus } from '../common/enums/activity.enum';
import { ITypedAction } from '../models';

export interface IRootAction {
  loadingActivity?(activity: ActivityStatus, type: string): ITypedAction<ActivityStatus>
}
export class RootAction implements IRootAction {
  loadingActivity(activity: ActivityStatus, type: string): ITypedAction<ActivityStatus> {
    return { type, payload: activity }
  }
}


import { Job as DBJob } from '@app/models/backend';

export interface Job extends DBJob {
  id: string;
}

export type JobCreatedRequest = DBJob;

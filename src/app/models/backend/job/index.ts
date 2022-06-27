import { FieldValue } from 'firebase/app/dist/firestore';

export interface Job {
  title: string;
  salary: number;
  created: FieldValue;
  update?: FieldValue;
}

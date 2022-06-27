import { Item, ControlItem } from '@app/models/frontend';
export { Item, ControlItem } from '@app/models/frontend';

export interface Dictionaries {
  rules: Dictionary;
  specializations: Dictionary;
  qualifications: Dictionary;
  skills: Dictionary;
}

export interface Dictionary {
  items: Item[];
  controlItems: ControlItem[];
}

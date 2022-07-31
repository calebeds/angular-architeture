import { ControlItem } from '../controls/select/select.component';

export const markFormGroupTouched = (formGroup: { controls: any }) => {
  (Object as any).values(formGroup.controls).forEach((control: any) => {
    control.markAsTouched();

    if (control.controls) {
      markFormGroupTouched(control);
    }
  });
};

export interface Control {
  items?: ControlItem[];
  changed?: () => void;
  map?: () => void;
}

export interface ControlEntities {
  [key: string]: Control;
}

export const mapControls = (controls: ControlEntities): void => {
  Object.keys(controls).forEach((key) => {
    if (controls[key].map) {
      controls[key].map?.();
    }
  });
};

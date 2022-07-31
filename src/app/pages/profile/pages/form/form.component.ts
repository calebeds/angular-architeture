import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject, switchMap, takeUntil, zip } from 'rxjs';
import { StepperService } from './components/stepper/services';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromForm from '../../store/form';
import { Dictionaries } from '@app/store/dictionaries';
import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapperService } from './services';

export interface ProfileForm {
  personal: PersonalForm;
  professional: ProfessionalForm;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  dictionaries$ = new Observable<Dictionaries>();
  dictionariesIsReady$ = new Observable<boolean>();

  personal$ = new Observable<PersonalForm>();
  professional$ = new Observable<ProfessionalForm>();

  private profile$ = new Observable<ProfileForm>();
  private user!: fromUser.User;

  private isEditing = false;
  private destroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>,
    public stepper: StepperService,
    private mapper: MapperService
  ) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    this.isEditing = !!this.user;

    this.profile$ = this.store.pipe(select(fromForm.getFormState));
    this.personal$ = this.store.pipe(select(fromForm.getPersonalForm));
    this.professional$ = this.store.pipe(select(fromForm.getProfessionalForm));

    this.dictionaries$ = this.store.pipe(
      select(fromDictionaries.getDictionaries)
    );

    this.dictionariesIsReady$ = this.store.pipe(
      select(fromDictionaries.getIsReady)
    );

    if (this.user) {
      const form = this.mapper.userToForm(this.user);
      this.store.dispatch(fromForm.set({ form }));
    }

    this.stepper.init([
      { key: 'personal', label: 'Personal' },
      { key: 'professional', label: 'Professional' },
    ]);

    this.stepper.complete$
      .pipe(
        switchMap(() => zip(this.profile$, this.dictionaries$)),
        takeUntil(this.destroy)
      )
      .subscribe(([profile, dictionaries]) => {
        this.onComplete(profile, this.user, dictionaries);
      });

    this.stepper.cancel$.pipe(takeUntil(this.destroy)).subscribe(() => {
      console.log('Canceled!');
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onChangePersonal(data: PersonalForm): void {
    this.store.dispatch(fromForm.update({ changes: { personal: data } }));
  }

  onChangeProfissional(data: ProfessionalForm): void {
    this.store.dispatch(fromForm.update({ changes: { professional: data } }));
  }

  private onComplete(
    profile: ProfileForm,
    user: fromUser.User,
    dictionaries: fromDictionaries.Dictionaries
  ): void {
    if (this.isEditing) {
      const request = this.mapper.formToUserUpdate(profile, user, dictionaries);
      this.store.dispatch(fromUser.update({ user: request }));
    } else {
      const request = this.mapper.formToUserCreate(profile, dictionaries);
      this.store.dispatch(fromUser.create({ user: request }));
    }
  }
}

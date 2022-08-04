import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
  zip,
} from 'rxjs';
import { StepperService } from './components/stepper/services';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromDictionaries from '@app/store/dictionaries';
import * as fromForm from '../../store/form';
import { Dictionaries } from '@app/store/dictionaries';
import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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

  loading$ = new Observable<boolean>();

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
    console.log('user', this.user);
    console.log(this.route.snapshot.data['user']);
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

    this.loading$ = this.store.pipe(select(fromUser.getLoading));

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
      this.router.navigate(['/profile', this.user.uid]);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.store.dispatch(fromForm.clear());
  }

  get title(): string {
    return this.isEditing ? 'Editing Profile' : 'New Profile';
  }

  onChangePersonal(data: PersonalForm): void {
    this.store.dispatch(fromForm.update({ changes: { personal: data } }));
    console.log('Personal Change triggered');
  }

  onChangeProfissional(data: ProfessionalForm): void {
    this.store.dispatch(fromForm.update({ changes: { professional: data } }));
    console.log('Professional Change triggered');
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
      console.log(user);
      console.log(profile);
      console.log(dictionaries);
      const request = this.mapper.formToUserCreate(profile, dictionaries);
      this.store.dispatch(fromUser.create({ user: request }));
    }
  }
}

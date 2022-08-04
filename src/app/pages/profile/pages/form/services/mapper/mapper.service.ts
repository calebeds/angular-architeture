import { Injectable } from '@angular/core';
import { Dictionaries, Item } from '@app/store/dictionaries';
import { Employee, Recruiter, User, UserCreateRequest } from '@app/store/user';
import { EmployeeForm } from '../../components/professional/roles/employee/employee.component';
import { RecruiterForm } from '../../components/professional/roles/recruiter/recruiter.component';
import { ProfileForm } from '../../form.component';

@Injectable()
export class MapperService {
  constructor() {}

  userToForm(user: User): ProfileForm {
    return {
      personal: {
        name: user ? user.name : ({} as any),
        photoURL: user ? user.photoURL : ({} as any),
        country: user ? user.country : ({} as any),
      },
      professional: {
        about: user ? user.about : ({} as any),
        roleId: user ? user.roleId : ({} as any),
        role: user ? this.getFormRole(user) : ({} as any),
      },
    };
  }

  private getFormRole(user: User): EmployeeForm | RecruiterForm | undefined {
    if (user.roleId === 'employee') {
      const role = user.role as Employee;
      const formRole: EmployeeForm = {
        expectedSalary: role.expectedSalary ? role.expectedSalary : ({} as any),
        specialization: role.specialization
          ? role.specialization.id
          : ({} as any),
        qualification: role.qualification ? role.qualification.id : ({} as any),
        skills: role.skills ? role.skills.map((x) => x.id) : ({} as any),
        experiences: role.experiences,
      };

      return formRole;
    }

    if (user.roleId === 'recruiter') {
      const role = user.role as Recruiter;
      const formRole: RecruiterForm = {
        companyName: role.companyName,
        employeesCount: role.employeesCount,
      };

      return formRole;
    }

    return undefined;
  }

  formToUserCreate(
    form: ProfileForm,
    dictionaries: Dictionaries
  ): UserCreateRequest {
    return {
      name: form.personal.name,
      photoURL: form.personal.photoURL,
      roleId: form.professional.roleId,
      country: form.personal.country,
      about: form.professional.about,
      role: form.professional.role
        ? this.getRole(form, dictionaries)
        : ({} as any),
    };
  }

  formToUserUpdate(
    form: ProfileForm,
    user: User,
    dictionaries: Dictionaries
  ): User {
    return {
      uid: user.uid,
      email: user.email,
      created: user.created,
      name: form.personal.name,
      photoURL: form.personal.photoURL,
      roleId: form.professional.roleId,
      country: form.personal.country,
      about: form.professional.about,
      role: form.professional.role
        ? this.getRole(form, dictionaries)
        : ({} as any),
    };
  }

  private getRole(
    form: ProfileForm,
    dictionaries: Dictionaries
  ): Employee | Recruiter | undefined {
    if (form.professional.roleId === 'employee') {
      const formRole = form.professional.role as EmployeeForm;

      const role: Employee = {
        expectedSalary: formRole.expectedSalary,
        specialization: dictionaries.specializations.items.find(
          (x) => x.id === formRole.specialization
        ) as Item,
        qualification: dictionaries.qualifications.items.find(
          (x) => x.id === formRole.qualification
        ) as Item,
        skills: formRole.skills.map((id) =>
          dictionaries.skills.items.find((x) => x.id === id)
        ) as Item[],
        experiences: formRole.experiences,
      };

      return role;
    }

    if (form.professional.roleId === 'recruiter') {
      const formRole = form.professional.role as RecruiterForm;

      const role: Recruiter = {
        companyName: formRole.companyName,
        employeesCount: formRole.employeesCount,
      };

      return role;
    }

    return undefined;
  }
}

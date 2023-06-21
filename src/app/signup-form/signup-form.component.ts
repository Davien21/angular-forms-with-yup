import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { YupFormControls, FormHandler } from 'src/utilities/form-handler';
import * as Yup from 'yup';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  signupForm: FormGroup<YupFormControls<ISignupForm>>;

  initialValues: ISignupForm = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  validationSchema: Yup.ObjectSchema<ISignupForm> = Yup.object().shape({
    name: Yup.string().required('Name is required').min(2),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character'
      ),
    phone: Yup.string()
      .required('Phone is required')
      .matches(
        /^\+[1-9]{1,5}\d{7,14}$/,
        'Please enter a valid international number'
      ),
  });

  formError = (controlName: string) => {
    const control = this.signupForm.get(controlName);
    if (control?.pristine && !control.touched) return;
    return this.signupForm?.errors?.[controlName];
  };

  constructor() {
    this.signupForm = FormHandler.controls<ISignupForm>(this.initialValues);
    this.signupForm.setValidators(
      FormHandler.validate<ISignupForm>(this.validationSchema)
    );
  }

  onSubmit() {
    alert('Form submitted successfully!');
  }
}

interface ISignupForm {
  name: string;
  email: string;
  password: string;
  phone: string;
}

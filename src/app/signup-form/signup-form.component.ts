import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?\d{1,5}-\d{7,14}$/),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.signupForm.value);
  }
}

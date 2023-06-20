import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.form.value);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SignupFormComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

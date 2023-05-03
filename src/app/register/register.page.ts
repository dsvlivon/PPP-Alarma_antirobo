import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  authSrv = inject(AuthService);

  formData: FormGroup;
  error: boolean = false;
  message: string = '';

  constructor(private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.formData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onCancel(){this.router.navigate(['/login']);}
  async onRegister() {

    const form = this.formData.value;
    if (this.formData.value['password'] === this.formData.value['confirmPassword']) {

      const user = await this.authSrv.registerUser(form.email, form.password).then((resp) => {
        this.router.navigate(['/home']);
        return user;
      }).catch(err => {
        console.log(err);

        this.error = true;
        this.message = err;
        setTimeout(() => {
          this.message = '';
          this.error = false;
        }, 1000);
      });
    } else {
      this.error = true;
      this.message = "Las contraseñas no coinciden";
      setTimeout(() => {
        this.message = '';
        this.error = false;
      }, 1000);
    }
  }

  get email() {
    return this.formData.get('email');
  }
  get password() {
    return this.formData.get('password');
  }
  get confirmPassword() {
    return this.formData.get('confirmPassword');
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  authSrv = inject(AuthService);
 

  formData: FormGroup;
  error: boolean = false;
  message: string = '';
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    const form = this.formData.value;
    const user = await this.authSrv.signIn(form.email, form.password).then(resp => {
      this.router.navigate(['/home']);
      return user;
    }).catch(err => {
      console.log(err);

        this.error = true;
        this.message = "El usuario no existe";
        setTimeout(() => {
          this.message = '';
          this.error = false;
        }, 2000);
    });
  }

  async accesoRapidoAnonimo() {
    const form = this.formData.value;
    const user = await this.authSrv.signIn("anonimo@anonimo.com", "444444").then(resp => {
      this.router.navigate(['/home']);
      return user;
    });
  }
  async accesoRapidoInvitado() {
    const form = this.formData.value;
    const user = await this.authSrv.signIn("invitado@invitado.com", "222222").then(resp => {
      this.router.navigate(['/home']);
      return user;
    });
  }
  async accesoRapidoTester() {
    const form = this.formData.value;
    const user = await this.authSrv.signIn("tester@tester.com", "555555").then(resp => {
      this.router.navigate(['/home']);
      return user;
    });
  }
  onRegister(){
    this.router.navigate(['register']);
  }
  get email() {
		return this.formData.get('email');
	}
  get password() {
		return this.formData.get('password');
	}
}

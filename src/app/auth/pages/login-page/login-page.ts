import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule, CardModule, FloatLabelModule, PasswordModule, IconFieldModule, InputIconModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage { 

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private messageService = inject(MessageService);


  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {

    console.log('FORM VALID:', this.form.valid);
    console.log('FORM VALUE:', this.form.value);
    const { username, password } = this.form.value;

    if (username === 'admin' && password === 'admin123') {

      localStorage.setItem('token', 'fake-jwt-token');

      localStorage.setItem('user', username);

      console.log('✅ Token creado:', localStorage.getItem('token'));

      console.log('👤 Usuario:', localStorage.getItem('user'));

      this.router.navigateByUrl('/warriors/characters');

      this.messageService.add({
        severity: 'success',
        summary: 'Bienvenido',
        detail: 'Login exitoso',
        life: 2000
      });
      } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Credenciales incorrectas',
        life: 3000
      });
    }
  }

  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

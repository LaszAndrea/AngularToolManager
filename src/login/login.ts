import { Component } from '@angular/core';
import { AuthService } from '../auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule, RouterLink, ToastrModule] 
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  onLogin() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
            this.toastr.success('Sikeres Bejelentkezés!', 'Siker '+ res.user);
            localStorage.setItem('loggedInUser', JSON.stringify(res.user));
            this.router.navigate(['/home']);
          },
          error: (err: { error: { message: string; }; }) => {
            this.toastr.error(err.error.message, 'Hiba');
          }
      });
  }
}

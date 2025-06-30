import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink, ToastrModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

    name = '';
    email = '';
    password = '';
    message = '';
  

    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

    onRegister() {
      this.authService.register({ name: this.name, email: this.email, password: this.password })
        .subscribe({
          next: (res: any) => {
            this.message = res.message;
            this.toastr.success('Sikeres regisztráció!', 'Siker');
            this.router.navigate(['/login']);
          },
          error: (err: { error: { message: string; }; }) => {
            this.toastr.error(err.error.message, 'Hiba');
          }
        });
    }


}

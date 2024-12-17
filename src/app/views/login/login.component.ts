import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private organization: string = '672a76272f0adeb5ad634dbf';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password, this.organization).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      error => {
        console.error("Login failed:", error);
      }
    );
  }
}
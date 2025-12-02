import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  remember = true;

  constructor(private router: Router) {}

  onSubmit(): void {
    // basic required checks
    if (!this.username || !this.password) {
      return;
    }

    // enforce 7-character max on the stored value
    const safePassword = this.password.slice(0, 7);

    if (this.remember) {
      const payload = {
        username: this.username,
        password: safePassword,
        storedAt: new Date().toISOString(),
        note: 'Test-only credentials. Do not use real passwords.',
      };

      try {
        localStorage.setItem('testLoginUser', JSON.stringify(payload));
      } catch {}
    }

    this.router.navigate(['/dashboard']);
  }
}

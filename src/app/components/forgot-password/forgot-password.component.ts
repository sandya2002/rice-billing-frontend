// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent {
//   mobileNumber: string = '';
//   newPassword: string = '';
//   confirmPassword: string = '';

//   constructor(private router: Router) {}

//   resetPassword() {
//     if (!this.mobileNumber || !this.newPassword || !this.confirmPassword) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     if (this.newPassword !== this.confirmPassword) {
//       alert('Passwords do not match.');
//       return;
//     }

//     const usersString = localStorage.getItem('users');
//     if (!usersString) {
//       alert('No registered users found.');
//       return;
//     }

//     const users = JSON.parse(usersString) as { mobile: string, password: string }[];
//     const userIndex = users.findIndex(u => u.mobile === this.mobileNumber);

//     if (userIndex === -1) {
//       alert('Mobile number not found.');
//       return;
//     }

//     // Update the user's password
//     users[userIndex].password = this.newPassword;
//     localStorage.setItem('users', JSON.stringify(users));

//     alert('Password reset successfully! Please login with your new password.');
//     this.router.navigate(['/login']);
//   }
// }



import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  mobileNumber: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  resetPassword() {
    if (!this.mobileNumber || !this.newPassword || !this.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const usersString = localStorage.getItem('users');
    if (!usersString) {
      alert('No registered users found.');
      return;
    }

    const users = JSON.parse(usersString) as { mobile: string, password: string }[];
    const userIndex = users.findIndex(u => u.mobile === this.mobileNumber);

    if (userIndex === -1) {
      alert('Mobile number not found.');
      return;
    }

    // Update the user's password
    users[userIndex].password = this.newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    alert('Password reset successfully! Please login with your new password.');
    this.router.navigate(['/login']);
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}
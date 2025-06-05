import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  otp: string = '';
  otpSent: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  //
  // Step 1: Send OTP
  // sendOtp() {
  //   if (!this.email) {
  //     alert('Please enter your email');
  //     return;
  //   }

  //   // this.http
  //   //   .post('http://localhost:8080/api/auth/login/request', { email: this.email }, { responseType: 'text' })
  //   //   .subscribe({
  //   //     next: () => {
  //   //       this.otpSent = true;
  //   //       alert('OTP sent to your email');
  //   //     },
  //   //     error: (error: HttpErrorResponse) => {
  //   //       alert('Failed to send OTP: ' + error.message);
  //   //     },
  //   //   });
  //   this.http.post('http://localhost:8080/api/auth/login/request', {
  //       email: this.email
  //     }, {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //     }).subscribe({
  //       next: (res) => {
  //         console.log('OTP sent:', res);
  //         alert('OTP sent to email!');
  //       },
  //       error: (err) => {
  //         console.error('Failed to send OTP:', err);
  //         alert('Failed to send OTP.');
  //       }
  //     });

  // }




  sendOtp() {
  if (!this.email) {
    alert('Please enter your email');
    return;
  }

  this.http.post(
    'http://localhost:8080/api/auth/login/request',
    { email: this.email },
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json' // ✅ Fix mismatch
    }
  ).subscribe({
    next: (res) => {
      console.log('OTP sent:', res);
      alert('OTP sent to email!');
      this.otpSent = true; // ✅ SHOW OTP FORM
    },
    error: (err) => {
      console.error('Failed to send OTP:', err);
      alert('Failed to send OTP.');
    }
  });
}


  // Step 2: Verify OTP
  // verifyOtp() {
  //   const payload = {
  //     email: this.email,
  //     code: this.otp
  //   };
  //   this.http.post('http://localhost:8080/api/auth/login/verify', payload)
  //     .subscribe({
  //       next: (res) => {
  //         console.log('OTP verified successfully', res);
  //         alert('Login successful!');
  //       },
  //       error: (err) => {
  //         console.error('OTP verification failed', err);
  //         alert('Invalid or expired OTP.');
  //       }
  //     });
  // }
    verifyOtp() {
      const payload = {
        email: this.email,
        code: this.otp
      };

      this.http.post('http://localhost:8080/api/auth/login/verify', payload, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text'  // Because backend returns plain text
      }).subscribe({
        next: (res) => {
          console.log('OTP verified successfully', res);
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('OTP verification failed', err);
          alert('Invalid or expired OTP.');
        }
      });
    }



  resendOtp() {
    this.sendOtp();
  }
}
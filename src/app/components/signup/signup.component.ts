// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   mobile: string = '';
//   email: string = '';
//   password: string = '';
//   submitted = false;

//   constructor(private router: Router) {}

//   onSubmit(form: NgForm) {
//     this.submitted = true;

//     if (form.invalid) {
//       return;
//     }

//     // Fetch existing users from localStorage
//     let users = JSON.parse(localStorage.getItem('users') || '[]');

//     // Check if the mobile number already exists
//     const userExists = users.some((user: any) => user.mobile === this.mobile);
//     if (userExists) {
//       alert('This mobile number is already registered. Please log in instead.');
//       return;
//     }

//     // Create a new user object
//     const newUser = {
//       mobile: this.mobile,
//       email: this.email,
//       password: this.password,
//       registrationDate: new Date().toISOString()
//     };

//     // Add the new user to the list
//     users.push(newUser);

//     // Save updated users list back to localStorage
//     localStorage.setItem('users', JSON.stringify(users));

//     console.log('User registered:', newUser);

//     // Navigate to login page
//     alert('Signup successful! Please login now.');
//     this.router.navigate(['/login']);
//   }
// }

// import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   mobile: string = '';
//   email: string = '';
//   password: string = '';
//   submitted = false;

//   constructor(private router: Router, private http: HttpClient) {}

//   onSubmit(form: NgForm) {
//     this.submitted = true;
//     const newUser = {
//       mobile: this.mobile,
//       email: this.email,
//       password: this.password
//     };

//     // POST to your backend API
//     this.http.post('http://localhost:8080/api/signup', { email: this.email }, {
//       headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//   }),
//   withCredentials: true
// }).subscribe({
//   next: res => console.log("Success:", res),
//   error: err => console.error("Signup failed:", err)
// });

//   }
// }


import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  mobile: string = '';
  email: string = '';
  password: string = '';
  submitted = false;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.invalid) {
      return;
    }

    const newUser = {
      mobile: this.mobile,
      email: this.email,
      password: this.password
    };

    // POST full user object to backend
    this.http.post('http://localhost:8080/api/signup', newUser, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' // tell Angular not to parse as JSON
    }).subscribe({
      next: res => {
        console.log('signup success');
        alert(res); // shows "Signup successful"
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Signup failed:', err);
        alert('Signup failed! Please try again.');
      }
    });

  }
}

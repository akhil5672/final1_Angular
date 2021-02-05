import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import {Router} from '@angular/router';
import {Loginres} from '../loginres';
import {Email} from '../email';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {email:Email;
  resetPasswordEmail: any;
  mail: any;
  verify: any;
  constructor(private service:RegisterService , private router: Router) {
    this.email = new Email;
    this.verify = this.email.otp;
  }
  SendOtp(to: any) {
    
    this.email.to = to;
    this.service.sendMail(this.email).subscribe(data => { });
    debugger;
    this.service.GetUserWithEmail(this.email.to).subscribe(data => {
      if(data.StatusCode==1){   
        localStorage.setItem("customerId",data.CustomerId.toString());
      } 
    })
    if(!this.email.to){
      alert('Please enter a valid email');
    }else{
      alert('OTP send to your registered email');
    }
  }

  verifyopt(reset: any) {
    debugger;
    if (reset == this.verify) {
      this.router.navigate(['/changepassword']);
    }
    else {
      alert('Please enter the valid OTP');
    }
  }

  ngOnInit(): void {
  }

  onSubmit(f) {
    console.log(f.value);
    console.log(f.valid);
  }

 
}

import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import {Router,ActivatedRoute} from '@angular/router';
import {Customer} from '../customer';
import {Passwordcredentials} from '../passwordcredentials';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password:Passwordcredentials=new Passwordcredentials();
  customer_id: number;
  pass: string;
  cpass: string;
  Admin: Customer;

  constructor(private _activatedRouter: ActivatedRoute, private service: RegisterService, private router: Router) {
    this.password.customer_id=parseInt(localStorage.getItem('customerId'));
    
  }

  changepass(password: string, confirmpassword: string) {
    if (password) {
      if (password == confirmpassword) {
        debugger;
        this.password.password=password;
        this.service.Postpasscred(this.password).subscribe(data => {
          if(data==1){
            alert("Password updated successfully");
            this.router.navigate(['/UserLogin']);
          }
          else{
            alert('password reset failed');
          }
        })
      }
      else {
        alert('Password and Confirm Password do not match');
      }
    } else {
      alert('Please enter the password');
    }
  }

  ngOnInit(): void {
  }
 
}

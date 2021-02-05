import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../register.service';
import {Dashboard} from '../dashboard';
import {RecentTransactionsResponse} from '../recent-transactions-response';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
dashboard:Dashboard=new Dashboard();
status:boolean=false;
recent:RecentTransactionsResponse=new RecentTransactionsResponse();
  constructor(private service:RegisterService) {
 }

  ngOnInit(): void {
    this.service.GetRegistrationStatus(parseInt(this.service.customerId)).subscribe((data)=>{
      debugger;
      this.status=data; 
      if(this.status){
        this.service.GetEMIcardbyCustomerId(parseInt(this.service.customerId)).subscribe((data)=>{
          this.dashboard=data;
          console.log(this.dashboard);
        })
         
        this.service.GetRecentTransactions(parseInt(this.service.customerId)).subscribe((data)=>{
         this.recent=data;
         console.log(this.recent);
        })
      }
    })
    // if(status){
    //   this.service.GetEMIcardbyCustomerId(parseInt(this.service.customerId)).subscribe((data)=>{
    //     this.dashboard=data;
    //     console.log(this.dashboard);
    //   })
       
    //   this.service.GetRecentTransactions(parseInt(this.service.customerId)).subscribe((data)=>{
    //    this.recent=data;
    //    console.log(this.recent);
    //   })

   // }

  }
  OnClickPayNow(OrderId){
    this.service.GetPayNowStatusByOrderId(OrderId).subscribe((data)=>{
      debugger;
      if(data)
      {
        this.service.GetEMIcardbyCustomerId(parseInt(this.service.customerId)).subscribe((data)=>{
          this.dashboard=data;
        });
        debugger;
        this.service.GetRecentTransactions(parseInt(this.service.customerId)).subscribe((data)=>{
          this.recent=data;
          console.log(this.recent);
         }) 
        
      }
    })
  }

}

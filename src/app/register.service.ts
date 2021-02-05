import { Injectable } from '@angular/core';
import {Reg} from './reg';
import { HttpClient, HttpErrorResponse, HttpHeaders } from"@angular/common/http";
import {  from, Observable, throwError } from'rxjs';
import { catchError } from'rxjs/operators';
import {Product} from './product';
import { Logincredentials } from './logincredentials';
import {Customer} from './customer';
import{EMItypes} from './emitypes';
import { Orderattrbutes } from './orderattrbutes';
import { Loginres } from './loginres';
import {Adminloginresponse} from './adminloginresponse';
import{Orders} from './orders';
import {Buynowcredentials} from './buynowcredentials';
import {Dashboard} from './dashboard';
import {RecentTransactionsResponse} from './recent-transactions-response';
// import {Dashboardresponse} from './dashboardresponse';

@Injectable({
  providedIn: 'root'
})



export class RegisterService {
  private apiServer = "http://localhost:50556/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
    
  }
  isUserLoggedIn:boolean=false;
  customerId:string;
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    debugger;
    return this.httpClient.get<Product[]>(this.apiServer + '/productsMasters')    
  }
  register(Reg): Observable<number> {
    return this.httpClient.post<number>(this.apiServer + '/customers/', JSON.stringify(Reg), this.httpOptions)   
  }

  //  UserLogin(Logincredentials): Observable<string> {​​​​​
  //     return this.httpClient.get<string>(this.apiServer + '/Logincustomer?user_name=' +Logincredentials.user_name+'&?user_password='+Logincredentials.user_password );
  //   }​​​​​ 

   UserLogin(logincredentials): Observable<Loginres> {​​​​​
      return this.httpClient.post<Loginres>(this.apiServer + '/user/',JSON.stringify(logincredentials),this.httpOptions);
       }​​​​​ 
   

    AdminLogin(logincredentials): Observable<Adminloginresponse> {​​​​​
      return this.httpClient.post<Adminloginresponse>(this.apiServer + '/admin/',JSON.stringify(logincredentials),this.httpOptions);
     }​​​​​ 
     
     GetAllCustomers(): Observable<Customer[]> {
      return this.httpClient.get<Customer[]>(this.apiServer + '/customers') 
     }
     GetByCustomerId(id):Observable<Customer>{ 
       return this.httpClient.get<Customer>(this.apiServer + '/Customers?id=' + id)
     }

     UpdateCustomer(id, customer): Observable<number> {
       debugger;
      return this.httpClient.put<number>(this.apiServer + '/Customers/' + id, JSON.stringify(customer), this.httpOptions)
    }
    DeleteCustomer(id){
      return this.httpClient.delete<Customer>(this.apiServer + '/Customers/' + id, this.httpOptions)    
    }
    GetByProductId(id):Observable<Product>{ 
      return this.httpClient.get<Product>(this.apiServer + '/productsMasters?id=' + id)
    }



PostEMIcard(Customer):Observable<number>{
  debugger;
  return this.httpClient.post<number>(this.apiServer+'/EMIcards/',JSON.stringify(Customer),this.httpOptions)
}
GetEMItypes():Observable<EMItypes[]>{
  return this.httpClient.get<EMItypes[]>(this.apiServer+'/EMItypeMasters')
}
Postplaceorder(order):Observable<number>{
return this.httpClient.post<number>(this.apiServer+'/orders/',JSON.stringify(order),this.httpOptions)
}


GetOrdersByCustomerId(id):Observable<Orders[]>{
  debugger;
  return this.httpClient.get<Orders[]>(this.apiServer+'/orders1?customer_id='+id)
}

PostBuyNowCred(buynowcred):Observable<number>{
  debugger;
  return this.httpClient.post<number>(this.apiServer+'/orders1/',JSON.stringify(buynowcred),this.httpOptions)
  }

  GetEMIcardbyCustomerId(customer_id):Observable<Dashboard>{
    return this.httpClient.get<Dashboard>(this.apiServer+'/EMIcards?customer_id='+customer_id)
  }

  GetPayNowStatusByOrderId(OrderId):Observable<boolean>{
    return this.httpClient.get<boolean>(this.apiServer+'/Transactions?OrderId='+OrderId)
  }
  sendMail(Email): Observable<Loginres> {
    return this.httpClient.post<Loginres>(this.apiServer + '/Email/', JSON.stringify(Email), this.httpOptions)   
  }
  GetUserWithEmail(email):Observable<Loginres>{
    debugger;
    return this.httpClient.get<Loginres>(this.apiServer + '/UserWithEmail?email=' + email);
  }
  Postpasscred(password):Observable<number>{
    debugger;
    return this.httpClient.post<number>(this.apiServer+'/UserWithEmail/',JSON.stringify(password),this.httpOptions)
  }
  GetRecentTransactions(customer_id):Observable<RecentTransactionsResponse>{
    debugger;
    return this.httpClient.get<RecentTransactionsResponse>(this.apiServer+'/orders?customer_id='+customer_id)
  }
  GetRegistrationStatus(customer_id):Observable<boolean>{
    return this.httpClient.get<boolean>(this.apiServer + '/RegistrationStatus?id=' +customer_id)
  }

  
  
}

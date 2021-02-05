export class Email {
    to:string;
    body:string;
    otp:string;
    constructor(to:string="",body:string="",otp:string=""  )
    {​​​​​
        this.to = to;
        this.otp = (Math.floor(Math.random() * 999999) + 100001).toString()
        this.body = this.otp;
    }
}

import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styles: []
})
export class PaymentDetailComponent implements OnInit {

  constructor(private service: PaymentDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      cvv: ''
    }
  }

  onSubmit(form:NgForm){
    if(form.value.PMId==0){
      this.inserrtRecord(form);
    }
    else{
      this.UpdatetRecord(form);

    }
   
  }

  inserrtRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(res=>
      {
        this.resetForm(form);
        this.toastr.success("Submitted Successfuly","payment Detail Register");
        this.service.refreshList();
      },
      err=>{
        console.log(err);
      }
      )
  }
  UpdatetRecord(form:NgForm){
    this.service.puttPaymentDetail().subscribe(res=>
      {
        this.resetForm(form);
        this.toastr.info("Submitted Successfuly","payment Detail Register");
        this.service.refreshList();
      },
      err=>{
        console.log(err);
      }
      )
  }

}

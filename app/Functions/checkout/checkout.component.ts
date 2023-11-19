import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyServiceService } from '../../Shared/services/property-service.service';
import { DocumentUrl, GetProperty, Property, } from '../../Shared/Models/ILogin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentService } from '../../Shared/services/document.service';

declare let Razorpay : any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit{
  id : string = "";
  isLoading : boolean = false;
  checkOutProperty : Property = {
    id: '',
    location: '',
    landLordId: '',
    rent: 0,
    description: '',
    type: '',
    numOfRooms: 0,
    isAvailable: false,
    availableFrom: '',
    ameneties: [],
    images: []
  }
  document : DocumentUrl = {
    id: '',
    tenantId: '',
    propertyId: '',
    landlordId: '',
    doc1: '',
    doc2: '',
    isVerified: false
  }
  isVerified : boolean = false;
  isRole : boolean = true;
  constructor(private documentService  : DocumentService,private _snackbar : MatSnackBar,private router : Router ,private route : ActivatedRoute,private property : PropertyServiceService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.property.getProperty(this.id).subscribe((data)=>{
      this.checkOutProperty = data[0];
      console.log(this.checkOutProperty)
      this.isLoading = false;
    })
  }

  inputDoc(event : any , id : number){
    if(id==1){
       this.changeToBase64(event,id);
      console.log(this.document.doc1);
    }
    else{
      this.changeToBase64(event,id);
      console.log(this.document.doc2);
    }
  }

  changeToBase64(event : any,id : number){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        let path = event.target == null ? '' : event.target.result;
        const filePath = path as string;
        if(id===1){
          this.document.doc1 = filePath.split(",")[1];
        }
        else{
          this.document.doc2 = filePath.split(",")[1];
        }
      }
  }

  sendDocs(){
    this.document.propertyId = this.checkOutProperty.id;
     this.document.tenantId =  sessionStorage.getItem("userId")!;
     this.document.landlordId = this.checkOutProperty.landLordId;
    console.log(this.document);
    this.openSnackBar1();
    this.documentService.postDocument(this.document);
    this.router.navigate(['/Home']);
  }

  payment(){
   this.razorpayResponse(this.checkOutProperty.rent);
   this.openSnackBar2();
  }

  razorpayResponse(total: number) {
    var options = {
      key: "rzp_test_Etn6dsJEZuhuup", 
      amount: total, 
      name: "Acme Corp", 
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id:  "", 
      handler: function (response: { razorpay_payment_id: any }) {
        alert(response.razorpay_payment_id);
    
      },
      prefill: {
        name: "Gaurav Kumar", 
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on(
      "payment.failed",
      function (response: {
        error: {
          code: any;
          description: any;
          source: any;
          step: any;
          reason: any;
          metadata: { order_id: any; payment_id: any };
        };
      }) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      }
    );
    try {
      rzp1.open();
    } catch (err) {
      console.log(err);
    }
  }

  openSnackBar1() {
    this._snackbar.open("Document Submitted...!", "X",{
      duration : 2000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
  openSnackBar2() {
    this._snackbar.open("Payment Sucessful ..!", "X",{
      duration : 2000,
      horizontalPosition: "end",
      verticalPosition: "top",
    });
  }
}

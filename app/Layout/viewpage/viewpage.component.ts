import { Component } from '@angular/core';
import { GetProperty, Property, Reviews } from '../../Shared/Models/ILogin';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyServiceService } from '../../Shared/services/property-service.service';
import { ReviewsService } from '../../Shared/services/reviews.service';
import { UserInfoService } from '../../Shared/services/user-info.service';

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent {
  isLoading : boolean = true;
  role : boolean = false;
  id : string = "";
  idx : number = 0;
  isImage : boolean = true;
  reviewAvailable : boolean = false;
  data: Property = {
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
  rating : number = 0;
  icon : Array<number> = [0,1,2,3,4]; 
  updatedReviewString : string = "";
  reviewData : Reviews = {
    id: '',
    propertyId: '',
    review: [],
    rating: [],
    userName: []
  }

  greaterThan(idx : number){
    if(idx>=this.idx){
        return true;
    }   
    this.idx++;
    return false;
  }

  getReview(){
    this.review.getAllReviews(this.id).subscribe({
      next : (data) => {
        this.isLoading = false;
        if(data != null){
          this.reviewData = data;
          this.reviewAvailable = true;
        }
        else{
          this.reviewAvailable = false;
        }
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  goToEdit(id : string){
    this.router.navigate(['/Home/EditPorperty/',id]);
  }

  paymentGateway(){
    this.router.navigate(['/Home/CheckOut/',this.data.id]);
  }


  constructor(private router : Router, private user : UserInfoService,private route : ActivatedRoute , private review : ReviewsService , private _property : PropertyServiceService){}
 ngOnInit(){
  const userRole = sessionStorage.getItem("Role");
  if(userRole == "Landlord"){
    this.role = true;
  }
  this.route.paramMap.subscribe(params => {
    this.id = params.get('id')!;
  });
  this._property.getProperty(this.id).subscribe((data)=>{
    this.data = data[0];
   if( this.data.images.length===1){
      this.isImage= false;
  } 
   this.getReview();
  })
 }

 goTOMap(){
  this.router.navigate(['/Home/Map/',this.data.id]);
 }


 updateStar(idx : number){
  console.log(idx);
  this.idx = idx;
 }

 valueUpdate(event : any){
  this.updatedReviewString = event.target.value;
 }
 updateReview(){
  alert("Review Added");
  this.reviewData.propertyId = this.data.id;
    this.reviewData.rating.push(this.idx);
    this.reviewData.review.push(this.updatedReviewString);
    this.user.getUserName(sessionStorage.getItem("userId")!).subscribe((data : any)=>{
      console.log(data);
      this.reviewData.userName.push(data.userName);
      (document.getElementById('review') as HTMLInputElement).value = "";
      this.review.updateReview(this.reviewData).subscribe((data) =>{
        this.getReview();
      });
    });
    console.log(this.reviewData);
 }

 goToAppoint(){
  sessionStorage.setItem('landLordId',this.data.landLordId);
  this.router.navigate(['/Home/Message']);
 }
}

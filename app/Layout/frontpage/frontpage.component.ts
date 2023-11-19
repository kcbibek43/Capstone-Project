import { Component, OnInit } from '@angular/core';
import { GetProperty, Property } from '../../Shared/Models/ILogin';
import { Router } from '@angular/router';
import { PropertyServiceService } from '../../Shared/services/property-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  isLandlord : boolean = false
  data : Array<Property> = [];
  isImage : boolean = true;
  noProperty : boolean = false;
  originalData : Array<Property> = [];
constructor(private route :Router,private property : PropertyServiceService){}
  isLoading : boolean = true;
  ngOnInit(): void {
    const role = sessionStorage.getItem("Role");
    if(role==="Landlord"){
      this.isLandlord = true;
      this.property.getProperty(sessionStorage.getItem("userId")!).subscribe(
        (ele) => {
        
          if(ele.length!==0){
            this.data = ele;
            this.originalData = ele;
            if(this.data[0].images.length===1){
              this.isImage = false;
            }
          }
          else{
            this.noProperty = true;
          }
          this.isLoading = false;
        }
      );  
    }
    else{
       this.property.getAllProperty().subscribe(
      (ele) => {
        console.log(ele);
        this.data = ele;
        this.originalData = ele;
        this.isLoading = false;
      }
    );  
    }
  }

  filterProperty(event : any , idx : number){
    if(event.target.value==="0"){
      this.data = this.originalData;
    }
    else if(event.target.value==="1"){
      if(idx===1){
        this.data = this.originalData.filter(element => element.rent > 1000000 && element.rent<5000000);
      }
      else{
        this.data = this.originalData.filter(element => element.numOfRooms===1);
      }
    }
    else if(event.target.value==="2"){
      if(idx===1){
        this.data = this.originalData.filter(element => element.rent > 5000000 && element.rent<8000000);
      }
      else{
        this.data = this.originalData.filter(element => element.numOfRooms===2);
      }
    }
    else if(event.target.value==="3"){
      if(idx===1){
        this.data = this.originalData.filter(element => element.rent > 8000000 && element.rent < 12000000);
      }
      else{
        this.data = this.originalData.filter(element => element.numOfRooms===3);
      }
    }
    else if(event.target.value==="4"){
      if(idx===1){
        this.data = this.originalData.filter(element => element.rent > 12000000 && element.rent<15000000);
      }
      else{
        this.data = this.originalData.filter(element => element.numOfRooms===4);
      }
    }
    else if(event.target.value==="5"){
      if(idx===1){
        this.data = this.originalData.filter(element => element.rent > 15000000 && element.rent<18000000);
      }
      else{
        this.data = this.originalData.filter(element => element.numOfRooms===5);
      }
    }
  }

  searchProperty(event : any , idx : number){
    const filter = event.target.value;
    if(idx === 1 ){
      this.data = this.originalData.filter(element => element.location.toLowerCase().includes(filter.toLowerCase()));
    }
    else{
      this.data = this.originalData.filter(element => element.type.toLowerCase().includes(filter.toLowerCase()) || element.location.toLowerCase().includes(filter.toLowerCase()) || element.description.toLowerCase().includes(filter.toLowerCase()) || element.rent === parseInt(filter));
    }

    if(filter === ""){
      this.data = this.originalData;
    }
  }

 viewProperty(id : string){
  this.route.navigate(['Home/view/',id]);
 }

}

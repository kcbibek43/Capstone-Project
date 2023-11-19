import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetProperty, Property } from '../../Shared/Models/ILogin';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyServiceService } from '../../Shared/services/property-service.service';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})
export class AddpropertyComponent implements OnInit {
  id : string = "";
  propertyForm! : FormGroup;
  images : string [] = ["","","",""];
  property : Property = {
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

  constructor(private router: Router,private _property : PropertyServiceService, private fb : FormBuilder,private route : ActivatedRoute){}
  ngOnInit(){
   if(this.router.url.includes("AddProduct")){
    this.propertyForm = this.fb.group({
      "Location" : [this.property.location,Validators.required],
      "Rent" : [this.property.rent,Validators.required],
      "Type" : [this.property.type,Validators.required],
      "Description" : [this.property.description,Validators.required],
      "AvailableFrom" : [this.property.availableFrom,Validators.required],
      "NumOfRooms" : [this.property.numOfRooms,Validators.required],
      "Ameneties" : [this.property.ameneties,Validators.required]
    })
   }
   else{
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
      this._property.getProperty(this.id).subscribe((data)=>{
        this.property = data[0];
        console.log(this.property.type);
          this.propertyForm = this.fb.group({
          "Location" : [this.property.location,Validators.required],
          "Rent" : [this.property.rent,Validators.required],
          "Type" : [this.property.type,Validators.required],
          "Description" : [this.property.description,Validators.required],
          "AvailableFrom" : [this.property.availableFrom,Validators.required],
          "NumOfRooms" : [this.property.numOfRooms,Validators.required],
          "Ameneties" : [this.property.ameneties,Validators.required]
        })
      })
   }
  }

  submitProperty(){
    this.images[0] = this.sellersPermitString;
    this.images[1] = this.DriversLicenseString;
    this.images[2] = this.InteriorPicString;
    this.images[3] = this.ExteriorPicString;
    console.log(this.images);
    this.property.images = this.images;
    const Ameneties = this.propertyForm.value.Ameneties.split(",");
    this.property.ameneties = Ameneties;
    this.property.location = this.propertyForm.value.Location;
    this.property.rent = this.propertyForm.value.Rent;
    this.property.type = this.propertyForm.value.Type;
    this.property.description = this.propertyForm.value.Description;
    this.property.availableFrom = this.propertyForm.value.AvailableFrom;
    this.property.numOfRooms = this.propertyForm.value.NumOfRooms;
    this.property.isAvailable = true;
    this.property.landLordId = sessionStorage.getItem("userId")!;
    this._property.addProperty(this.property);
    this.router.navigate(['/Home']);
  }


  imageSrc : any;
  sellersPermitFile: any;
  DriversLicenseFile: any;
  InteriorPicFile: any;
  ExteriorPicFile: any;
  //base64s
  sellersPermitString: string = "";
  DriversLicenseString: string = "";
  InteriorPicString: string = "";
  ExteriorPicString: string = "";
  //json

  currentId: number = 0;

  public picked(event : any, field : any) {
    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (field == 1) {
        this.sellersPermitFile = file;
        this.handleInputChange(file); 
      }
      else if (field == 2) {
        this.DriversLicenseFile = file;
        this.handleInputChange(file); 
      }
      else if (field == 3) {
        this.InteriorPicFile = file;
        this.handleInputChange(file); 
      }
      else if (field == 4) {
        this.ExteriorPicFile = file;
        this.handleInputChange(file);
      }
    }
  }


  handleInputChange(files : any) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e : any) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    let id = this.currentId;
    switch (id) {
      case 1:
        this.sellersPermitString = base64result;
        break;
      case 2:
        this.DriversLicenseString = base64result;
        break;
      case 3:
        this.InteriorPicString = base64result;
        break;
      case 4:
        this.ExteriorPicString = base64result;
        break
    }
  }

}

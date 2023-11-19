import { OnInit, Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as L from 'leaflet';

import { environment } from '../../../environments/environment';
import { PropertyServiceService } from '../../Shared/services/property-service.service';
import {  GetProperty, LocationStore, MapResponse, Property } from '../../Shared/Models/ILogin';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  implements OnInit {
  id : string = "";
  idx : string = "";
  location : LocationStore = {
    id: '',
    propertyId: '',
    longitude: 0,
    latitude: 0
  }
  mapDetails : Array<any> = [];
  map: any;
  isLoading : boolean = false;

  constructor(private router : Router,private property : PropertyServiceService,private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    this.property.getProperty(this.id).subscribe((data : Array<Property>)=>{
      console.log(data[0].location);
      this.idx = data[0].id;
        this.property.getMapDetails(data[0].location).subscribe((ele:MapResponse)=>{
          console.log(ele);
          this.location = {
            id : "",
            propertyId: data[0].id,
            longitude: ele.features[0].properties.lon,
            latitude:  ele.features[0].properties.lat
          }
          this.isLoading  = false;
          this.loadMap();
        },
        (err) =>{
          console.log(err);
        }
        )
    })
  }

  private loadMap(): void {
    this.map = L.map("map").setView([51.505, -0.09], 13)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapbox.accessToken,
    }).addTo(this.map);

    this.map.flyTo([this.location.latitude, this.location.longitude], 13);

    const icon = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
      popupAnchor: [13, 0],
    });
    console.log(this.location);
    const marker = L.marker([this.location.latitude, this.location.longitude], { icon }).bindPopup('Angular Leaflet');
    marker.addTo(this.map);
  } 

  goToProperty(){
    this.router.navigate(['/Home/view/',this.idx])
  }

}

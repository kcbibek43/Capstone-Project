import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetProperty, LocationStore, MapResponse, Property, } from '../Models/ILogin';
import { locationUrl, mapUrlEnd, mapUrlStart, propertyUrl } from '../../constants/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {
  private httpClient : HttpClient;
  constructor(private http : HttpClient , private httpBack : HttpBackend) { 
    this.httpClient = new HttpClient(httpBack);
  }

  getAllProperty(): Observable<Array<Property>>{
      return this.http.get<Array<Property>>(propertyUrl);
  }

  getProperty(id : string) : Observable<Array<Property>>{
    return this.http.get<Array<Property>>(propertyUrl + "/" + id)
  }

  getPropertyByLandlord(lid : string) : Observable<Array<Property>>{
    return this.http.patch<Array<Property>>(propertyUrl + "/" + "654f793b963d2402694ba6b2",lid);
  }
  
  getMapDetails(location : string) : Observable<MapResponse>{
    return this.httpClient.get<MapResponse>(mapUrlStart + location + mapUrlEnd);
  }

  addProperty(property : Property){
    return this.http.post(propertyUrl,property).subscribe();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reviews } from '../Models/ILogin';
import { reviewUrl } from '../../constants/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  allReviews : Array<Reviews> = [];
  constructor(private http : HttpClient) {}

  getAllReviews(id : string) : Observable<Reviews>{
   return this.http.get <Reviews>(reviewUrl + "/" + id);
  }

  updateReview(user : Reviews){
    return this.http.put(reviewUrl,user);
  }
}

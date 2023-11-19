import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentUrl } from '../Models/ILogin';
import { documentUrl } from '../../constants/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http : HttpClient) { }
  
  postDocument(doc : DocumentUrl ){
    this.http.post(documentUrl,doc).subscribe();
  }

  getDocument(id : string) : Observable<Array<DocumentUrl>>{
   return this.http.get<Array<DocumentUrl>>(documentUrl+'/'+id);
  }

  updateDocument(doc : DocumentUrl){
    this.http.put(documentUrl,doc).subscribe();
  }
}

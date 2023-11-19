import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DocumentUrl } from '../../Shared/Models/ILogin';
import { DocumentService } from '../../Shared/services/document.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../Shared/services/user-info.service';
@Component({
  selector: 'app-viewdocs',
  templateUrl: './viewdocs.component.html',
  styleUrls: ['./viewdocs.component.css']
})
export class ViewdocsComponent {
  documents : Array<DocumentUrl> = [];
  selectedPath : any ;
  docAvailable : boolean = true;
  selectedFile : any ;
  isAvailable : boolean = false;
  userName : string[] = [];
  isFile = false;
  constructor(private user : UserInfoService ,private route: Router ,private docs : DocumentService ,config: NgbModalConfig,private model : NgbModal){
    config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    this.docs.getDocument(sessionStorage.getItem("userId")!).subscribe((data)=>{
      if(data.length===0){
          this.docAvailable = false;
      }
      else{
        this.documents = data;  
        this.getUserName();
      }
      this.isAvailable = true;
    },
    (err)=>{
      console.log(err);
    });
  }

  
  @ViewChild('content') popUpView = ElementRef;

  viewDocs(idx : number){
    this.selectedFile = this.documents[idx].doc1;
    this.printPdf(this.selectedFile);
    this.model.open(this.popUpView,{size : 'lg'});
  }


  verify(idx : number){
    this.documents[idx].isVerified = true;
    this.docs.updateDocument(this.documents[idx]); 
    const button = document.getElementById("verified " + idx) as HTMLButtonElement;
    button.innerHTML = "Verified";
  }


  printPdf(select : string) {
    const byteArray = new Uint8Array(
      atob(select)
        .split("")
        .map(char => char.charCodeAt(0))
    );
    const file = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    this.selectedFile = fileURL;
  }

  goToProperty(idx : number){
      this.route.navigate([ '/Home/view/',this.documents[idx].propertyId]);
  }
  getUserName(){
    let name = "";
    this.documents.forEach(element => {
      this.user.getUserName(element.tenantId).subscribe((data:any)=>{
        name = data.userName;
        this.userName.push(name)
      })
    });
 

  }
}

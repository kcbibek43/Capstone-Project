import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLandlord : boolean = false;

  ngOnInit(){
    const role = sessionStorage.getItem("Role");
    if(role === "Landlord"){
      this.isLandlord = true;
    }
  }
}

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Layout/home/home.component';
import { LoginpageComponent } from './Layout/loginpage/loginpage.component';
import { ViewpageComponent } from './Layout/viewpage/viewpage.component';
import { FrontpageComponent } from './Layout/frontpage/frontpage.component';
import { EditProfileComponent } from './Functions/edit-profile/edit-profile.component';
import { MessagesComponent } from './Functions/messages/messages.component';
import { MessagelistComponent } from './Functions/messagelist/messagelist.component';
import { CheckoutComponent } from './Functions/checkout/checkout.component';
import { AddpropertyComponent } from './Functions/addproperty/addproperty.component';
import { MapComponent } from './Functions/map/map.component';
import { ViewdocsComponent } from './Functions/viewdocs/viewdocs.component';
import { PagenotfoundComponent } from './Shared/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    component: LoginpageComponent,
  },
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FrontpageComponent,
      },
      {
        path: 'view/:id',
        component: ViewpageComponent,
      },
      {
        path: 'edit',
        component: EditProfileComponent,
      },
      {
        path: 'create',
        component: EditProfileComponent,
      },
      {
        path: 'Message',
        component: MessagesComponent,
      },
      {
        path: 'MessageList',
        component: MessagelistComponent,
      },
      {
        path: 'CheckOut/:id',
        component: CheckoutComponent,
      },{
        path : 'AddProduct',
        component : AddpropertyComponent
      },{
        path : 'EditPorperty/:id',
        component : AddpropertyComponent
      },{
        path : 'Map/:id',
        component : MapComponent
      },{
        path : 'ViewDocs',
        component : ViewdocsComponent
      }
    ],
  },
  {
    path: 'view/:id',
    component: ViewpageComponent,
  },
  {
    path : "**",
    component : PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

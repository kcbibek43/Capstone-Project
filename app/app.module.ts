import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './Layout/login/login.component';
import { HomeComponent } from './Layout/home/home.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginpageComponent } from './Layout/loginpage/loginpage.component';
import { FrontpageComponent } from './Layout/frontpage/frontpage.component';
import { ViewpageComponent } from './Layout/viewpage/viewpage.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { MaterialModule } from './Shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditProfileComponent } from './Functions/edit-profile/edit-profile.component';
import { MessagesComponent } from './Functions/messages/messages.component';
import { MessagelistComponent } from './Functions/messagelist/messagelist.component';
import { CheckoutComponent } from './Functions/checkout/checkout.component';
import { AddpropertyComponent } from './Functions/addproperty/addproperty.component';
import { MapComponent } from './Functions/map/map.component';
import { ViewdocsComponent } from './Functions/viewdocs/viewdocs.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ExamplePdfViewerComponent } from './Functions/example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PagenotfoundComponent } from './Shared/pagenotfound/pagenotfound.component';
import { TokenInterceptor } from './Shared/services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    LoginpageComponent,
    FrontpageComponent,
    ViewpageComponent,
    FooterComponent,
    EditProfileComponent,
    MessagesComponent,
    MessagelistComponent,
    CheckoutComponent,
    AddpropertyComponent,
    MapComponent,
    ViewdocsComponent,
    ExamplePdfViewerComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true 
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

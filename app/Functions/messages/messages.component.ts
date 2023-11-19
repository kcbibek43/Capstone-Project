import { Component , OnInit } from '@angular/core';
import { AppointmentService } from '../../Shared/services/appointment.service';
import { Appointment, Message, Messages } from '../../Shared/Models/ILogin';
import { MessageService } from '../../Shared/services/message.service';
import { UserInfoService } from '../../Shared/services/user-info.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
    data : Messages= {
        id: '',
        tenantId: '',
        landLordId: '',
        messages: []
    };
    message : string = "";
    sender : string = "";
    reciever : string = "";
    booked : boolean = true;
    appointmentAvailable : boolean = false;
    scheduleAppoint : Appointment = {
        id: '',
        landLordId: '',
        tenantId: ''
    };
    startDate : Date | undefined ;
    endDate : Date | undefined;
    info : Array<Message> = [];
    sendMessageSender : Message = {
        from: '',
        message: ''
    };
    appointments : Array<Appointment> = [];
  constructor(private user : UserInfoService ,private messageService : MessageService ,private appointmentService : AppointmentService){}
  ngOnInit(){
     this.appointmentService.getAllAppointments().subscribe({
        next : ((data : Array<Appointment>)=>{
            data.forEach(element =>{
                if(element.tenantId === sessionStorage.getItem("userId")!){
                    this.appointments.push(element);
                }
            })
        }),
        error : ((err)=>{
            console.log(err);
        })
     })
    this.getMessages();
    this.getUserName();
  }

  getMessages (){
    this.messageService.getAllMessageByTenant(this.getId()).subscribe((data)=>{
        console.log(data);
        if(data!=null){
          data.forEach(element => {
            if(element.landLordId == sessionStorage.getItem("landLordId")! && element.tenantId === this.getId()){
                this.data = element;
            }
            this.info =   this.data!.messages.sort((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime())
        });
        }
     })
  }
  getUserName(){
    this.user.getUserName(sessionStorage.getItem("userId")!).subscribe((data : any)=>{
        this.sender = data.userName;
        sessionStorage.setItem("userName",data.userName);
      });
      this.user.getUserName(sessionStorage.getItem("landLordId")!).subscribe((data : any)=>{
        this.reciever = data.userName;
      });  
  }
  getId() : string{
    return sessionStorage.getItem("userId")!;
  }
  setMeeting(){
    this.scheduleAppoint.tenantId = sessionStorage.getItem("userId")!;
    this.scheduleAppoint!.from = this.startDate!;
    this.scheduleAppoint!.to = this.endDate!;
    this.scheduleAppoint.landLordId = sessionStorage.getItem("landLordId")!;
    this.appointments.forEach(element => {
        if(element.tenantId===sessionStorage.getItem("userId") ){
           if((element.from! < this.startDate! && element.to! < this.endDate!) || (element.from! > this.startDate! && element.to! > this.endDate!)){
            this.booked = true;
            this.appointmentAvailable = true;
        }
        else{
            this.appointmentAvailable = false;
            this.booked = false;
        }       
        }
    });
    if(this.booked){
       this.appointmentService.setAppointment(this.scheduleAppoint);
    }
  }

  endDateAppoint(event : any){
    this.endDate = event.target.value;
    console.log(this.endDate);
  }
  startDateAppoint(event : any){
    this.startDate = event.target.value;
    console.log(this.startDate);
  }  

  messageRes(event : any){
    this.message = event.target.value;
  }

  sendMessage(){
    this.sendMessageSender.message = this.message;
    this.sendMessageSender.from = sessionStorage.getItem("userName")!;
    this.sendMessageSender.date =new Date();
    if(this.data!.id===""){
        this.data!.id = "";
        this.data!.landLordId = sessionStorage.getItem("landLordId")!;
        this.data!.tenantId = sessionStorage.getItem("userId")!;
        this.data?.messages.push(this.sendMessageSender);
        this.messageService.setMessage(this.data!);
    }
    else{
        this.data?.messages.push(this.sendMessageSender);
        this.messageService.setMessage(this.data!);
    }
    const ele = (document.getElementById("message") as HTMLInputElement);
    ele.value = "";
    this.getMessages();
  }
}

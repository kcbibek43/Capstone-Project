import { Component } from '@angular/core';
import { Messages } from '../../Shared/Models/ILogin';
import { MessageService } from '../../Shared/services/message.service';
import { UserInfoService } from '../../Shared/services/user-info.service';

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.css']
})
export class MessagelistComponent {
    idx : number = 0;
    data : Array<Messages> = [];
  info : any;
  noConvo : boolean = false;
  sender : string = "";
  reciever : string = "";
 recieverTenants : string[] = [];
  constructor(private userService : UserInfoService,private messageService : MessageService){}
  ngOnInit(){
    this.idx = 0;
    this.messageService.getAllMessage().subscribe((data)=>{
        data.forEach(element => {
            if(element.landLordId === sessionStorage.getItem("userId")){
                this.data.push(element);
                this.getUserName(element.tenantId);
            }
        });
        if(this.data.length===0){
            this.noConvo= true;
        }
    })
  }
  
  updateMessage(idx : number){

  }

  sortInfo(data : any){
    this.info =   data.messages.sort((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    console.log(this.info);
  }

  userChanged(idx : number){
    this.idx = idx;
  }

  getUserName(tenantId : string){
    this.userService.getUserName(tenantId).subscribe((data : any)=>{
        this.recieverTenants.push(data.userName);
    })
  }
}

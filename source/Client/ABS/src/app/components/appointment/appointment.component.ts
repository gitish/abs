import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import * as _ from "lodash";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  users;
  reports;
  userName;
  showRepors
  constructor( private validateService: ValidateService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.users = [{ id: 1, name: 'shail' }, { id: 2, name: 'shail2' }, { id: 3, name: 'shail3' }];
    this.userName = this.users[0].name;
    this.index(1)
  }
  
  index(id):void{
    this.authService.getReport(id).subscribe(data => {
      if (data.success) {
        this.reports = data.data
      }
    });
  }

  showReports(name){
    var _thisObj = this
    var id ;
    for (var i = 0; i < this.users.length; i++) { 
      if(_thisObj.users[i].name ===name){
        id = _thisObj.users[i].id;
      }
    }
    this.index(id);
  }
    

}

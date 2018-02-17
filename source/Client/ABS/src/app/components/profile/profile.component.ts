import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;
  name: string;
  dob: Date;
  gender: string;
  userList;
  constructor(private authService:AuthService, private router:Router) { }
  myFunction(id) {
    console.log(id);
    const x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
    } else {
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className =
        x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
  }
  createProfile(){
    var createProfile = {
      name: this.name,
      dob: this.dob,
      gender: this.gender,
      userId: Number(new Date()),
      email: JSON.parse(localStorage.getItem('user')).email,
      mobile: JSON.parse(localStorage.getItem('user')).mobile+','+ this.dob,
    }
    this.authService.createProfile(createProfile).subscribe(data => {
      if (data.success) {
        alert("profile created");
        this.userList.push(createProfile);
      } else {
        console.log("unable to create profile");
      }
    });
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.authService.getChildUser({email:JSON.parse(localStorage.getItem('user')).email}).subscribe(users => {
        this.userList = _.reject(users,{mobile:JSON.parse(localStorage.getItem('user')).mobile});
       },
        err => {
          console.log(err);
          return false;
        });
    },
     err => {
       console.log(err);
       return false;
     });
  }
}

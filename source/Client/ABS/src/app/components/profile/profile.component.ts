import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:Object;

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
  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user);
    },
     err => {
       console.log(err);
       return false;
     });
  }
}

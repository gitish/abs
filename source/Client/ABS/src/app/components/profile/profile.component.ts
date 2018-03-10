import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name: String;
  mobile: Number;
  dob: Date;
  gender: String;
  email: String;
  Address: String;
  Pin: Number;
  Image: String;
  user: Object;
  selectedValue: String = '';
  showSelected: boolean;
  users;
  reports;
  reportFound;
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
    this.showSelected = false;
  }

  genderArray = [
    { view: 'Male', value: '0' },
    { view: 'Female', value: '1' }
  ];
  onProfileSubmit() {

    const Profile = {
      patientid: Number(new Date()),
      patientname: this.name,
      email: this.email ? this.email : null,
      mobile: this.mobile,
      dob: null, // this.dob ? this.dob : null,
      gender: this.selectedValue ? this.selectedValue : 'male',
      address: this.Address ? this.Address : null,
      pin: this.Pin ? this.Pin : null,
      image: this.Image ? this.Image : null,
      dateofupdate: new Date(),
      fkRegistrationid: Number(12245545486) // this.user.userId ? this.user.userId :
    };

    // validate profile field
    if (!this.validateService.validateProfile(Profile)) {
      console.log(Profile);
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    console.log(Profile);
    // create New Patient
    this.authService.createnewProfile(Profile).subscribe(data => {
      if (data.success) {
        console.log('Profile registered:- ' + data.success);
        this.flashMessage.show('You are now registered profile.', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/profile']);
        //this.router.navigateByUrl('/dashboard');
      } else {
        console.log('Error meassage :- ' + data.success);
        this.flashMessage.show('Something went wrong:- ', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/profile']);
        //this.router.navigateByUrl('/profile');
      }
    });
  }
  myFunction(id) {
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
  addProfileUser() {
    this.showSelected = true;
  }
}

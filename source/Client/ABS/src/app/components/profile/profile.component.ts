import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
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
  files: Object;
  fileToUpload: File = null;
  formData: FormData;
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
    this.showSelected = false;
  }

  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3061/uploadimage'});
  genderArray = [
    { view: 'male', value: '0' },
    { view: 'female', value: '1' }
  ];
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
  onChange(event) {
    console.log('onChange');
    this.files = event.srcElement.files;
    const data = {};
    // if sending with in file object then it should be req.files.file
    data['filename'] = event.srcElement.files;
    this.files = data['filename'];
    console.log(this.files);
    console.log(this.files[0].name);
    // this.service.makeFileRequest('http://localhost:8182/upload', [], files).subscribe(() => {
    //   console.log('sent');
    // });
  }
  onProfileSubmit() {

    this.formData = new FormData();
    // this.formData.append('fileKey', this.fileToUpload);
    this.formData.set('fileKey', this.fileToUpload);
    const Profile = {
      patientid: Number(new Date()),
      patientname: this.name,
      email: this.email ? this.email : null,
      mobile: this.mobile,
      dob: this.dob ? this.dob : null,
      gender: this.selectedValue ? this.selectedValue : 'male',
      address: this.Address ? this.Address : null,
      pin: this.Pin ? this.Pin : null,
      image: this.formData ? this.formData : null,
      dateofupdate: new Date(),
      fkRegistrationid: Number(1520059986631) // this.user.userId ? this.user.userId :
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

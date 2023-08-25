import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { UserApiService } from 'src/app/master/user/userApi.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private apiservice: UserApiService) {}

  selectedIndex = 0;

  tableHeaderData: any;

  updatebtnActivate: boolean = false;

  readUser: any;
  getEditId: any;

  errMsg: any;
  successMsg: any;
  DelSuccessMsg: any;

  userForm = new FormGroup({
    EMP_ID: new FormControl('', [Validators.required]),
    EMP_NAME: new FormControl('', [Validators.required]),
    DOMAIN_NAME: new FormControl('', [Validators.required]),
    EMAIL_ID: new FormControl('', [Validators.required]),
    SITE: new FormControl('', [Validators.required]),
    PLANT: new FormControl('', [Validators.required]),
    MOC_ROLE: new FormControl('', [Validators.required]),
    ACTIVE: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.tableHeaderData = ['ID', 'Domain Name', 'Email', 'Role'];

    this.getAllData();
  }

  deleteID(id: any) {
    this.apiservice.deleteData(id).subscribe((res) => {
      this.getAllData();
      this.DelSuccessMsg = res.message;
    });
  }

  editBtn(id: any, data: any) {
    this.selectedIndex = 1;
    this.updatebtnActivate = true;

    this.apiservice.getSingleData(id).subscribe((res) => {
      console.log(res, 'single data selected for update');
      this.userForm.patchValue({
        EMP_ID: res.data[0].EMP_ID,
        EMP_NAME: res.data[0].EMP_NAME,
        DOMAIN_NAME: res.data[0].DOMAIN_NAME,
        EMAIL_ID: res.data[0].EMAIL_ID,
        SITE: res.data[0].SITE,
        PLANT: res.data[0].PLANT,
        MOC_ROLE: res.data[0].MOC_ROLE,
        ACTIVE: res.data[0].ACTIVE,
      });
    });

    this.getEditId = id;
  }

  //to load instance without refreshing our page
  getAllData() {
    this.apiservice.getAlldata().subscribe((res) => {
      this.readUser = res.data;
    });
  }

  //Create New User and submit Form
  submitForm() {
    if (this.userForm.valid) {
      this.apiservice.createData(this.userForm.value).subscribe((res) => {
        console.log(res);
        this.userForm.reset();
        this.getAllData();
        this.successMsg = res.message;
      });
    } else {
      this.errMsg = 'All Fields are required';
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      this.apiservice
        .updateData(this.getEditId, this.userForm.value)
        .subscribe((res) => {
          console.log(res, 'Data Updated successfully');
          this.userForm.reset();
          this.updatebtnActivate = false;
          this.getAllData();
          this.successMsg = res.message;
        });
    } else {
      this.errMsg = 'All Fields are required';
    }
  }

  //clear button
  clear() {
    this.userForm.reset();
  }

  //tab change
  tabClick(tab: any) {
    if (this.selectedIndex == 0) {
      this.updatebtnActivate = false;
      this.userForm.reset();
      this.getAllData();
    }
    // console.log(tab);
  }
}

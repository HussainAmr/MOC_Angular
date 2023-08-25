import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleApiService } from 'src/app/master/roles/roleApi.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  constructor(private apiservice: RoleApiService) {}

  selectedIndex = 0;

  tableHeaderData: any;

  updatebtnActivate: boolean = false;

  readRole: any;
  getEditId: any;

  errMsg: any;
  successMsg: any;
  DelSuccessMsg: any;

  roleForm = new FormGroup({
    ROLE_CODE: new FormControl('', [Validators.required]),
    ROLE_NAME: new FormControl('', [Validators.required]),
    DESCRIPTION: new FormControl(''),
    ACTIVE: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.tableHeaderData = ['ID', 'Role Code', 'Role Name'];

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
      this.roleForm.patchValue({
        ROLE_CODE: res.data[0].ROLE_CODE,
        ROLE_NAME: res.data[0].ROLE_NAME,
        DESCRIPTION: res.data[0].DESCRIPTION,
        ACTIVE: res.data[0].ACTIVE,
      });
    });

    this.getEditId = id;
  }

  //to load instance without refreshing our page
  getAllData() {
    this.apiservice.getAlldata().subscribe((res) => {
      this.readRole = res.data;
    });
  }

  //Create New User and submit Form
  submitForm() {
    if (this.roleForm.valid) {
      this.apiservice.createData(this.roleForm.value).subscribe((res) => {
        console.log(res);
        this.roleForm.reset();
        this.getAllData();
        this.successMsg = res.message;
      });
    } else {
      this.errMsg = 'All Fields are required';
    }
  }

  updateUser() {
    if (this.roleForm.valid) {
      this.apiservice
        .updateData(this.getEditId, this.roleForm.value)
        .subscribe((res) => {
          console.log(res, 'Data Updated successfully');
          this.roleForm.reset();
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
    this.roleForm.reset();
  }

  //tab change
  tabClick(tab: any) {
    if (this.selectedIndex == 0) {
      this.updatebtnActivate = false;
      this.roleForm.reset();
      this.getAllData();
    }

    // console.log(tab);
  }
}

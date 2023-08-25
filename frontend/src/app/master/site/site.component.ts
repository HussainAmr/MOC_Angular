import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SiteApiService } from 'src/app/master/site/siteApi.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
})
export class SiteComponent implements OnInit {
  constructor(private apiservice: SiteApiService) {}

  selectedIndex = 0;

  tableHeaderData: any;

  updatebtnActivate: boolean = false;

  readSite: any;
  getEditId: any;

  errMsg: any;
  successMsg: any;
  DelSuccessMsg: any;

  siteForm = new FormGroup({
    SITE_CODE: new FormControl('', [Validators.required]),
    SITE_NAME: new FormControl('', [Validators.required]),
    SITE_DISPLAY_NAME: new FormControl('', [Validators.required]),
    ACTIVE: new FormControl('', [Validators.required]),
    DESCRIPTION: new FormControl(''),
    SEGMENT_CODE: new FormControl('', [Validators.required]),
    COMPANY_CODE: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.tableHeaderData = ['ID', 'Site Code', 'Site Name'];

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
      this.siteForm.patchValue({
        SITE_CODE: res.data[0].SITE_CODE,
        SITE_NAME: res.data[0].SITE_NAME,
        SITE_DISPLAY_NAME: res.data[0].SITE_DISPLAY_NAME,
        ACTIVE: res.data[0].ACTIVE,
        DESCRIPTION: res.data[0].DESCRIPTION,
        SEGMENT_CODE: res.data[0].SEGMENT_CODE,
        COMPANY_CODE: res.data[0].COMPANY_CODE,
      });
    });

    this.getEditId = id;
  }

  //to load instance without refreshing our page
  getAllData() {
    this.apiservice.getAlldata().subscribe((res) => {
      this.readSite = res.data;
    });
  }

  //Create New User and submit Form
  submitForm() {
    if (this.siteForm.valid) {
      this.apiservice.createData(this.siteForm.value).subscribe((res) => {
        console.log(res);
        this.siteForm.reset();
        this.getAllData();
        this.successMsg = res.message;
      });
    } else {
      this.errMsg = 'All Fields are required';
    }
  }

  updateUser() {
    if (this.siteForm.valid) {
      this.apiservice
        .updateData(this.getEditId, this.siteForm.value)
        .subscribe((res) => {
          console.log(res, 'Data Updated successfully');
          this.siteForm.reset();
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
    this.siteForm.reset();
  }

  //tab change
  tabClick(tab: any) {
    if (this.selectedIndex == 0) {
      this.updatebtnActivate = false;
      this.siteForm.reset();
      this.getAllData();
    }

    // console.log(tab);
  }
}

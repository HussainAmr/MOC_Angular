import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyApiService } from 'src/app/master/company/companyApi.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(private apiservice: CompanyApiService) {}

  selectedIndex = 0;

  tableHeaderData: any;

  updatebtnActivate: boolean = false;

  readCompany: any;
  getEditId: any;

  errMsg: any;
  successMsg: any;
  DelSuccessMsg: any;

  companyForm = new FormGroup({
    COMPANY_CODE: new FormControl('', [Validators.required]),
    COMPANY_NAME: new FormControl('', [Validators.required]),
    ADDRESS: new FormControl(''),
    PINCODE: new FormControl(''),
    ACTIVE: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.tableHeaderData = ['ID', 'Company Code', 'Company Name'];

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
      this.companyForm.patchValue({
        COMPANY_CODE: res.data[0].COMPANY_CODE,
        COMPANY_NAME: res.data[0].COMPANY_NAME,
        ADDRESS: res.data[0].ADDRESS,
        PINCODE: res.data[0].PINCODE,
        ACTIVE: res.data[0].ACTIVE,
      });
    });

    this.getEditId = id;
  }

  //to load instance without refreshing our page
  getAllData() {
    this.apiservice.getAlldata().subscribe((res) => {
      this.readCompany = res.data;
    });
  }

  //Create New User and submit Form
  submitForm() {
    if (this.companyForm.valid) {
      this.apiservice.createData(this.companyForm.value).subscribe((res) => {
        console.log(res);
        this.companyForm.reset();
        this.getAllData();
        this.successMsg = res.message;
      });
    } else {
      this.errMsg = 'All Fields are required';
    }
  }

  updateCompany() {
    if (this.companyForm.valid) {
      this.apiservice
        .updateData(this.getEditId, this.companyForm.value)
        .subscribe((res) => {
          console.log(res, 'Data Updated successfully');
          this.companyForm.reset();
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
    this.companyForm.reset();
  }

  //tab change
  tabClick(tab: any) {
    if (this.selectedIndex == 0) {
      this.updatebtnActivate = false;
      this.companyForm.reset();
      this.getAllData();
    }

    // console.log(tab);
  }
}

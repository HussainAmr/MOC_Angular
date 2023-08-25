import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantApiService } from 'src/app/master/plant/plantApi.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css'],
})
export class PlantComponent implements OnInit {
  constructor(private apiservice: PlantApiService) {}

  selectedIndex = 0;

  tableHeaderData: any;

  updatebtnActivate: boolean = false;

  readPlant: any;
  getEditId: any;

  errMsg: any;
  successMsg: any;
  DelSuccessMsg: any;

  plantForm = new FormGroup({
    PLANT_CODE: new FormControl('', [Validators.required]),
    PLANT_NAME: new FormControl('', [Validators.required]),
    PLANT_DISPLAY_NAME: new FormControl('', [Validators.required]),
    SITE_CODE: new FormControl('', [Validators.required]),
    DESCRIPTION: new FormControl(''),
    ACTIVE: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.tableHeaderData = ['ID', 'Plant Code', 'Plant Name', 'Site Code'];

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
      this.plantForm.patchValue({
        PLANT_CODE: res.data[0].PLANT_CODE,
        PLANT_NAME: res.data[0].PLANT_NAME,
        PLANT_DISPLAY_NAME: res.data[0].PLANT_DISPLAY_NAME,
        SITE_CODE: res.data[0].SITE_CODE,
        DESCRIPTION: res.data[0].DESCRIPTION,
        ACTIVE: res.data[0].ACTIVE,
      });
    });

    this.getEditId = id;
  }

  //to load instance without refreshing our page
  getAllData() {
    this.apiservice.getAlldata().subscribe((res) => {
      this.readPlant = res.data;
    });
  }

  //Create New User and submit Form
  submitForm() {
    if (this.plantForm.valid) {
      this.apiservice.createData(this.plantForm.value).subscribe((res) => {
        console.log(res);
        this.plantForm.reset();
        this.getAllData();
        this.successMsg = res.message;
      });
    } else {
      this.errMsg = 'All Fields are required';
    }
  }

  updateUser() {
    if (this.plantForm.valid) {
      this.apiservice
        .updateData(this.getEditId, this.plantForm.value)
        .subscribe((res) => {
          console.log(res, 'Data Updated successfully');
          this.plantForm.reset();
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
    this.plantForm.reset();
  }

  //tab change
  tabClick(tab: any) {
    if (this.selectedIndex == 0) {
      this.updatebtnActivate = false;
      this.plantForm.reset();
      this.getAllData();
    }

    // console.log(tab);
  }
}

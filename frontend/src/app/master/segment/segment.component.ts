import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SegmentApiService } from 'src/app/master/segment/segmentApi.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css'],
})
export class SegmentComponent implements OnInit {
  constructor(private apiservice: SegmentApiService) {}

  selectedIndex = 0;

  tableHeaderData: any;

  updatebtnActivate: boolean = false;

  readSegment: any;
  getEditId: any;

  errMsg: any;
  successMsg: any;
  DelSuccessMsg: any;

  segmentForm = new FormGroup({
    SEGMENT_CODE: new FormControl('', [Validators.required]),
    SEGMENT_NAME: new FormControl('', [Validators.required]),
    DESCRIPTION: new FormControl(''),
    ACTIVE: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.tableHeaderData = ['ID', 'Segment Code', 'Segment Name'];

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
      this.segmentForm.patchValue({
        SEGMENT_CODE: res.data[0].SEGMENT_CODE,
        SEGMENT_NAME: res.data[0].SEGMENT_NAME,
        DESCRIPTION: res.data[0].DESCRIPTION,
        ACTIVE: res.data[0].ACTIVE,
      });
    });

    this.getEditId = id;
  }

  //to load instance without refreshing our page
  getAllData() {
    this.apiservice.getAlldata().subscribe((res) => {
      this.readSegment = res.data;
    });
  }

  //Create New User and submit Form
  submitForm() {
    if (this.segmentForm.valid) {
      this.apiservice.createData(this.segmentForm.value).subscribe((res) => {
        console.log(res);
        this.segmentForm.reset();
        this.getAllData();
        this.successMsg = res.message;
      });
    } else {
      this.errMsg = 'All Fields are required';
    }
  }

  updateUser() {
    if (this.segmentForm.valid) {
      this.apiservice
        .updateData(this.getEditId, this.segmentForm.value)
        .subscribe((res) => {
          console.log(res, 'Data Updated successfully');
          this.segmentForm.reset();
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
    this.segmentForm.reset();
  }

  //tab change
  tabClick(tab: any) {
    if (this.selectedIndex == 0) {
      this.updatebtnActivate = false;
      this.segmentForm.reset();
      this.getAllData();
    }

    // console.log(tab);
  }
}

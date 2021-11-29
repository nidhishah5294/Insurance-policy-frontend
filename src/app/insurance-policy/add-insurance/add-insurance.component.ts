import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InsurancePolicyService } from 'src/app/services/insurance-policy.service';
import { InsurancePolicy } from '../insurance-policy';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent implements OnInit {
  form!: FormGroup;
  policyNumber!: string;
  insurancePolicy!: InsurancePolicy;
  submitted: boolean = false;
  isEdit: boolean = false;
  loading: boolean = false;
  addDetailLable: string = 'Add Insurance Policy Details';
  editDetailLable: string = 'Edit Insurance Policy Details'
  policyStartDateLable: string = 'Policy Start Date';
  policyEndDateLable: string = 'Policy End Date';
  policyDescriptionLable: string = 'Policy Description';
  customerFirstNameLable: string = 'Customer First Name';
  customerSurnameLable: string = 'Customer Surname';
  customerDateOfBirthLable: String = 'Customer Date Of Birth';
  startDateRequiredLable = 'Policy start date is required';
  endDateRequiredLable = 'Policy end date is required';
  descriptionRequiredLable = 'Policy Description is required';
  firstNameRequiredLable = 'Customer FirstName is required';
  surnameRequiredLable = 'Customer surname is required';
  dateOfBirthRequiredLable = 'Customer date of birth is required';
  dateCompareLAble = 'End date should be greater than Start date';
  dateError: any = { isGreater: false };
  storeDataVAlue: any = {};
  addSuccessMessage: string = 'Insurance policy added successfully.'
  editSuccessMessage: string = 'Insurance policy updated successfully.';
  startDate: any;
  endDate: any;
  customer_DOB: any;
  constructor(private formbuilder: FormBuilder,
    private insurancePolicyService: InsurancePolicyService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.createForm();
    this.getCurrentPolicyDetail();
  }
  createForm() {
    this.form = this.formbuilder.group({
      policyStartDate: ['', Validators.required],
      policyEndDate: ['', Validators.required],
      policyDescription: [''],
      customerFirstName: ['', Validators.required],
      customerSurname: ['', Validators.required],
      customerDateOfBirth: ['', Validators.required]
    }, {
      validator: [
        this.fromToDate('policyStartDate', 'policyEndDate', 'isGreater')]
    });
  }
  getCurrentPolicyDetail() {
    this.policyNumber = this.route.snapshot.params['id'];
    if (this.policyNumber) {
      this.isEdit = true;
      this.getCurentInsurancePolicyDetail();
    }

  }
  ngOnInit(): void {

  }
  getCurentInsurancePolicyDetail(): void {
    this.insurancePolicyService.getDetailById(this.policyNumber).subscribe({
      next: (res: any) => {
        this.getStoreDate(res);
      },
      error: (error) => {
        this.insurancePolicyService.showFailure(error);
      }
    })
  }
  get f() {
    return this.form.controls;
  }

  submitDetail() {
    this.submitted = true;
    if (this.f.invalid) {
      return;
    }
    this.loading = true;
  
    if (!this.isEdit && this.form.valid && !this.dateError['isGreater']) {
      this.setStoreDataValue();
      this.addInsurancePolicyDetail();
    }
    else if (this.isEdit && this.form.valid && !this.dateError['isGreater']) {
      this.setStoreDataValue();
      this.editInsurancePolicyDetail();
    }
    else {
      this.loading = false;
      return;
    }
  }
  getStoreDate(data: any) {
    this.startDate = data[0].policy_start_date;
    this.endDate = data[0].policy_end_date;
    this.customer_DOB = data[0].customer_date_of_birth;
    this.form.controls.policyStartDate.setValue(this.datePipe.transform(data[0].policy_start_date, 'MM/dd/yyyy'));
    this.form.controls.policyEndDate.setValue(this.datePipe.transform(data[0].policy_end_date, 'MM/dd/yyyy'));
    this.form.controls.policyDescription.setValue(data[0].policy_description);
    this.form.controls.customerFirstName.setValue(data[0].customer_first_name);
    this.form.controls.customerSurname.setValue(data[0].customer_surname);
    this.form.controls.customerDateOfBirth.setValue(this.datePipe.transform(data[0].customer_date_of_birth, 'MM/dd/yyyy'));
  }
  setStoreDataValue() {
    this.storeDataVAlue.policy_start_date = this.form.value.policyStartDate;
    this.storeDataVAlue.policy_end_date = this.datePipe.transform(this.form.value.policyEndDate, 'MM/dd/yyyy')
    this.storeDataVAlue.policy_description = this.form.value.policyDescription;
    this.storeDataVAlue.customer_first_name = this.form.value.customerFirstName;
    this.storeDataVAlue.customer_surname = this.form.value.customerSurname;
    this.storeDataVAlue.customer_date_of_birth = this.form.value.customerDateOfBirth;
    this.storeDataVAlue.policy_number = this.policyNumber;

  }
  addInsurancePolicyDetail() {
    this.insurancePolicyService.addDetail(this.storeDataVAlue).subscribe({
      next: () => {
        this.insurancePolicyService.showSuccess(this.addSuccessMessage);
        this.router.navigate(['/insurance-policy/view', { relativeTo: true }]);
        this.loading = false;
      },
      error: (res) => {
        if (res.status == 201) {
          this.insurancePolicyService.showSuccess(this.addSuccessMessage);
          this.router.navigate(['/insurance-policy/view', { relativeTo: true }]);
        } else {
          this.insurancePolicyService.showFailure(res.message);
        }
        this.loading = false;
      }
    })
  }
  editInsurancePolicyDetail() {
    this.insurancePolicyService.updateDetail(this.storeDataVAlue, this.policyNumber).subscribe({
      next: () => {
        this.insurancePolicyService.showSuccess(this.editSuccessMessage);
        this.router.navigate(['/insurance-policy/view', { relativeTo: true }]);
        this.loading = false;
      },
      error: (res) => {
        if (res.status == 200) {
          this.insurancePolicyService.showSuccess(this.editSuccessMessage);
          this.router.navigate(['/insurance-policy/view', { relativeTo: true }]);
        } else {
          this.insurancePolicyService.showFailure(res.message);
        }
        this.loading = false;
      }
    })
  }
  goToBack() {
    this.router.navigate(['/insurance-policy/view']);
  }
  fromToDate(fromDateField: any, toDateField: any, errorName: string): ValidatorFn {
    return (formGroup: any): { [key: string]: boolean } | null => {
      const fromDate = formGroup.get(fromDateField).value;
      const toDate = formGroup.get(toDateField).value;
      if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
        this.dateError = { [errorName]: true };
        return this.dateError;
      }
      this.dateError = { [errorName]: false };
      return null;
    };
  }
}

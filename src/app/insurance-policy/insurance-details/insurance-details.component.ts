import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsurancePolicy } from '../insurance-policy';
import { InsurancePolicyService } from '../../services/insurance-policy.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.scss']
})

export class InsuranceDetailsComponent implements OnInit {
  displayedColumns: string[] = ['Number', 'Start Date', 'End Date', 'Description', 'First Name', 'Surname', 'Date of Birth','Actions'];
  pageTitle: string = 'Insurance Policy Details';
  addDetailsLable = 'Add INSURANCE POLICY';
  editLable = 'Edit';
  deleteLable = 'delete';
  insurancePolicy: InsurancePolicy[] = [];
  loading: boolean = false;
  deleteSuccessMessage: string = 'Insurance policy deleted successfully.'

  // displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router, private insurancePolicyService: InsurancePolicyService) {
    this.getAllInsurancePolicyDetails();
  }
  ngOnInit() {
  }


  getAllInsurancePolicyDetails(): void {
    this.loading = true;
    this.insurancePolicyService.getAllDetails().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.dataSource = this.insurancePolicy = res;
      },
      error: (error) => {
        this.insurancePolicyService.showFailure(error);
      }
    })
  }
  addInsurancePolicy(): void {
    this.router.navigate(['insurance-policy/add']);
  }
  editInsurancePolicy(policyNumber: any): void {
    this.router.navigate(['insurance-policy/edit/', policyNumber])
  }
  deleteInsurancePolicy(policyNumber: any): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.insurancePolicyService.deleteDetail(policyNumber).subscribe({
        next: (res: any) => {
          this.insurancePolicyService.showSuccess(this.deleteSuccessMessage);
          this.getAllInsurancePolicyDetails();
        },
        error: (res: any) => {
          if (res.status == 200) {
            this.insurancePolicyService.showSuccess(this.deleteSuccessMessage);
            this.getAllInsurancePolicyDetails();
          } else {
            this.insurancePolicyService.showFailure(res.message);
          }
        }
      })
    }

  }
}


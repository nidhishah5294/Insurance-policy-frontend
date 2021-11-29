import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancePolicyRoutingModule } from './insurance-policy-routing.module';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InsuranceDetailsComponent,
    AddInsuranceComponent
  ],
  imports: [
    CommonModule,
    InsurancePolicyRoutingModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class InsurancePolicyModule { }

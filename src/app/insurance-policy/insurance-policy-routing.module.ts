import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';
import { InsuranceDetailsComponent } from './insurance-details/insurance-details.component';

const routes: Routes = [
  { path: 'view', component: InsuranceDetailsComponent },
  { path: 'add', component: AddInsuranceComponent },
  { path: 'edit/:id', component: AddInsuranceComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancePolicyRoutingModule { }

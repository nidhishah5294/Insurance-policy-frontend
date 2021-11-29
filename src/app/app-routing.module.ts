import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const insuranceModule = () => import('./insurance-policy/insurance-policy.module').then(x => x.InsurancePolicyModule);
const routes: Routes = [
  // { path: '**', redirectTo: 'insurance-policy', pathMatch: 'full' },
  { path: '', redirectTo: 'insurance-policy', pathMatch: 'full' },
  { path: 'insurance-policy', loadChildren: insuranceModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

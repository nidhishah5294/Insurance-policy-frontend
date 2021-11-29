import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { InsurancePolicy } from '../insurance-policy/insurance-policy';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAllDetails(): Observable<InsurancePolicy> {
    return this.http.get<InsurancePolicy>(`${environment.apiUrl}/insurance-policy`);
  }
  getDetailById(id: string): Observable<InsurancePolicy> {
    return this.http.get<InsurancePolicy>(`${environment.apiUrl}/insurance-policy/${id}`, { headers: this.httpHeaders });
  }
  addDetail(detail: InsurancePolicy): Observable<InsurancePolicy> {
    return this.http.post<InsurancePolicy>(`${environment.apiUrl}/insurance-policy`, detail);
  }
  updateDetail(detail: InsurancePolicy, id: String): Observable<InsurancePolicy> {
    return this.http.put<InsurancePolicy>(`${environment.apiUrl}/insurance-policy/${id}`, detail, { headers: this.httpHeaders });
  }
  deleteDetail(id: number): any {
    console.log(id)
    return this.http.delete(`${environment.apiUrl}/insurance-policy/${id}`, { headers: this.httpHeaders });
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showFailure(message: string) {
    this.toastr.error(message);
  }
  

}

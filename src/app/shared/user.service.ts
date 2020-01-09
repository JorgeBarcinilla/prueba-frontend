import { Injectable } from '@angular/core';
import { User, UserFilter, Country, City} from './user.model';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData : User;
  filterData : UserFilter;
  listUsers : User[];
  listCountries : Country[];
  listCitiesFormData : City[];
  listCitiesFilterData : City[];


  readonly API_URL = "/api";

  constructor(private http : HttpClient) { }

  postUser(formData : User){
    return this.http.post(this.API_URL+'/user', formData);
  }

  postFilter(formData : UserFilter){
    return this.http.post(this.API_URL+'/user/filter', formData);
  }

  refreshList(){
    this.http.get(this.API_URL+'/user')
    .toPromise().then(res => this.listUsers = res as User[]);
  }

  loadCountries(){
    this.http.get(this.API_URL+'/country')
    .toPromise().then(res => this.listCountries = res as Country[]);
  }

  putUser(formData : User){
    return this.http.put(this.API_URL+'/user/'+formData.id, formData);
  }

  deleteUser(id : number){
    return this.http.delete(this.API_URL+'/user/'+id);
  }

}

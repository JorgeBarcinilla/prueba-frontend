import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private service : UserService, 
    private toastr : ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
    this.resetForm();
  }

  loadCities(id : number){
    this.service.listCountries.map(country => {
      if(country.id == id){
        this.service.listCitiesFilterData = country.cities;
      }
    });
  }

  resetForm(form? : NgForm){
    if (form != null)
      form.resetForm();
    this.service.filterData = {
      name : '',
      identification : '',
      date_birth : '',
      country : '',
      city : ''
    }
  }

  onFilter(form : NgForm){
    this.service.postFilter(form.value).subscribe((res) => {
      this.toastr.info('', 'Filtro aplicado');
      console.log(res);
      this.service.listUsers = res as User[];
    }, (error) => {
      this.toastr.warning('Error al realizar la operacion, verifique la conexion a  la base de datos', 'Cancelado');
    })
  }

  populateForm(user : User){
    this.service.formData = Object.assign({},user);
  }

  onDelete(id : number){
    if(confirm('Estas seguro que quieres eliminar el usuario?')){
      this.service.deleteUser(id).subscribe((res) => {
        this.service.refreshList();
        this.toastr.warning('', 'Usuario eliminado')
      }, (error) => {
        this.toastr.warning('Error al realizar la operacion, verifique la conexion a  la base de datos', 'Cancelado');
      })
    }
  }

  displayedColumns: string[] = ['name','surnames', 'identification', 'date_birth', 'country', 'city'];
}

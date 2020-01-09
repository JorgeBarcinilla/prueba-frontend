import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  id : any;
  editing : boolean = false;
  constructor(private service : UserService, 
    private toastr : ToastrService, private activatedRoute : ActivatedRoute) {
      this.id = this.activatedRoute.snapshot.params['id'];
      if (this.id) {
        this.editing = true;
        this.service.formData = Object.assign({},this.service.listUsers.find((user)=>{return user.id == this.id}));
        console.log(this.service.formData);
      }else{
        this.editing = false;
      }
     }

  ngOnInit() {
    this.service.loadCountries();
    if(!this.editing){
      this.resetForm();
    }
    
  }

  loadCities(id : number){
    this.service.listCountries.map(country => {
      if(country.id == id){
        this.service.listCitiesFormData = country.cities;
      }
    });
  }

  resetForm(form? : NgForm){
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id:null,
      name : '',
      surnames : '',
      identification : '',
      date_birth : '',
      country : {},
      city : {}
    }
  }

  onSubmit(form : NgForm){
    if(this.editing)
      this.updateRecord(form);
    else
      this.insertRecord(form);
  }

  insertRecord(form : NgForm){
    this.service.postUser(form.value).subscribe((res) => {
      this.toastr.success('Guardado exitoso', form.value.name+' '+form.value.surnames+' Guardado')
      this.resetForm(form);
      this.service.refreshList();
      console.log(res);
    }, (error) => {
      this.toastr.warning('Error al realizar la operacion, verifique la conexion a  la base de datos', 'Cancelado');
    })
  }

  updateRecord(form : NgForm){
    this.service.putUser(form.value).subscribe((res) => {
      this.toastr.info('Actualización exitosa', 'Usuario actualizado')
      this.resetForm(form);
      console.log(res);
      this.service.refreshList();
    }, (error) => {
      console.log(error);
      this.toastr.warning('Error al realizar la operacion, verifique la conexion a  la base de datos', 'Cancelado');
    })
  }

}

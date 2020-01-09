import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserService } from './shared/user.service';

import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule,MatToolbarModule, 
  MatDatepickerModule, MatNativeDateModule, MatCardModule, MatGridListModule, MatTableModule,MatExpansionModule
  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";

import { Route, RouterModule } from "@angular/router";
const routes: Route[] = [
  {path : '', component : UserComponent},
  {path : 'form', component : UserComponent},
  {path : 'list', component : UserListComponent},
  {path : 'form/:id', component : UserComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule, 
    MatGridListModule, 
    MatTableModule,
    MatToolbarModule,
    MatExpansionModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

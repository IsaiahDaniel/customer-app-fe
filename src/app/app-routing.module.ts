import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { AddCustomersComponent } from './pages/add-customers/add-customers.component';
import { CustomerComponent } from './pages/customer/customer.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "search/:name",
    component: SearchComponent
  },
  {
    path: "customers/add",
    component: AddCustomersComponent
  },
  {
    path: "customers/customer/:id",
    component: CustomerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

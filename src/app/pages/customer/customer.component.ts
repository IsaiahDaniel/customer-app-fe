import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  public customerId: any = "";
  public isLoading = false;
  public customer: any = {};
  public showEdit = false;
  public editSuccess = false;

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.customerId = params.get("id");
    });
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  toggleEditForm(){
    this.showEdit = !this.showEdit;
  }

  getCustomer() {
    this.isLoading = true;
    this.http.get(`/customers/${this.customerId}`, (data: any) => {
      if (data.success) {
        this.isLoading = false;
        this.customer = data.data;
        console.log("customer", this.customer);
      }
    });
  }

  deleteCustomer(){
    this.isLoading = true;
    this.http.delete(`/customers/${this.customerId}`, ((data: any) => {
      if(data.success){
        this.isLoading = false;
        this.router.navigate(["/"]);
      }
    }));
  }

  editCustomer(form: NgForm){
    this.isLoading = true;
    console.log(form);
    const customerData = {
      name: form.value.name,
      age: form.value.age,
      gender: form.value.gender,
      address: { street: form.value.street, postCode: form.value.postCode, houseNumber: form.value.houseNumber },
      order: { amount: form.value.amount },
    };
    this.http.patch(`/customers/${this.customerId}`, customerData, (data: any) => {
      if (data.success) {
        this.isLoading = false;
        this.editSuccess = true;
        form.resetForm();
      }
    });
  }
}

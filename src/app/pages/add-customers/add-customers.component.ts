import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-add-customers",
  templateUrl: "./add-customers.component.html",
  styleUrls: ["./add-customers.component.css"],
})
export class AddCustomersComponent {
  public isLoading = false;
  public showToast = false;

  constructor(private http: HttpService, private router: Router) {}

  public formData = {
    name: "",
    age: "",
    postCode: "",
    gender: "",
    street: "",
    houseNumber: "",
    order_amount: "",
  };

  addCustomer(form: NgForm) {
    this.isLoading = true;
    console.log(form);
    const customerData = {
      name: form.value.name,
      age: form.value.age,
      gender: form.value.gender,
      address: { street: form.value.street, postCode: form.value.postCode, houseNumber: form.value.houseNumber },
      order: { amount: form.value.amount },
    };
    // this.http.post("/customers", customerData, (data: any) => {
    //   if (data.success) {
    //     this.isLoading = false;
    //     this.showToast = true;
    //     form.resetForm();
    //     this.router.navigate(["/"]);
    //   }
    // });
  }
}

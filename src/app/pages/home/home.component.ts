import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public customers: any[] = [];
  public isLoading = false;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.http.get("/customers", (data: any) => {
      this.isLoading = true;
      if (data.success) {
        this.isLoading = false;
        this.customers = data.data;
        console.log( this.customers);
      }
    });
  }
}

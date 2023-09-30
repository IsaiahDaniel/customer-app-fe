import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  public name: any = "";
  public search: any = {};
  public isLoading: boolean = false;
  public customer: any = {};

  constructor(
    private http: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.name = params.get("name");
    });
  }

  ngOnInit(): void {
    this.getSearchedUser();
  }

  getSearchedUser() {
    this.isLoading = true;
    this.search = { name: this.name }
    this.http.search(`/customers/byName/`, this.search, (data: any) => {
      if (data.success) {
        console.log("data search", data.data);
        this.customer = data.data;
      }
    });
  }
}

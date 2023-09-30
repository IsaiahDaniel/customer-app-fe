import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public name = "";

  constructor(private router: Router){}

  onSearch(form: NgForm){
    console.log("object", form.value.search );
    this.router.navigate(["search", form.value.search]);
    form.resetForm(); 
  }

}

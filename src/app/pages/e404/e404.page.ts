import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'

@Component({
  selector: 'app-e404',
  templateUrl: './e404.page.html',
  styleUrls: ['./e404.page.scss'],
})
export class E404Page implements OnInit {

  constructor(private router: Router) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    
  }

  volverLogin(){
    this.router.navigate(['login'], {replaceUrl: true});
  }

}

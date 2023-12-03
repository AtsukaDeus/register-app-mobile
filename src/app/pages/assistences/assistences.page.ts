import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assistences',
  templateUrl: './assistences.page.html',
  styleUrls: ['./assistences.page.scss'],
})
export class AssistencesPage implements OnInit {

  credencial_user: string = "";
  credencial_pass: string = "";
  assistences: any[] = [];

  constructor(private apiService: ApiService,
              private router: Router,
              private alertController: AlertController
              ) { }

  ngOnInit() {
    
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        
      this.credencial_user = storedUsername;
      this.credencial_pass = storedPassword;

      this.getAssistence();
    }
    else{
        this.irLogin();
    }

  }


  async getAssistence(){
    const dataApi = this.apiService.getAssistence(this.credencial_user);
    const result = await lastValueFrom(dataApi);

    const data_to_json_txt = JSON.stringify(result);
    const data_json = await JSON.parse(data_to_json_txt);

    this.assistences = data_json.result;
  }


  irPrincipal(){
    this.router.navigate(['principal'], {replaceUrl: true});
  }

  irLogin(){
    this.router.navigate(['login'], {replaceUrl: true});
  }



}

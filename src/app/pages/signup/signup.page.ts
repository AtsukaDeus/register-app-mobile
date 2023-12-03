import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  mdl_username: string = "";
  mdl_email: string = "";
  mdl_password: string = "";
  mdl_name: string = "";
  mdl_lastname: string = "";


  constructor(private router: Router, 
              private apiservice: ApiService,
              private alertController: AlertController) { }

  ngOnInit() {
    null
  }

  async createUser(){

    const apiService = this.apiservice.createUser(this.mdl_username, this.mdl_email, this.mdl_password, this.mdl_password, this.mdl_lastname);
    const respuesta = await lastValueFrom(apiService);

    const data_to_json_txt = JSON.stringify(respuesta);
    const data_json = await JSON.parse(data_to_json_txt);
    

    if(data_json.result[0].RESPUESTA == "OK"){
      const alert = await this.alertController.create({
        header: '¡Excelente!',
        subHeader: 'Se ha creado el usuario exitosamente.',
        buttons: [
          {
            text: 'Continuar',
            handler: () => {
              this.irLogin();
            }
          }
        ]
      });
      
      await alert.present();

    }else{

      const alert = await this.alertController.create({
        header: 'Ha ocurrido un error!',
        subHeader: 'No se ha podido crear al usuario',
        buttons: [
          {
            text: 'Continuar',
          }
        ]
      });
      
      await alert.present();
    }

  
  }

  irLogin(){
    this.router.navigate(['login'], {replaceUrl: true})
  }


  }




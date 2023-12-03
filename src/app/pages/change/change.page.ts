import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom} from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-change',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
})
export class ChangePage implements OnInit {

  credencial_user: string = "";
  credencial_pass: string = "";

  input_user: string = "";
  input_pass : string = "";

  new_credencial_pass: string = "";

  constructor(private router: Router,
              private apiservice: ApiService,
              private alertController: AlertController) { }

  ngOnInit() {

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        
        this.credencial_user = storedUsername;
        this.credencial_pass = storedPassword;
    }
    else{
        this.irLogin();
    }


  }

  async cambiarContrasena(){

    if (this.input_user == this.credencial_user && this.input_pass == this.credencial_pass){

      const dataApiService = this.apiservice.updatePassword(this.credencial_user, this.new_credencial_pass, this.credencial_pass);
      const respuesta = await lastValueFrom(dataApiService);

      const data_to_json_txt = JSON.stringify(respuesta);
      const data_json = JSON.parse(data_to_json_txt)


      if (data_json.result[0].RESPUESTA == "OK"){ 

        localStorage.removeItem("username");
        localStorage.removeItem("password");
        
        const alert = await this.alertController.create({
          header: '¡Bien hecho!',
          subHeader: 'Se ha cambiado la contraseña exitosamente!',
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

      }
      else{
        const alert = await this.alertController.create({
          header: 'Ha ocurrido un error!',
          subHeader: 'No se ha podido cambiar la contraseña...',
          buttons: [
            {
              text: 'Continuar',
            }
          ]
        });
        
        await alert.present();
      }
    }
  }

  irPrincipal(){
    this.router.navigate(['principal'], {replaceUrl: true});
  }

  irLogin(){
    this.router.navigate(['login'], {replaceUrl: true});
  }


}
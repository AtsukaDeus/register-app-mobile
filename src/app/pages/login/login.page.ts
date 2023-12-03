import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_username: string = "";
  mdl_password: string = "";


  constructor(private router: Router ,
              private apiService: ApiService,
              private alertController: AlertController) { 

  }
  
  ngOnInit() {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        this.irPrincipal();
    }

  }

  async login(){
    const dataApi = this.apiService.loginUser(this.mdl_username, this.mdl_password);
    const respuesta = await lastValueFrom(dataApi);

    const data_to_json_txt = JSON.stringify(respuesta);
    const data_json = await JSON.parse(data_to_json_txt);


    if(data_json.result[0].RESPUESTA == "LOGIN OK" ){

      localStorage.setItem("username", this.mdl_username);
      localStorage.setItem("password", this.mdl_password);

      const alert = await this.alertController.create({
        header: '¡Bien hecho!',
        subHeader: 'Se ha iniciado sesión exitosamente.',
        buttons: [
          {
            text: 'Continuar',
            handler: () => {
              this.irPrincipal();
            }
          }
        ]
      });
      
      await alert.present();
      
    }

    else{
      const alert = await this.alertController.create({
        header: 'Ha ocurrido un error!',
        subHeader: 'Las credenciales son inválidas',
        buttons: [
          {
            text: 'Continuar',
          }
        ]
      });
      
      await alert.present();
    }

  }


  irPrincipal(){
    this.router.navigate(['principal'], {replaceUrl: true});
  }

  irSignup(){
    this.router.navigate(['signup'], {replaceUrl: true});
  }



}

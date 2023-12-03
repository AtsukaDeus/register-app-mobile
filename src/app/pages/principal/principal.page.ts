import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  username: string = "";
  password: string = "";

  isSupported = false;
  barcodes: Barcode[] = [];


  constructor(private router: Router, 
              private alertController: AlertController,
              private apiService: ApiService
              ) { }

  ngOnInit() {

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        
        this.username = storedUsername;
        this.password = storedPassword;
    }
    else{
      this.irLogin();
    }

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

  }


  async cerrarSesion(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    const alert = await this.alertController.create({
      header: 'Se ha cerrado la sesión...',
      subHeader: 'Vuelve pronto!!',
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

  async scan(): Promise<void> {
    const ress = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

    if (!ress.available) {
      await BarcodeScanner.installGoogleBarcodeScannerModule()
    }

    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    // reading the QR
    let qr_txt = this.barcodes[this.barcodes.length - 1].rawValue;
    let array_qr = qr_txt.split('|');

    let seccion_code = array_qr[0];
    let seccion_name = array_qr[1];
    let room = array_qr[2];
    let date = array_qr[3];

    // API calls
    const dataApi = this.apiService.saveAssistance(this.username, seccion_name, seccion_code, date);
    const result = await lastValueFrom(dataApi);

    const data_to_json_txt = JSON.stringify(result);
    const data_json = await JSON.parse(data_to_json_txt);


    switch(data_json.result[0].RESPUESTA){
      case "ASISTENCIA_OK":
          this.presentAlert(
            'Bien Hecho!',
            `Has quedado presente en la clase: ${seccion_code} ${seccion_name} para la fecha de ${date}`
          );
          break;
      
      case "ASISTENCIA_NOK":
        this.presentAlert(
          'Atención!',
          `El usuario ya está presente en la clase: ${seccion_code} ${seccion_name}`
        );
        break;
          
      default:
        this.presentAlert(
          'Error!',
          `No se ha podido llevar acabo la solicitud.`
        );
        break;
    }

    this.irPrincipal();
  }


  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }


  async presentAlert(title: string = '', msg: string = ''): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }



  irChange(){
    this.router.navigate(['change'], {replaceUrl: true})
  }


  irLogin(){
    this.router.navigate(['login'], {replaceUrl: true})
  }


  irPrincipal(){
    this.router.navigate(['principal'], {replaceUrl: true});
  }


  irAssistence(){
    this.router.navigate(['assistences'], {replaceUrl: true});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta_api_1 = 'https://fer-sepulveda.cl/API_PRUEBA_2/api-service.php/';
  ruta_api_2 = 'https://fer-sepulveda.cl/API_PRUEBA_3/api-service.php';

  constructor(private http: HttpClient) { }

  createUser(usuario: string, correo: string, contrasena: string, nombre: string, apellido: string){
    return this.http.post(this.ruta_api_1, {
      nombreFuncion: 'UsuarioAlmacenar',
      parametros: [
        usuario, correo, contrasena, nombre, apellido
      ]
    }).pipe();
  }
  

  loginUser(usuario: string, contrasena: string){
    return this.http.post(this.ruta_api_1, {
      nombreFuncion: 'UsuarioLogin',
      parametros: [usuario, contrasena]
    }).pipe();
  }


  updatePassword(usuario: string, contrasenaNueva: string, contrasenaActual: string){
    return this.http.patch(this.ruta_api_1, {
      nombreFuncion: 'UsuarioModificarContrasena',
      parametros: [usuario, contrasenaNueva, contrasenaActual]
    }).pipe();
  }


  saveAssistance(usuario: string, asignatura: string, seccion: string, fecha: string){
    return this.http.post(this.ruta_api_2, {
      nombreFuncion: 'AsistenciaAlmacenar',
      parametros: [usuario, asignatura, seccion, fecha]
    }).pipe();

  }


  getAssistence(usuario: string){
    return this.http.get(this.ruta_api_2 + '?nombreFuncion=AsistenciaObtener&usuario=' + usuario).pipe();
  }

}

import { Injectable } from '@angular/core';

@Injectable()
export class PdfsService {

  constructor() { }

  // loadFile(archivo: File, tipo: string, id:string){

  //   return new Promise ((resolve, reject) => {
  //     let formData = new FormData();
  //     let xhr = new XMLHttpRequest();
  
  //     formData.append('pdf', archivo, archivo.name );
  
  //     xhr.onreadystatechange = function(){
  //       if( xhr.readyState === 4){
  //         if (xhr.status === 200){
  //           console.log('Imagen subida');
  //           resolve( xhr.response )
  //         } else {
  //           console.log('Error de subida');
  //           reject( xhr.response);
  //         }
  //       }
  //     }
  //   })

  // }

}

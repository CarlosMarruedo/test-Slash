import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  //url de la imagen
  url: any = '';
  constructor() { }

  ngOnInit(): void {
  }

  //evento que ocurre en el input invisible
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader(); 

      reader.readAsDataURL(event.target.files[0]); // leer la imagen como url

      reader.onload = (event) => { // cuando carga se llama esta funcion
        this.url = event.target!.result;
      }
    }
  }

}

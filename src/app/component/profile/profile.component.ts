import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form!:FormGroup;
  //flag de que se ha intentado hacer un submit, para control de errores
  private formSubmitAttempt!: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  //inicializar el formBuilder para el control y validacion de los campos
  createForm(){
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
     
    });
  }
  //funcion que activara el field CSS del form en caso de que sea necesario para cada field del form
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  //comprobacion de que el field en concreto es valido
  isFieldValid(field: string) {
    //mirar las flags de si el field es valido, ha sido escrito o/y ha sido clickado por el cliente y si se ha intentado hacer submit
    return (!this.form.get(field)!.valid && this.form.get(field)!.touched) ||
      (this.form.get(field)!.untouched && this.formSubmitAttempt);
  }
  //activar el flag de intento de submit
  onSubmit(){
    //flag
    this.formSubmitAttempt = true;
    //si es valido, llamar a la funcion que ocurre al hacer submit
    if (this.form.valid) {
      console.log('form submitted');
    }
  }
}

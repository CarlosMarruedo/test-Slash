import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
//componente para el display de errores de cada form
export class FieldErrorDisplayComponent {

  //recibe el mensaje de error y si se tiene que enseñar
  @Input() errorMsg!: string;
  @Input() displayError!: boolean;

}

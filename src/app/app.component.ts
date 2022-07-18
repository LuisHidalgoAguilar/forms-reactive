import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    genders = ['male', 'female'];
    forbiddenNames = ["Pepe", "Manolo"];
    signUpForm: FormGroup;


    ngOnInit(): void {
        this.signUpForm = new FormGroup({
            //Subgrupo
            "userData": new FormGroup({
                //CustomValidator
                //Es importante hacer el "bind(this)" para que el "this" sea el correcto.
                "username": new FormControl(null, [Validators.required, Validators.minLength(3), this.forbiddenNamesValidator.bind(this)]),
                "email": new FormControl(null, [Validators.required, Validators.email]),
            }),
            "gender": new FormControl("female")
        })
    }

    onSubmit() {
        console.log(this.signUpForm.value);
    }

    //CustomValidator
    //Si el control pasa la validación hay que devolver "null"
    forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } {
        if (this.forbiddenNames.indexOf(control.value) !== -1) {
            return { "isForbiddenName": true };
        }
        return null;
    }

}

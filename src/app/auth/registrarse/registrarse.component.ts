import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css',
})
export class RegistrarseComponent {
  registerUser!: FormGroup;

  constructor(private loginService: AuthService, private router: Router) {
    this.registerUser = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    // console.log(this.registerUser.value);
    this.loginService
      .register(this.registerUser.value)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/auth/iniciar-sesion']);
      })
      .catch((error) => console.log(error));
  }
}
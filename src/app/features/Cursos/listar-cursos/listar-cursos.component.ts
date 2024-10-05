import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Cursos } from '../curso.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../cursos.service';
import { DialogCursoComponent } from '../dialog-curso/dialog-curso.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-cursos',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './listar-cursos.component.html',
  styleUrl: './listar-cursos.component.css',
})
export class ListarCursosComponent {
  cursos$!: Observable<Cursos[]>;

  constructor(
    private dialog: MatDialog,
    private cursosService: CursosService,
    private router: Router ,
  ) {}

  ngOnInit(): void {
    this.cursos$ = this.cursosService.ObtenerCursosObservable();
    console.log(this.cursos$);
  }

  EliminarCurso(curso: Cursos) {
    this.cursosService.EliminarCurso(curso);
  }

  AgregarCurso() {
    const dialogRef = this.dialog.open(DialogCursoComponent, {
      data: {
        idCurso: 1, // Este valor podría generarse en el backend
        comision: '',
        nombreCurso: '',
        detalle: '',
        descripcion: '',
        presencial: false,
        fechaInicio: '',
        fechaFin: '',
        profesor: {
          nombre: '',
          apellido: '',
          idProfesor: 0,

        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nuevoCurso: Cursos = {
          idCurso: obtenerSiguienteNumero(),
          comision: result.comision,
          nombreCurso: result.nombreCurso,
          detalle: result.detalle,
          descripcion: result.descripcion,
          presencial: result.presencial,
          fechaInicio: new Date(),
          fechaFin: new Date(),
          profesor: {
            nombre: result.nombre,
            apellido: result.apellido,
            idProfesor: 0,
          },
        };

        // Llama al servicio para editar el curso
        this.cursosService.AgregarCurso(nuevoCurso);
        console.log('Cursos editado correctamente', result);
      }
    });
  }

  EditarCurso(curso: Cursos) {
    const dialogRef = this.dialog.open(DialogCursoComponent, {
      data: curso,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const editarCurso: Cursos = {
          idCurso: curso.idCurso,
          comision: result.comision,
          detalle: result.detalle,
          nombreCurso: result.nombreCurso,
          descripcion: result.descripcion,
          presencial: result.presencial,
          fechaInicio: result.fechaInicio,
          fechaFin: result.fechaFin,
          profesor: {
            nombre: result.nombre,
            apellido: result.apellido,
            idProfesor: result.idProfesor,
          },
        };

        // Llama al servicio para editar el curso
        this.cursosService.EditarCurso(editarCurso);
        console.log('Curso editado correctamente', result);
      }
    });
  }


  //Angular utiliza un identificador para determinar qué elementos han cambiado y así minimizar el número de actualizaciones necesarias en el DOM.
  trackByCursosId(index: number, curso: Cursos) {
    return curso.idCurso;
  }


  detalleProfesor(idProfesor: number) {
    this.router.navigate(['/profesor/', idProfesor]);
  }

      

  inscribirseAlCurso() {
    alert('Inscribir al curso');
  }
}


let ultimoNumero = 10; // Empieza antes del rango deseado
function obtenerSiguienteNumero() {
  ultimoNumero++;
  console.log(ultimoNumero);
  return ultimoNumero;
}

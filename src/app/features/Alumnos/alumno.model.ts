import { Cursos } from "../Cursos/curso.model";

export interface Alumno {
  idAlumno: string;
  nombre: string;
  apellido: string;
  correo: string;
  fechaNacimiento: Date;
  telefono: string;
  direccion: string;

  // cursos: Cursos [];
  idTipoUsuario: number;
}

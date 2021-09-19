import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';

import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 24.023971;
  lng = -104.670285;

  constructor( private snackBar: MatSnackBar, public dialog: MatDialog ) {
    if ( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  agregarMarcador( evento ) {

    const coords  = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push( nuevoMarcador );
    this.guardarStorage();

    // Simple message with an action.
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  // tslint:disable-next-line: typedef
  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  // tslint:disable-next-line: typedef
  editarMarcador( marcador: Marcador ) {
    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe( result => {
      if( !result ) {
        return;
      } else {
        marcador.titulo = result.titulo;
        marcador.desc = result.desc;

        this.guardarStorage();
        this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // tslint:disable-next-line: typedef
  borrarMarcador( index: number ) {
    this.marcadores.splice( index, 1 );
    this.guardarStorage();

    // Simple message with an action.
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }
}

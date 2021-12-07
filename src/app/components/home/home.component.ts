// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  
  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  messageError!: string;

// paises: any[] = [];

  constructor(/*private http:HttpClient*/ private spotify: SpotifyService, private router: Router) {

    // console.log('Constructor del Home hecho');
    
    // this.http.get('https://restcountries.com/v3.1/lang/spa')
    //         .subscribe( (resp: any) => {
    //           this.paises = resp;
    //           console.log(resp);
    //         } );

    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          console.log(data);
          
          this.nuevasCanciones = data;
          this.loading = false;
        }, (e) => {
          this.error = true;
          console.log(e);
          this.loading = false;
          this.messageError = e.error.error.message;
        });
  }

  ngOnInit(): void {
  }

  verArtista( cancion: any ){
    let artistaId = cancion.artists[0].id;

    this.router.navigate([ '/artist', artistaId ])
  }

}

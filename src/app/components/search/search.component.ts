import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  loading: boolean;
  messageError!: string;
  error: boolean;
  
  constructor(private spotify: SpotifyService, private router: Router) { 

    this.loading = true;
    this.error = false;
  }

  buscar(termino : string) {
    console.log(termino);
    this.spotify.getArtistas( termino )
        .subscribe( (data: any) => {
          console.log(data);
          
          this.artistas = data;
          this.loading = false;
        }, (e) => {
          this.error = true;
          console.log(e);
          this.loading = false;
          this.messageError = e.error.error.message;
        });
  }

  verArtista( artista: any ){
    let artistaId = artista.id;
    
    this.router.navigate([ '/artist', artistaId ])
  }

  ngOnInit(): void {
  }

}

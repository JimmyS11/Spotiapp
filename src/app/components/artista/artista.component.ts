import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  topTracks: any[] = [];
  loading!: boolean;
  error!: boolean;
  messageError!: string;
  
  constructor(private route: ActivatedRoute, private spotify: SpotifyService ) { 
    this.route.params.subscribe( params => {
      this.getArtista( params['id'] );
      this.getTopTracks( params['id'] );

      this.loading = true;
      this.error = false;

    })
  }

  ngOnInit(): void {
  }

  getArtista( id: string ){
    this.spotify.artista( id )
        .subscribe( artista => {
          console.log(artista);
          this.artista = artista;
          this.loading = false;
        }, (e) => {
          this.error = true;
          console.log(e);
          this.loading = false;
          this.messageError = e.error.error.message;
        }); 
  }

  getTopTracks( id: string ) {

    this.spotify.getTopTrack( id )
        .subscribe( topTracks => {
          console.log(topTracks);
          this.topTracks = topTracks;
        }, (e) => {
          this.error = true;
          console.log(e);
          this.messageError = e.error.error.message;
        });
  }
}

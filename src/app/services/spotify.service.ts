import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log('Spotify service Listo');
    
  }

  getNewReleases(){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCi1fJY5R-Rw1_9x04VSrxAoZvJcackmF3a7iTw0LHTPspZ12zgeqK46XoTZFVBfT59Mle8TADnEq3fBIE'
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers }) 
              .pipe( map( (data: any) => {
                return data['albums'].items;
              }) );

  }

  getArtistas( termino: string ){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCi1fJY5R-Rw1_9x04VSrxAoZvJcackmF3a7iTw0LHTPspZ12zgeqK46XoTZFVBfT59Mle8TADnEq3fBIE'
    });

    return this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
                .pipe( map( (data: any) => {
                  return data['artists'].items;
                }) );   
  }

  artista( id: string ){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCi1fJY5R-Rw1_9x04VSrxAoZvJcackmF3a7iTw0LHTPspZ12zgeqK46XoTZFVBfT59Mle8TADnEq3fBIE'
    });

    return this.http.get(`https://api.spotify.com/v1/artists/${ id }`, { headers });
                // .pipe( map( (data: any) => {
                //   return data['artists'].items;
                // }) );   
  }

  getTopTrack( id: string ){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCi1fJY5R-Rw1_9x04VSrxAoZvJcackmF3a7iTw0LHTPspZ12zgeqK46XoTZFVBfT59Mle8TADnEq3fBIE'
    });

    return this.http.get(`https://api.spotify.com/v1/artists/${ id }/top-tracks?country=us`, { headers })
                    .pipe( map( (data: any) => {
                      return data['tracks'];
                    }) );   
  }
}

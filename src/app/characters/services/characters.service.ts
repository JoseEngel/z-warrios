import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CharactersResponse } from '../interface/characters-interface';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;


@Injectable({providedIn: 'root'})
export class CharactersService {
    private http = inject(HttpClient);

    /*getCharacters(options: Options): Observable<CharactersResponse> {
        const { limit = 10, offset = 0} = 'options';

        return this.http
        .get<CharactersResponse>(`https://dragonball-api.com/api/characters?page=${}` {
            params: {
                limit,
                offset,
            },
        })
        .pipe(tap((resp) => console.log(resp)));
    }*/

    getCharacters(page: number = 1) {
        return this.http
        .get<CharactersResponse>(`https://dragonball-api.com/api/characters?page=${page}`)
    }

}
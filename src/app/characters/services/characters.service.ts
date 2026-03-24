import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CharactersResponse } from '../interface/characters-interface';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CharactersService {
    private http = inject(HttpClient);

    getCharacters(page: number = 1) {
        return this.http
        .get<CharactersResponse>(`https://dragonball-api.com/api/characters?page=${page}`)
    }

}
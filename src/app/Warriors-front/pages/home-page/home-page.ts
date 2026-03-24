import { PaginationService } from './../../../shared/components/pagination/pagination.service';
import { CharactersCard } from '@/characters/components/characters-card/characters-card';
import { Character, CharactersResponse } from '@/characters/interface/characters-interface';
import { CharactersService } from '@/characters/services/characters.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { CharactersModal } from "../characters-modal/characters-modal";
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { Pagination } from '@/shared/components/pagination/pagination';
import { EditCharacterDialog } from '../edit-character-dialog/edit-character-dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { switchMap } from 'rxjs';



@Component({
  selector: 'app-home-page',
  imports: [CharactersCard, CharactersModal, PaginatorModule, Pagination],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage { 
  charactersService = inject(CharactersService);
  PaginationService = inject(PaginationService);
  dialogService = inject(DialogService);
  
  router = inject(Router);

  page$ = toObservable(this.PaginationService.currentPage);

  charactersResource = rxResource<CharactersResponse, void>({
    stream: () => 
      this.page$.pipe(
        switchMap((page) =>{
          console.log('🚀 API llamada con página:', page);
          console.log('🔥 Nueva página:', page);
          return this.charactersService.getCharacters(page);
        })
      )
  });
  onPageChange(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  showModal = false;
  selectedCharacter = signal<any | null>(null);
  
  openModal(character: Character) {
    console.log('CLICK', character);
    this.selectedCharacter.set(character);
    this.showModal = true;
  }

  openEdit(character: any) {
    this.dialogService.open(EditCharacterDialog, {
      header: `Editar ${character.name}`,
      width: '500px',
      data: character,
      modal: true
    })
  }

  closeModal() {
    this.selectedCharacter.set(null);
  }

}

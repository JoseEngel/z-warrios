import { PaginationService } from './../../../shared/components/pagination/pagination.service';
import { CharactersService } from './../../../characters/services/characters.service';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { CharactersResponse } from '@/characters/interface/characters-interface';
import { NgClass } from '@angular/common';
import { Pagination } from "@/shared/components/pagination/pagination";
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-statistics-page',
  imports: [TableModule, TagModule, ProgressBarModule, ButtonModule, NgClass, Pagination],
  templateUrl: './statistics-page.html',
  styleUrl: './statistics-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPage {

  CharactersService = inject(CharactersService);
  PaginationService = inject(PaginationService);

  route = inject(ActivatedRoute);

  router = inject(Router);

  showTable = signal(false);

  toggleTable() {
    this.showTable.update(v => !v);
  }

  page$ = toObservable(this.PaginationService.currentPage);

  charactersResource = rxResource<CharactersResponse, void>({
    stream: () => 
      this.page$.pipe(
        switchMap((page) =>{
          console.log('🚀 API llamada con página:', page);
          console.log('🔥 Nueva página:', page);
          return this.CharactersService.getCharacters(page);
        })
      )
  });

  constructor(){
    effect(() => {
      console.log('📄 Página actual:', this.PaginationService.currentPage());
    });
  }  

  onPageChange(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  getRaceSeverity(race: string) {
    switch (race) {
      case 'Saiyan': return 'warn';
      case 'Human': return 'info';
      case 'Namekian': return 'success';
      case 'Frieza Race': return 'secondary';
      default: return 'contrast';
    }
  }

  getKiPercent(ki: number): number {
    const maxKi = 500000000;
    return Math.min((ki / maxKi) * 100, 100);
  }

  getKiClass(ki: number): string {
    if (ki > 8000) return 'ki-high';
    if (ki > 4000) return 'ki-medium';
    return 'ki-low';
  }

  getGenderIcon(gender: string) {
    return gender === 'Male' 
    ? 'pi pi-mars text-blue-400' 
    : 'pi pi-venus text-pink-400';
  }

  animatedValues = new Map<number, number>();
  
  animatedKi(ki: number): number {
    if (!this.animatedValues.has(ki)) {
      this.animateKi(ki);
      return 0;
    }
    return this.animatedValues.get(ki)!;
  }
  
  private animateKi(ki: number) {
    let current = 0;
    const target = this.getKiPercent(ki);
    
    const interval = setInterval(() => {
      current += 5;
      
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      
      this.animatedValues.set(ki, current);
    }, 20);
  }
 }

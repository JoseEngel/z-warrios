import { Character } from '@/characters/interface/characters-interface';
import { CharacterImagePipe } from '@/characters/pipes/characters-image.pipe';
import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, output, Output } from '@angular/core';

@Component({
  selector: 'characters-card',
  imports: [ SlicePipe, CharacterImagePipe],
  templateUrl: './characters-card.html',
  styleUrl: './characters-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersCard { 
  character = input.required<Character>();

  imageUrl = computed(() => this.character().image);

  @Output() open = new EventEmitter<any>();

  edit = output<any>();

  onOpenEdit() {
    this.edit.emit(this.character());
  }

  onOpenModal() {
    this.open.emit(this.character());
  }
}

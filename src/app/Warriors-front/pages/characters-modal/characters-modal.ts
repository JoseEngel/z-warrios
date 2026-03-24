import { Character } from '@/characters/interface/characters-interface';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'characters-modal',
  imports: [CommonModule],
  templateUrl: './characters-modal.html',
  styleUrl: './characters-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersModal {

  @Input() character: any = null;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  getRaceClass(race: string): string {
  switch (race) {
    case 'Saiyan':
      return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    case 'Human':
      return 'bg-blue-500';
    case 'Namekian':
      return 'bg-green-600';
    case 'Frieza Race':
      return 'bg-purple-500';
    default:
      return 'bg-gray-400';
  }
}

formatKi(ki: number): string {
  if (!ki) return '0';

  if (ki >= 1_000_000_000) return (ki / 1_000_000_000).toFixed(1) + 'B';
  if (ki >= 1_000_000) return (ki / 1_000_000).toFixed(1) + 'M';
  if (ki >= 1_000) return (ki / 1_000).toFixed(1) + 'K';

  return ki.toString();
}

}

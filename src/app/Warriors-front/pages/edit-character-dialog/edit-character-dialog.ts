import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';



import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'edit-character-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, InputNumberModule, SelectModule, DatePickerModule, ButtonModule, ToastModule],
  templateUrl: './edit-character-dialog.html',
  providers: [MessageService],
  styleUrl: './edit-character-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCharacterDialog { 

  private fb = inject(FormBuilder);
  private config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);

  private messageService = inject(MessageService);

  character = this.config.data;

  factions = [
    { label: 'Z Fighter', value: 'Z Fighter' },
    { label: 'Villain', value: 'Villain' },
    { label: 'Neutral', value: 'Neutral' }
  ];

  form = this.fb.group({
    name: [this.character.name, Validators.required],
    ki: [this.character.ki, [Validators.required, Validators.min(0)]],
    faction: [this.character.faction || 'Z Fighter'],
    date: [new Date()]
  });

  save() {
    if (this.form.invalid) return;

    console.log('DATA EDITADA:', this.form.value);

    this.messageService.add({
      severity: 'success',
      summary: 'Cambios guardados',
      detail: `${this.form.value.name} fue actualizado`,
      life: 5000
    });

    setTimeout(() => this.ref.close(), 2000);
  }
}

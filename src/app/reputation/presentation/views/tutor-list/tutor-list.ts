import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ReputationStore } from '../../../application/reputation-store';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tutor-list',
  imports: [MatTableModule, MatButtonModule, MatError, MatProgressSpinner],
  templateUrl: './tutor-list.html',
  styleUrl: './tutor-list.css',
})
export class TutorList {
  readonly store = inject(ReputationStore);
  protected router = inject(Router);

  displayedColumns: string[] = ['id', 'fullName', 'university', 'averageScore', 'actions'];

  editTutor(id: number) {
    this.router.navigate(['reputation/tutors/edit', id]).then();
  }

  deleteTutor(id: number) {
    this.store.deleteTutor(id);
  }
}

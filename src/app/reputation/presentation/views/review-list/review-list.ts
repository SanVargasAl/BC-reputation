import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ReputationStore } from '../../../application/reputation-store';
import { Router } from '@angular/router';
import { MatError } from '@angular/material/form-field';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-review-list',
  imports: [
    MatError,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatProgressSpinner,
  ],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css',
})
export class ReviewList {
  readonly store = inject(ReputationStore);
  protected router = inject(Router);

  displayedColumns: string[] = [
    'id',
    'tutorId',
    'studentId',
    'sessionId',
    'score',
    'comment',
    'status',
    'createdAt',
    'actions',
  ];

  editReview(id: number) {
    this.router.navigate(['reputation/courses/edit', id]).then();
  }

  deleteReview(id: number) {
    this.store.deleteReview(id);
  }
}

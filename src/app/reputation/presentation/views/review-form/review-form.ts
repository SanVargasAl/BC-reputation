import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReputationStore } from '../../../application/reputation-store';
import { Review } from '../../../domain/model/review.entity';
import { Tutor } from '../../../domain/model/tutor.entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatInput],
  templateUrl: './review-form.html',
  styleUrl: './review-form.css',
})
export class ReviewForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(ReputationStore);

  form = this.fb.group({
    tutorId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    studentId: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    sessionId: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    score: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1), Validators.max(5)],
    }),
    comment: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl<string>('PUBLISHED', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    createdAt: new FormControl<string>(new Date().toISOString(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  tutors = this.store.tutors;
  isEdit = false;
  reviewId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.reviewId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.reviewId;
      if (this.isEdit) {
        const review = this.store.reviews().find((r) => r.id === this.reviewId);
        if (review) {
          this.form.patchValue({
            tutorId: review.tutorId,
            studentId: review.studentId,
            sessionId: review.sessionId,
            score: review.score,
            comment: review.comment,
            status: review.status,
            createdAt: review.createdAt,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const tutor: Tutor | null = this.store.getTutorById(this.form.value.tutorId)() ?? null;

    const review: Review = new Review({
      id: this.reviewId ?? 0,
      tutorId: this.form.value.tutorId!,
      studentId: this.form.value.studentId!,
      sessionId: this.form.value.sessionId!,
      score: this.form.value.score!,
      comment: this.form.value.comment!,
      status: this.form.value.status!,
      createdAt: this.form.value.createdAt!,
      tutor: tutor ?? null,
    });

    if (this.isEdit) {
      this.store.updateReview(review);
    } else {
      this.store.addReview(review);
    }

    this.router.navigate(['reputation/reviews']).then();
  }
}

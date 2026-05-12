import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReputationStore } from '../../../application/reputation-store';
import { Tutor } from '../../../domain/model/tutor.entity';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tutor-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './tutor-form.html',
  styleUrl: './tutor-form.css',
})
export class TutorForm {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(ReputationStore);

  form = this.fb.group({
    fullName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    university: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    averageScore: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(5)],
    }),
    totalReviews: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  isEdit = false;
  tutorId: number | null = null;

  constructor() {
    this.route.params.subscribe((params) => {
      this.tutorId = params['id'] ? +params['id'] : null;
      this.isEdit = !!this.tutorId;
      if (this.isEdit) {
        const tutor = this.store.getTutorById(this.tutorId)();
        if (tutor) {
          this.form.patchValue({
            fullName: tutor.fullName,
            university: tutor.university,
            averageScore: tutor.averageScore,
            totalReviews: tutor.totalReviews,
          });
        }
      }
    });
  }

  submit() {
    if (this.form.invalid) return;

    const tutor: Tutor = new Tutor({
      id: this.tutorId ?? 0,
      fullName: this.form.value.fullName!,
      university: this.form.value.university!,
      averageScore: this.form.value.averageScore ?? 0,
      totalReviews: this.form.value.totalReviews ?? 0,
    });

    if (this.isEdit) {
      this.store.updateTutor(tutor);
    } else {
      this.store.addTutor(tutor);
    }

    this.router.navigate(['reputation/tutors']).then();
  }
}

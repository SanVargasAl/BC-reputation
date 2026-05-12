import { Injectable, computed, Signal, signal } from '@angular/core';
import { Review } from '../domain/model/review.entity';
import { Tutor } from '../domain/model/tutor.entity';
import { ReputationApi } from '../infrastructure/reputation-api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReputationStore {
  private readonly reviewsSignal = signal<Review[]>([]);
  private readonly tutorsSignal = signal<Tutor[]>([]);

  readonly reviews = this.reviewsSignal.asReadonly();
  readonly tutors = this.tutorsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly reviewCount = computed(() => this.reviews().length);
  readonly tutorCount = computed(() => this.tutors().length);

  constructor(private reputationApi: ReputationApi) {
    this.loadTutors();
    this.loadReviews();
  }

  /**
   * Retrieves a tutor by their ID as a signal.
   * @param id - The ID of the tutor.
   * @returns A Signal containing the Tutor object or undefined if not found.
   */
  getTutorById(id: number | null | undefined): Signal<Tutor | undefined> {
    return computed(() => (id ? this.tutors().find((t) => t.id === id) : undefined));
  }

  /**
   * Adds a new review.
   * @param review - The review to add.
   */
  addReview(review: Review): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.reputationApi
      .createReview(review)
      .pipe(retry(2))
      .subscribe({
        next: (createdReview) => {
          //this.assignTutorToReview(createdReview);
          this.reviewsSignal.update((reviews) => [...reviews, createdReview]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create review'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing review.
   * @param updatedReview - The review to update.
   */
  updateReview(updatedReview: Review): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.reputationApi
      .updateReview(updatedReview)
      .pipe(retry(2))
      .subscribe({
        next: (review) => {
          //this.assignTutorToReview(review);
          this.reviewsSignal.update((reviews) =>
            reviews.map((r) => (r.id === review.id ? review : r)),
          );
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update review'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a review by ID.
   * @param id - The ID of the review to delete.
   */
  deleteReview(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.reputationApi
      .deleteReview(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.reviewsSignal.update((reviews) => reviews.filter((r) => r.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete review'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Adds a new tutor.
   * @param tutor - The tutor to add.
   */
  addTutor(tutor: Tutor): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.reputationApi
      .createTutor(tutor)
      .pipe(retry(2))
      .subscribe({
        next: (createdTutor) => {
          this.tutorsSignal.update((tutors) => [...tutors, createdTutor]);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to create tutor'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Updates an existing tutor.
   * @param updatedTutor - The tutor to update.
   */
  updateTutor(updatedTutor: Tutor): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.reputationApi
      .updateTutor(updatedTutor)
      .pipe(retry(2))
      .subscribe({
        next: (tutor) => {
          this.tutorsSignal.update((tutors) => tutors.map((t) => (t.id === tutor.id ? tutor : t)));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to update tutor'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Deletes a tutor by ID.
   * @param id - The ID of the tutor to delete.
   */
  deleteTutor(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.reputationApi
      .deleteTutor(id)
      .pipe(retry(2))
      .subscribe({
        next: () => {
          this.tutorsSignal.update((tutors) => tutors.filter((t) => t.id !== id));
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to delete tutor'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Loads all reviews from the API.
   */
  private loadReviews(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.reputationApi
      .getReviews()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (reviews) => {
          console.log(reviews);
          this.reviewsSignal.set(reviews);
          this.loadingSignal.set(false);
          //this.assignTutorsToReviews();
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load reviews'));
          this.loadingSignal.set(false);
        },
      });
  }

  /**
   * Loads all tutors from the API.
   */
  private loadTutors(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.reputationApi
      .getTutors()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (tutors) => {
          this.tutorsSignal.set(tutors);
          this.loadingSignal.set(false);
        },
        error: (err) => {
          this.errorSignal.set(this.formatError(err, 'Failed to load tutors'));
          this.loadingSignal.set(false);
        },
      });
  }

  private assignTutorsToReviews(): void {
    this.reviewsSignal.update((reviews) =>
      reviews.map((review) => this.assignTutorToReview(review)),
    );
  }

  private assignTutorToReview(review: Review): Review {
    const tutorId = review.tutorId ?? 0;
    const tutor = tutorId ? (this.tutors().find((t) => t.id === tutorId) ?? null) : null;
    return { ...review, tutor } as Review;
  }

  /**
   * Formats error messages for user-friendly display.
   * @param error - The error object.
   * @param fallback - The fallback error message.
   * @returns A formatted error message.
   */
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found')
        ? `${fallback}: Not found`
        : error.message;
    }
    return fallback;
  }
}

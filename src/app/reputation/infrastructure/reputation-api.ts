import { BaseApi } from '../../shared/infrastructure/base-api';
import { Injectable } from '@angular/core';
import { Review } from '../domain/model/review.entity';
import { Tutor } from '../domain/model/tutor.entity';
import { HttpClient } from '@angular/common/http';
import { ReviewsApiEndpoint } from './reviews-api-endpoint';
import { TutorsApiEndpoint } from './tutors-api-endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // <-- ¡Esto es lo que Angular no encontraba!
})
export class ReputationApi extends BaseApi {
  private readonly reviewsEndpoint: ReviewsApiEndpoint;
  private readonly tutorsEndpoint: TutorsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.reviewsEndpoint = new ReviewsApiEndpoint(http);
    this.tutorsEndpoint = new TutorsApiEndpoint(http);
  }

  /**
   * Retrieves all courses from the API.
   * @returns An Observable for an array of Course objects.
   */
  getReviews(): Observable<Review[]> {
    return this.reviewsEndpoint.getAll();
  }

  /**
   * Retrieves a single course by ID.
   * @param id - The ID of the course.
   * @returns An Observable of the Course object.
   */
  getReview(id: number): Observable<Review> {
    return this.reviewsEndpoint.getById(id);
  }

  /**
   * Creates a new course.
   * @param course - The course to create.
   * @returns An Observable of the created Course object.
   */
  createReview(course: Review): Observable<Review> {
    return this.reviewsEndpoint.create(course);
  }

  /**
   * Updates an existing course.
   * @param course - The course to update.
   * @returns An Observable of the updated Course object.
   */
  updateReview(course: Review): Observable<Review> {
    return this.reviewsEndpoint.update(course, course.id);
  }

  /**
   * Deletes a course by ID.
   * @param id - The ID of the course to delete.
   * @returns An Observable of void.
   */
  deleteReview(id: number): Observable<void> {
    return this.reviewsEndpoint.delete(id);
  }

  /**
   * Retrieves all categories from the API.
   * @returns An Observable for an array of Category objects.
   */
  getTutors(): Observable<Tutor[]> {
    return this.tutorsEndpoint.getAll();
  }

  /**
   * Retrieves a single category by ID.
   * @param id - The ID of the category.
   * @returns An Observable of the Category object.
   */
  getTutor(id: number): Observable<Tutor> {
    return this.tutorsEndpoint.getById(id);
  }

  /**
   * Creates a new category.
   * @param category - The category to create.
   * @returns An Observable of the created Category object.
   */
  createTutor(category: Tutor): Observable<Tutor> {
    return this.tutorsEndpoint.create(category);
  }

  /**
   * Updates an existing category.
   * @param category - The category to update.
   * @returns An Observable of the updated Category object.
   */
  updateTutor(category: Tutor): Observable<Tutor> {
    return this.tutorsEndpoint.update(category, category.id);
  }

  /**
   * Deletes a category by ID.
   * @param id - The ID of the category to delete.
   * @returns An Observable of void.
   */
  deleteTutor(id: number): Observable<void> {
    return this.tutorsEndpoint.delete(id);
  }
}

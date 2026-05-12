import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface ReviewsResponse extends BaseResponse {
  /**
   * Array of course resources included in the response.
   */
  reviews: ReviewResource[];
}

/**
 * Represents a single course resource returned from the API.
 *
 * @remarks
 * This interface extends {@link BaseResource} and includes the core properties of a course.
 */
export interface ReviewResource extends BaseResource {
  id: number;
  tutorId: number;
  studentId: number;
  sessionId: number;
  score: number;
  comment: string;
  status: string;
  createdAt: string;
}

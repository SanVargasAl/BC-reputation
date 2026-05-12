import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of tutors.
 */
export interface TutorsResponse extends BaseResponse {
  /**
   * The list of tutors returned by the API.
   */
  tutors: TutorResource[];
}

/**
 * Represents the API resource/DTO for a tutor.
 */
export interface TutorResource extends BaseResource {
  id: number;
  fullName: string;
  university: string;
  averageScore: number;
  totalReviews: number;
}


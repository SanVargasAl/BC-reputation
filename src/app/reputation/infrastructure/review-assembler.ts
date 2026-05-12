import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Review } from '../domain/model/review.entity';
import { ReviewsResponse, ReviewResource } from './reviews-response';

export class ReviewAssembler implements BaseAssembler<Review, ReviewResource, ReviewsResponse> {

  toEntitiesFromResponse(response: ReviewsResponse): Review[] {
    console.log(response);
    return response.reviews.map((resource) => this.toEntityFromResource(resource as ReviewResource));
  }

  toEntityFromResource(resource: ReviewResource): Review {
    return new Review({
      id: resource.id,
      tutorId: resource.tutorId,
      studentId: resource.studentId,
      sessionId: resource.sessionId,
      score: resource.score,
      comment: resource.comment,
      status: resource.status,
      createdAt: resource.createdAt,
    });
  }

  toResourceFromEntity(entity: Review): ReviewResource {
    return {
      id: entity.id,
      tutorId: entity.tutorId,
      studentId: entity.studentId,
      sessionId: entity.sessionId,
      score: entity.score,
      comment: entity.comment,
      status: entity.status,
      createdAt: entity.createdAt,
    } as ReviewResource;
  }
}

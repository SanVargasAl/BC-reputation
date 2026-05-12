import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Review } from '../domain/model/review.entity';
import { ReviewResource, ReviewsResponse } from './reviews-response';
import { ReviewAssembler } from './review-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class ReviewsApiEndpoint extends BaseApiEndpoint<
  Review,
  ReviewResource,
  ReviewsResponse,
  ReviewAssembler
> {

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderReviewsEndpointPath}`,
      new ReviewAssembler(),
    );
  }
}

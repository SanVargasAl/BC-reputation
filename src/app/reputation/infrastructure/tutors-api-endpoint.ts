import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Tutor } from '../domain/model/tutor.entity';
import { TutorsResponse, TutorResource } from './tutors-response';
import { TutorAssembler } from './tutor-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class TutorsApiEndpoint extends BaseApiEndpoint<
  Tutor,
  TutorResource,
  TutorsResponse,
  TutorAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderTutorsEndpointPath}`,
      new TutorAssembler(),
    );
  }
}

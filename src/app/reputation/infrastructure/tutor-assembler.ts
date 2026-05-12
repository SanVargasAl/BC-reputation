import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Tutor } from '../domain/model/tutor.entity';
import { TutorsResponse, TutorResource } from './tutors-response';

export class TutorAssembler implements BaseAssembler<Tutor, TutorResource, TutorsResponse> {
  /**
   * Converts a CategoriesResponse to an array of Category entities.
   * @param response - The API response containing categories.
   * @returns An array of Category entities.
   */
  toEntitiesFromResponse(response: TutorsResponse): Tutor[] {
    return response.tutors.map((resource) =>
      this.toEntityFromResource(resource as TutorResource),
    );
  }

  /**
   * Converts a CategoryResource to a Category entity.
   * @param resource - The resource to convert.
   * @returns The converted Category entity.
   */
  toEntityFromResource(resource: TutorResource): Tutor {
    return new Tutor({
      id: resource.id,
      fullName: resource.fullName,
      university: resource.university,
      averageScore: resource.averageScore,
      totalReviews: resource.totalReviews,
    });
  }

  /**
   * Converts a Category entity to a CategoryResource.
   * @param entity - The entity to convert.
   * @returns The converted CategoryResource.
   */
  toResourceFromEntity(entity: Tutor): TutorResource {
    return {
      id: entity.id,
      fullName: entity.fullName,
      university: entity.university,
      averageScore: entity.averageScore,
      totalReviews: entity.totalReviews,
    } as TutorResource;
  }
}

/*
* id: number;
  fullName: string;
  university: string;
  averageScore: number;
  totalReviews: number;
* */

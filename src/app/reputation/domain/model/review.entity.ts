import { Tutor } from './tutor.entity';
import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Review implements BaseEntity {
  private _id: number;
  private _tutorId: number;
  private _studentId: number;
  private _sessionId: number;
  private _score: number;
  private _comment: string;
  private _status: string;
  private _createdAt: string;
  private _tutor: Tutor | null;

  /**
   * Creates a new instance of the Course class.
   *
   * @param review.id - The unique identifier for the course.
   * @param review.title - The title of the course.
   * @param review.description - The description of the course.
   * @param review.categoryId - The identifier of the category associated with the course.
   * @param review.category - (Optional) The category associated with the course.
   * @param review
   */
  constructor(review: {
    id: number;
    tutorId: number;
    studentId: number;
    sessionId: number;
    score: number;
    comment: string;
    status: string;
    createdAt: string;
    tutor?: Tutor | null;
  }) {
    this._id = review.id;
    this._tutorId = review.tutorId;
    this._studentId = review.studentId;
    this._sessionId = review.sessionId;
    this._score = review.score;
    this._comment = review.comment;
    this._status = review.status;
    this._createdAt = review.createdAt;
    this._tutor = review.tutor ?? null;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get tutorId(): number {
    return this._tutorId;
  }
  set tutorId(value: number) {
    this._tutorId = value;
  }

  get studentId(): number {
    return this._studentId;
  }
  set studentId(value: number) {
    this._studentId = value;
  }

  get sessionId(): number {
    return this._sessionId;
  }
  set sessionId(value: number) {
    this._sessionId = value;
  }

  get score(): number {
    return this._score;
  }
  set score(value: number) {
    this._score = value;
  }

  get comment(): string {
    return this._comment;
  }
  set comment(value: string) {
    this._comment = value;
  }

  get status(): string {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }
  set createdAt(value: string) {
    this._createdAt = value;
  }

  get tutor(): Tutor | null {
    return this._tutor;
  }

  set tutor(value: Tutor | null) {
    this._tutor = value;
  }
}

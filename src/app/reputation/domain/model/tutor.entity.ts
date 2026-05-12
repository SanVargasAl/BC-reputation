import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Tutor implements BaseEntity {
  private _id: number;
  private _fullName: string;
  private _university: string;
  private _averageScore: number;
  private _totalReviews: number;

  constructor(tutor: {
    id: number;
    fullName: string;
    university: string;
    averageScore: number;
    totalReviews: number;
  }) {
    this._id = tutor.id;
    this._fullName = tutor.fullName;
    this._university = tutor.university;
    this._averageScore = tutor.averageScore;
    this._totalReviews = tutor.totalReviews;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get fullName(): string {
    return this._fullName;
  }
  set fullName(value: string) {
    this._fullName = value;
  }

  get university(): string {
    return this._university;
  }
  set university(value: string) {
    this._university = value;
  }

  get averageScore(): number {
    return this._averageScore;
  }
  set averageScore(value: number) {
    this._averageScore = value;
  }

  get totalReviews(): number {
    return this._totalReviews;
  }
  set totalReviews(value: number) {
    this._totalReviews = value;
  }
}

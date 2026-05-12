import { Routes } from '@angular/router';

const reviewList = () => import('./review-list/review-list').then((m) => m.ReviewList);
const reviewForm = () => import('./review-form/review-form').then((m) => m.ReviewForm);
const tutorList = () => import('./tutor-list/tutor-list').then((m) => m.TutorList);
const tutorForm = () => import('./tutor-form/tutor-form').then((m) => m.TutorForm);

export const reputationRoutes: Routes = [
  { path: 'reviews', loadComponent: reviewList },
  { path: 'reviews/new', loadComponent: reviewForm },
  { path: 'reviews/edit/:id', loadComponent: reviewForm },
  { path: 'tutors', loadComponent: tutorList },
  { path: 'tutors/new', loadComponent: tutorForm },
  { path: 'tutors/edit/:id', loadComponent: tutorForm },
];

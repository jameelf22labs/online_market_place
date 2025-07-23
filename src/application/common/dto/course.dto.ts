export interface CreateCoursePayloadDto {
  title: string;
  description?: string;
  price: number;
  thumbnilUrl?: string;
  instructorId: string;
  categoryId: string;
}

export interface UpdateCoursePayloadDto {
  title: string;
  description: string;
  price: number;
  thumbnilUrl: string;
}

export interface CourseFilterParamDto {
  title: string;
  minPrice: number;
  maxPrice: number;
  instructorId: string;
  categoryId: string;
  page : number;
  limit : number
}

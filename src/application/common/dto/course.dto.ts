
export interface CreateCoursePayloadDto {
    title : string;
    description ?: string;
    price : number;
    thumbnilUrl ? : string;
    instructorId : string;
    categoryId : string
}

export interface UpdateCoursePayloadDto {
    title : string;
    description : string;
    price : number;
}
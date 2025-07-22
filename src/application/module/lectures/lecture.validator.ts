import Joi from "joi";



export const CreateLectureSchema = Joi.object({
    title : Joi.string().required(),
    courseId : Joi.string().required()
})

export const UpdateLectureSchema = Joi.object({
    title : Joi.string(),
    courseId : Joi.string()
})
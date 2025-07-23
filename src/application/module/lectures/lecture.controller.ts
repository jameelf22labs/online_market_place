import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../common/interface/AuthenticateRequest";
import { CreateLectureSchema } from "./lecture.validator";
import { BadRequestError } from "../../errors";
import path from "path";
import { extractVideoDuration } from "../../common/utils/extract.video.duration";
import { LecturePayloadDto, UpdateCoursePayloadDto } from "../../common/dto";
import { v4 as uuidv4 } from "uuid";
import LectureService from "./lecture.service";
import ApiResponse from "../../common/utils/ApiSucessResponse";
import { UpdateCourseSchema } from "../course/course.validator";

const LectureHandler = {
  create: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const validateLecture = await CreateLectureSchema.validateAsync(
        request.body
      );

      if (validateLecture?.error) {
        throw new BadRequestError(validateLecture?.error);
      }

      if (!request.file) {
        throw new BadRequestError("Lecture video is required");
      }

      const videoPath = path.join("uploads", request.file.filename);
      const duration = await extractVideoDuration(videoPath);

      const newLecture: LecturePayloadDto = {
        id: uuidv4(),
        title: request.body.title,
        videoUrl: request.file.filename,
        duration: duration,
        courseId: request.body.courseId,
      };

      const createdLecture = await LectureService.create(newLecture);

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Lecture Successfully Created")
        .setData(createdLecture)
        .send(201);
    } catch (error) {
      next(error);
    }
  },

  get: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
    } catch (error) {
      next(error);
    }
  },

  update: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const validateLecture = await UpdateCourseSchema.validateAsync(
        request.body
      );

      if (validateLecture?.error) {
        throw new BadRequestError(validateLecture?.error);
      }

      if (!request.file) {
        throw new BadRequestError("Lecture video is required");
      }

      const { lectureId } = request.params as { lectureId: string };

      const updateLecture: Partial<LecturePayloadDto> = {
        ...request.body,
      };

      if (request.file) {
        const videoPath = path.join("uploads", request.file.filename);
        const duration = await extractVideoDuration(videoPath);

        updateLecture.duration = duration;
        updateLecture.videoUrl = request.file.fieldname;
      }

      const updatedLecture = await LectureService.update(
        lectureId,
        updateLecture
      );

      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Lecture Successfully Updated")
        .setData(updatedLecture)
        .send(200);
    } catch (error) {
      next(error);
    }
  },

  delete: async (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { lectureId } = request.params as { lectureId: string };
      const deleteLecture = await LectureService.delete(lectureId);
      return new ApiResponse(response)
        .setStatus(true)
        .setMessage("Course Successfully Updated")
        .setData(deleteLecture)
        .send(200);
    } catch (error) {
      next(error);
    }
  },
};

export default LectureHandler;

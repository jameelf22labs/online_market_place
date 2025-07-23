import { LecturePayloadDto } from "../../common/dto";
import Lectures from "../../database/models/Lectures.model";
import { NotFoundError } from "../../errors";

const LectureService = {
  create: async (newLecture: LecturePayloadDto) => {
    const createdLecture = await Lectures.create({
      ...newLecture,
    });

    return {
      id: createdLecture.id,
      title: createdLecture.title,
      videoUrl: createdLecture.videoUrl,
      duration: createdLecture.duration,
    };
  },

  update: async (
    lectureId: string,
    updateLecture: Partial<LecturePayloadDto>
  ) => {
    const lecture = await Lectures.findByPk(lectureId);

    if (!lecture) {
      throw new NotFoundError("Your given edited lecture not found");
    }

    await Lectures.update(updateLecture, { where: { id: lectureId } });

    return {
      id: lectureId,
    };
  },

  delete: async (lectureId: string) => {
    const lecture = await Lectures.findByPk(lectureId);

    if (!lecture) {
      throw new NotFoundError("Your given deleted lecture not found");
    }

    await Lectures.destroy({ where: { id: lectureId } });

    return {
      id: lectureId,
    };
  },
};

export default LectureService;

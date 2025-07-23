import ffmpeg from "fluent-ffmpeg";

export const extractVideoDuration = (videoPath: string) => {
  return new Promise<number>((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) return reject(err);
      const seconds = metadata.format.duration || 0;
      resolve(seconds);
    });
  });
};

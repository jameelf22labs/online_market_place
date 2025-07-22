import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./bucket");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

export default storage;

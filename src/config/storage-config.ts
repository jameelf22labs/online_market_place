import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "bucket";

    if (file.mimetype.startsWith("image/")) {
      folder = path.join("bucket", "thumbnil");
    } else if (file.mimetype.startsWith("video/")) {
      folder = path.join("bucket", "lectures");
    }

    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "-");
    const uniqueName = `${name}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

export default storage;

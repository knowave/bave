import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';
import * as process from 'process';
import * as path from 'path';
dotenv.config();

export const s3 = new aws.S3({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: String(process.env.AWS_S3_ACCESS_KEY_AWS),
    secretAccessKey: String(process.env.AWS_S3_ACCESS_SECRET_AWS),
  },
});

const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

export const upload = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET || '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}.jpg`);
    },
  }),
});

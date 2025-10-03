import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const imageUploadToCloudinary = async (b64: string) => {
  try {
    const result = await cloudinary.uploader.upload(b64);
    console.log("Upload successful:", result.secure_url);
  } catch (error: any) {
    console.error("Upload failed:", error);
  }
};

const upload = multer({ storage });

export { upload, imageUploadToCloudinary };

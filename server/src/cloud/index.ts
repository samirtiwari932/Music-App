import {CLOUD_NAME, CLOUD_SECRET, CLOUD_kEY} from "#/utils/variables";
import {v2 as Cloudinary} from "cloudinary";
Cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_kEY,
  api_secret: CLOUD_SECRET,
  secure: true,
});

export default Cloudinary;

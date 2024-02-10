'use server'
import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET, 
});



export const uploadImage = async (id:string, image: File) => {
  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  fs.appendFileSync(id, Buffer.from(await image.arrayBuffer()));
  
  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(id, options);
    fs.unlinkSync(id);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("File uploading error");
  }
};
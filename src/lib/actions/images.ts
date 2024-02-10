'use server'
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_SECRET, 
// });

export async function uploadImage(id:string, image: File){
  const url = "https://api.cloudinary.com/v1_1/"+process.env.CLOUDINARY_NAME+"/image/upload";
  const ext = image.name.split(".")[1];
  const renamedImage = new File([image], id+`.${ext}`, {type: image.type});
  const formData = new FormData();
  formData.append("file", renamedImage);
  formData.append("upload_preset", process.env.CLOUDINARY_SECRET||"");

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData
    })
    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    throw new Error();
  }
};
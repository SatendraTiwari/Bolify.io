import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Contact } from "../models/contactSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const createContact = catchAsyncErrors(async (req, res, next) => {
    const {name , email, subject, message} = req.body;
    if( !name || !email || !subject || !message) {
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    let cloudinaryResponse = null;

      if (req.files && req.files.imageAttech) {
        const { imageAttech } = req.files;
        console.log("Image Attachment:", imageAttech);
    
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(imageAttech.mimetype)) {
          return next(new ErrorHandler("File format not supported", 400));
        }
    
        cloudinaryResponse = await cloudinary.uploader.upload(
          imageAttech.tempFilePath,
          {
            folder: "MERN_AUCTION_PLATFORM_CONTACTS",
          }
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.error(
            "Cloudinary error:",
            cloudinaryResponse.error || "Unknown cloudinary error"
          );
          return next(
            new ErrorHandler("Failed to upload profile image to cloudinary", 500)
          );
        }
      }

      console.log("Cloudinary Response:", cloudinaryResponse);


    const contact = await Contact.create({
        name,
        email,
        subject,
        message,
        imageAttech: cloudinaryResponse ? {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        } : undefined
    });

    if (!contact) {
        return next(new ErrorHandler("Failed to create contact", 500));
    }

    contact.save();

     // Send a success response
    res.status(201).json({
        success: true,
        message: "Contact created successfully",
        contact
    });
})
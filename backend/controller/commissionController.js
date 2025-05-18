import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";


export const calculateCommission = async (auctionId) => {
  const auction = await Auction.findById(auctionId);
  if (!mongoose.Types.ObjectId.isValid(auctionId)) {
    return next(new ErrorHandler("Invalid Auction Id format.", 400));
  }
  const commissionRate = 0.05;
  const commission = auction.currentBid * commissionRate;
  return commission;
};


export const proofOfCommission = catchAsyncErrors(async(req,resizeBy, next) => {
    let cloudinaryResponse = null;
    if(req.files || Object.keys(req.files).length == 0){
        return next(new ErrorHandler("Payment proof Screenshot required",400)); 
    }

    const {proof} = req.files;
    const {amount, comment} = req.body;
    const user = await User.findById(req.user._id);

    if(!amount || !comment){
        return next(new ErrorHandler("Amount & comment are required fields",400))
    }

    if(user.unpaidCommission == 0){
        return resizeBy.status(200).json({
            success : true,
            message : "You don't have any unpaid commissions",
        })
    }

    if(user.unpaidCommission >  amount){
        return next(new ErrorHandler(`The amount exceeds your unpaid commission balence. Please enter an amount up to ${user.unpaidCommission}`,403))
    };

     const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(proof.mimetype)) {
          return next(new ErrorHandler("Sreenshot format not supported", 400));
        }

    cloudinaryResponse = await cloudinary.uploader.upload(
        proof.tempFilePath,
        {
            folder: "MERN_AUCTION_PAYMENT_PROOFs"
        }
    )

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error(
            "Cloudinary error :",
            cloudinaryResponse.error || "Unknown cloudinary error."
        );

        return next(
            new ErrorHandler("Failed to upload payment proof image to cloudinary.", 500)
        );
    }

    const commissionProof = await PaymentProof.create({
        userId : req.user._id,
        proof: {
            public_id : cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
        amount, 
        comment,
    });

    resizeBy.status(201).json({
        success: true,
        message: "Your proof has been submitted successfully. we will review it and responed to you within 24   hours.",
        commissionProof,
    })

})
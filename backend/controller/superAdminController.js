import mongoose from 'mongoose';
import {catchAsyncErrors} from '../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import {Commission} from "../models/commissionSchema.js"
import {User} from '../models/userSchema.js';
import {Auction} from '../models/auctionSchema.js'
import { PaymentProof } from '../models/commissionProofSchema.js';

export const deleteAuctionItem = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params;
    console.log(id);
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invlaid id Format.",400));
    }

    const auctionItem = await Auction.findById(id)
    console.log(auctionItem);
    if(!auctionItem){
        return next(new ErrorHandler("Auction is not found.",404));
    }

    await auctionItem.deleteOne();

    res.status(200).json({
        success: true,
        message: "Auction item deleted is Successfully ",
    })
})


export const getAllPaymentProofs = catchAsyncErrors(async(req,res,next) => {
    let paymentProofs = await PaymentProof.find();

    res.status(200).json({
        success : true,
        paymentProofs,
    })
})

export const getPaymentProofDetail = catchAsyncErrors(async (req,res,next) => {
    const {id} = req.params;
    const paymentProofsDetail = await PaymentProof.findById(id);
    res.status(200).json({
        success: true,
        paymentProofsDetail,
    })
})


export const updataProofStatus = catchAsyncErrors(async (req,res,next) => {
    const {id} = req.params;
    const {amount, status} = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("In Valid Id format",400))
    }

    let proof = await PaymentProof.findById(id);

    if(!proof){
        return next(new ErrorHandler("Payment Proof not found", 400));
    }

    proof = await PaymentProof.findByIdAndUpdate(id,{
        status,amount
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Payment Proof and Status Update"
    })

})



export const deletePaymentProof = catchAsyncErrors(async (req,res,next) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invalid ID formate"));
    }

    const proof = await PaymentProof.findById(id);

    if(!proof){
        return next(ErrorHandler("Payment is not Exist"),404);
    }

    await proof.deleteOne();

    res.status(200).json({
        success: true,
        message: "Payment Proof deleted",
    })

})
 


export const fetchAllUsers = catchAsyncErrors( async (req, res, next) => {
    const users = await User.aggregate([
        {
            $group : {
                _id : {
                    month: {$month : "$createAt"},
                    year: {$year: "$createAt"},
                    role: "$role",
                },
                count: {$sum: 1}
            },
        },
        {
            $project: {
                month: "$_id.month",
                year: "$_id.year",
                role: "$_id.role",
                count: 1,
                _id: 0,

            }
        }
    ]);

    const bidder = users.filter((user) => user.role == "Bidder");
    const auctioneers = users.filter((user) => user.role == "Auctioneer");

    const tranformDataToMonthArray = (data,totalMonths = 12) => {
        const result = Array(totalMonths).fill(0);

        data.forEach((item) => {
            result[item.month - 1] = item.count;
        })

        return result;
    }

    const bidderArray = tranformDataToMonthArray(bidder);
    const auctioneerArray = tranformDataToMonthArray(auctioneers);

    res.status(200).json({
        success: true,
        bidderArray,
        auctioneerArray,
    })
})



export const monthlyRevenue = catchAsyncErrors(async (req,res,next) => {
    const payments = await Commission.aggregate([
        {
            $group: {
                _id: {
                    month: {$month : "$createAt"},
                    year: {$year : "$craeteAt"}
                },
                totalAmount : {$sum : "$amount"},
            },
        },
        {
            $sort: {"_id.year" : 1, "_id.month": 1},
        },
    ]);


    const tranformDataToMonthArray = (payments, totalMonths = 12) => {
        const result = Array(totalMonths).fill(0);

        payments.forEach((payment) => {
            result[payment._id.month - 1] = payment.totalAmount;
        })

        return result
    }

    const totalMouthlyRevenue = tranformDataToMonthArray(payments)
    console.log(totalMouthlyRevenue);

    res.status(200).json({
        success: true,
        totalMouthlyRevenue,
    })
})
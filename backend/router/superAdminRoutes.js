import express from 'express';
import {isAuthenticated,isAuthorized} from '../middlewares/auth.js';
import {
    deleteAuctionItem,
    getAllPaymentProofs,
    getPaymentProofDetail,
    updataProofStatus,
    fetchAllUsers,
    monthlyRevenue
} from "../controller/superAdminController.js";


const router = express.Router();


router.get("/paymentproofs/getall", isAuthenticated, isAuthorized('Super Admin'), getAllPaymentProofs);

router.get("/paymentproof/:id",isAuthenticated, isAuthorized('Super Admin'), getPaymentProofDetail);

// Auction item delete 

router.delete("/auctionitem/delete/:id", isAuthenticated, isAuthorized('Super Admin'), deleteAuctionItem);

// user fectch 

router.get("/users/getall", isAuthenticated, isAuthorized('Super Admin'), fetchAllUsers);

router.put("/paymentproof/status/update/:id",isAuthenticated, isAuthorized('Super Admin'), updataProofStatus);

router.get("/monthlyincome",isAuthenticated, isAuthorized('Super Admin'), monthlyRevenue);

export default router;



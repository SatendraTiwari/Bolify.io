import React, { useEffect, useState } from 'react';
import { postCommissionProof } from '@/store/slice/commissionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Upload, MessageSquare, FileCheck } from 'lucide-react';

const SubmitCommission = () => {
    const [proof, setProof] = useState("");
    const [proofPreview, setProofPreview] = useState("");
    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    const {isAuthenticated,user} = useSelector(state => state.user);


    useEffect(() => {
        if(!isAuthenticated){
          navigate('/');
        }
      },[isAuthenticated])

    const proofHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProof(file);
            // Create preview URL for the image
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProofPreview(reader.result);
            };
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(state => state.commission);

    const handlePaymentProof = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("proof", proof);
        formData.append('amount', amount);
        formData.append('comment', comment);
        console.log(formData);
        dispatch(postCommissionProof(formData));
    };

    return (
        <section className="w-full min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:pl-[320px]">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-8">
                <div className="flex items-center mb-6">
                    <div className="h-12 w-2 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Submit Commission Proof
                    </h1>
                </div>
                <p className="text-gray-600 ml-4">
                    Upload your payment receipt and provide details about your commission payment.
                </p>
            </div>

            {/* Form Card */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
                <div className="p-6 sm:p-8">
                    <form className="space-y-6" 
                    onSubmit={handlePaymentProof}>
                        {/* Amount Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <DollarSign size={18} className="text-orange-500 mr-2" />
                                Payment Amount
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter payment amount"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                                required
                            />
                        </div>

                        {/* File Upload Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <FileCheck size={18} className="text-orange-500 mr-2" />
                                Payment Proof
                            </label>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                <div className="p-4">
                                    <label htmlFor="proof-upload" className="flex flex-col items-center justify-center cursor-pointer">
                                        {proofPreview ? (
                                            <div className="w-full flex flex-col items-center">
                                                <img
                                                    src={proofPreview}
                                                    alt="Payment proof"
                                                    className="max-h-64 object-contain mb-4 rounded border border-gray-200"
                                                />
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <Upload size={14} className="mr-1" />
                                                    Click to change image
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-6">
                                                <div className="mb-3 p-3 bg-orange-50 rounded-full">
                                                    <Upload size={24} className="text-orange-500" />
                                                </div>
                                                <p className="mb-2 text-sm font-medium text-gray-700">
                                                    Upload your payment screenshot
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG or PDF (Max 5MB)
                                                </p>
                                            </div>
                                        )}
                                        <input
                                            id="proof-upload"
                                            type="file"
                                            accept="image/*,.pdf,.jpg,.jpeg"
                                            onChange={proofHandler}
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>

                            {proof && (
                                <p className="text-xs text-gray-600 flex items-center">
                                    <FileCheck size={14} className="text-green-500 mr-1" />
                                    {proof.name} ({(proof.size / 1024).toFixed(1)} KB)
                                </p>
                            )}
                        </div>

                        {/* Comment Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <MessageSquare size={18} className="text-orange-500 mr-2" />
                                Additional Comments
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={5}
                                placeholder="Add any details about your payment here..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} className="mr-2" />
                                        Submit Payment Proof
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SubmitCommission;
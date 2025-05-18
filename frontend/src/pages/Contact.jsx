import React, { useState } from 'react'
import { SiNamebase } from 'react-icons/si';

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(false);

    const handleContactForm = () => {

    }
    return (
        <section className="w-full min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:pl-[320px] mt-10">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-8">
                <div className="flex items-center mb-6">
                    <div className="h-12 w-2 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4"></div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Contact
                    </h1>
                </div>
                <p className="text-gray-600 ml-4">
                    Upload your Personal details.
                </p>
            </div>

            {/* Form Card */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
                <div className="p-6 sm:p-8">
                    <form className="space-y-6"
                        onSubmit={handleContactForm}>
                        {/* Amount Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <SiNamebase size={18} className="text-orange-500 mr-2" />
                                Name
                            </label>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setName(e.target.value)}
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
                                    
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Comment Field */}
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <MessageSquare size={18} className="text-orange-500 mr-2" />
                                Additional Message
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setMessage(e.target.value)}
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
                                        Message Sending...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} className="mr-2" />
                                        Message Send
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
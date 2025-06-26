import { contact } from '@/store/slice/contactSlice';
import { FileCheck, MessageSquare, Upload, User, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { MdSubject } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        subject: "",
    });

    const { loading } = useSelector((state) => state.contact);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
    const [subject, setSubject] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }

        // Clear submit status
        if (submitStatus) {
            setSubmitStatus(null);
        }
    };

    const handleContactForm = async (e) => {
        e.preventDefault();
        const formatDataToSed = new FormData();
        formatDataToSed.append('name', formData.name);
        formatDataToSed.append('email', formData.email);
        formatDataToSed.append('subject', formData.subject);
        formatDataToSed.append('message', formData.message);

        formatDataToSed.append('imageAttech', selectedFile);

        if(validateForm()){
            dispatch(contact(formatDataToSed));
        }
    };

    const imageHandler = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            // Validate file size (5MB limit)
            if (selectedImage.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB");
                return;
            }

            // Validate file type
            if (!selectedImage.type.startsWith('image/')) {
                alert("Please select a valid image file");
                return;
            }

            setSelectedFile(selectedImage);
            setImagePreview(URL.createObjectURL(selectedImage));
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        // Clear the file input
        const fileInput = document.getElementById('dropzone-file');
        if (fileInput) fileInput.value = '';
    };

    return (
        <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 px-4 sm:px-6 lg:pl-[320px]">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-16 w-1 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-4 animate-pulse"></div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                            Get In Touch
                        </h1>
                        <div className="h-16 w-1 bg-gradient-to-b from-red-600 to-orange-500 rounded-full ml-4 animate-pulse"></div>
                    </div>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <div className="mb-8 mx-auto max-w-3xl">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 animate-fade-in">
                            <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="text-green-800 font-medium">Message sent successfully!</h3>
                                <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                            </div>
                        </div>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="mb-8 mx-auto max-w-3xl">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 animate-fade-in">
                            <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="text-red-800 font-medium">Failed to send message</h3>
                                <p className="text-red-600 text-sm">Please try again or contact us directly.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Card */}
                <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden mb-16">
                    <div className="p-8 sm:p-10">
                        <form onSubmit={handleContactForm} className="space-y-8">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <User size={18} className="text-orange-500 mr-2" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                                        }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle size={14} className="mr-1" />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <MdSubject size={18} className="text-orange-500 mr-2" />
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => handleInputChange('subject', e.target.value)}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                                        }`}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle size={14} className="mr-1" />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <Mail size={18} className="text-orange-500 mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter your email address"
                                    className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl focus:outline-none transition-all duration-300 ${errors.email
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle size={14} className="mr-1" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* File Upload Field */}
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Attachment (Optional)
                                </label>

                                <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50/50 hover:bg-gray-100/50 transition-all duration-300 hover:border-orange-300">
                                    <div className="p-6">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center cursor-pointer">
                                            {imagePreview ? (
                                                <div className="w-full flex flex-col items-center">
                                                    <div className="relative group">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Upload preview"
                                                            className="max-h-64 max-w-full object-contain rounded-lg shadow-md"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={removeImage}
                                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-3">{selectedFile?.name}</p>
                                                    <p className="text-xs text-gray-400">Click to change image</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-8">
                                                    <div className="mb-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
                                                        <Upload size={32} className="text-orange-500" />
                                                    </div>
                                                    <p className="mb-2 text-sm font-medium text-gray-700">
                                                        Drag and drop or click to upload
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, GIF up to 5MB
                                                    </p>
                                                </div>
                                            )}
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                accept="image/*"
                                                onChange={imageHandler}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Message Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <MessageSquare size={18} className="text-orange-500 mr-2" />
                                    Your Message
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => handleInputChange('message', e.target.value)}
                                    rows={6}
                                    placeholder="Tell us how we can help you..."
                                    className={`w-full px-4 py-4 bg-gray-50/50 border-2 rounded-xl focus:outline-none transition-all duration-300 resize-none ${errors.message
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
                                        }`}
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle size={14} className="mr-1" />
                                        {errors.message}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.message.length}/500 characters
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} className="mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Contact Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/80 transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="text-white" size={20} />

                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                        <a href='veeru895920@gmail.com' className="text-gray-600 text-sm">veeru895920@gmail.com</a>
                    </div>

                    {/* Add Some Chet bot Link Solve the Problem  automatically */}
                    {/* Some Help Center Number */}

                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>
        </section>
    );
};

export default Contact;
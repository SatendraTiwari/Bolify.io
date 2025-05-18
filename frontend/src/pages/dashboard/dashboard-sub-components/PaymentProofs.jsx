import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  Check, 
  X, 
  AlertCircle, 
  FileCheck, 
  Trash2, 
  Edit3,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  UserCircle,
  MessageSquare,
  ExternalLink,
  ArrowLeft
} from "lucide-react";
import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "../../../store/slice/superAdminSlice";
import { FaRupeeSign } from "react-icons/fa";

// Status badge component
const StatusBadge = ({ status }) => {
  const getBadgeClasses = () => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Settled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      case "Settled":
        return <FileCheck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getBadgeClasses()}`}>
      {getStatusIcon()}
      {status}
    </span>
  );
};

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handlePaymentProofDelete = (id) => {
    if (confirmDelete === id) {
      dispatch(deletePaymentProof(id));
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  // Cancel delete confirmation
  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-800 text-white">
            <h2 className="text-2xl font-bold flex items-center">
              <FileCheck className="mr-2" />
              Payment Proofs Management
            </h2>
            <p className="text-gray-300 mt-1">
              View and manage payment proof submissions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(paymentProofs) && paymentProofs.length > 0 ? (
                  paymentProofs.map((element, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <UserCircle className="mr-2 text-gray-400" />
                          <div className="text-sm font-medium text-gray-900">
                            {element.userId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={element.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition flex items-center"
                            onClick={() => handleFetchPaymentDetail(element._id)}
                          >
                            <Edit3 className="w-4 h-4 mr-1" />
                            Update
                          </button>
                          
                          {confirmDelete === element._id ? (
                            <div className="flex space-x-1">
                              <button
                                className="bg-red-500 text-white px-2 py-1.5 rounded-md hover:bg-red-600 transition flex items-center"
                                onClick={() => handlePaymentProofDelete(element._id)}
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                className="bg-gray-300 text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-400 transition flex items-center"
                                onClick={cancelDelete}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100 transition flex items-center"
                              onClick={() => handlePaymentProofDelete(element._id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No Payment Proofs Found</h3>
                        <p className="text-gray-500 mt-1">No payment proof requests have been submitted yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </div>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (singlePaymentProof) {
      setAmount(singlePaymentProof.amount || "");
      setStatus(singlePaymentProof.status || "");
    }
  }, [singlePaymentProof]);
  
  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "Approved": return "bg-green-500";
      case "Rejected": return "bg-red-500";
      case "Settled": return "bg-blue-500";
      default: return "bg-yellow-500";
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 ${
        openDrawer && singlePaymentProof.userId ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            openDrawer && singlePaymentProof.userId ? "sm:translate-y-0 opacity-100" : "sm:translate-y-4 opacity-0"
          }`}
        >
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <Edit3 className="mr-2 text-gray-500" />
              Update Payment Proof
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setOpenDrawer(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={singlePaymentProof.userId || ""}
                    disabled
                    className="bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Settled">Settled</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    rows={4}
                    value={singlePaymentProof.comment || ""}
                    disabled
                    className="bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-col sm:gap-3">
            {singlePaymentProof.proof?.url && (
              <Link
                to={singlePaymentProof.proof.url}
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                target="_blank"
              >
                <ExternalLink className="mr-2 h-5 w-5 text-gray-500" />
                View Payment Proof Screenshot
              </Link>
            )}
            
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={handlePaymentProofUpdate}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Payment Proof
                </span>
              ) : (
                <span className="flex items-center">
                  <Check className="mr-2 h-5 w-5" />
                  Update Payment Proof
                </span>
              )}
            </button>
            
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setOpenDrawer(false)}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';

const Notification = ({ showModal, setShowModal, title, message, onClose }) => {

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              {/* Title and Close Button */}
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">{title}</p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    onClose();
                  }}
                  className="modal-close cursor-pointer z-50"
                >
                  <span className="text-3xl">&times;</span>
                </button>
              </div>

              {/* Message */}
              <div className="pb-6">
                <p className="text-gray-700">{message}</p>
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => {
                    setShowModal(false);
                    onClose();
                  }}
                  className="btn-dark text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;

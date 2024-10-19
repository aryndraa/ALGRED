import { useState, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import {Fetching} from "../../../api/BlynkApi"

export const Notif = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); // State untuk jumlah notifikasi

  const {optimalPH} = Fetching()
  // Simulasi perubahan nilai
  const value = optimalPH; 

  useEffect(() => {
    if (value === 0) {
      setNotificationCount( 1); // Tambah jumlah notifikasi
    } else if (value === 1) {
      setNotificationCount(0); // Reset jumlah notifikasi menjadi 0
    }
  }, [value]); // Effect ini akan dipanggil saat value berubah

  const handleShowNotif = () => {
    setShowNotif(!showNotif);
  };

  return (
    <>
      <div>
        <button
          className="text-3xl relative flex"
          onClick={handleShowNotif}
        >
          <IoMdNotificationsOutline />
          {notificationCount > 0 && (
            <div className="h-3 w-3 bg-alert rounded-full absolute top-0 right-[1%]"></div>
          )}
        </button>

        <AnimatePresence>
          {showNotif && (
            <motion.div
              className={`fixed z-10 top-0 left-0 right-0 bottom-0 justify-center py-5 px-4 bg-black/20 flex md:items-center`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="max-h-[75vh] md:w-[30rem] w-full bg-white rounded-lg p-7 shadow-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-center text-2xl font-medium mb-6">
                  Notification
                </h2>
                <ul className="flex flex-col gap-6 max-h-[62%] h-[62%] overflow-scroll overflow-x-hidden mb-4">
                  {Array.from({ length: notificationCount }, (_, index) => (
                    <li key={index} className="border-b border-neutral-200 pb-4 text-lg flex items-center gap-3">
                      <span className="text-alert">
                        <IoAlertCircleOutline />
                      </span>
                      pH Not Optimal
                    </li>
                  ))}
                </ul>
                <button
                  className="px-6 p-2 rounded-lg bg-primary text-white font-medium float-end"
                  onClick={handleShowNotif}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

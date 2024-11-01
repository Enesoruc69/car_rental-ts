import { CarType } from "../../types";
import { AnimatePresence, motion } from "framer-motion";
import generateImage from "../../utils/generateImage";
import Images from "./Images";

interface Props {
  car: CarType;
  isOpen: boolean;
  close: () => void;
}
const Modal = ({ car, isOpen, close }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 grid place-items-center ">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white relative p-6 max-w-lg max-h-[90vh] rounded-2xl flex flex-col gap-5 shadow-xl overflow-auto"
          >
            <button
              className="cursor-pointer p-1 absolute end-1 top-1 z-10 bg-white rounded-full"
              onClick={close}
            >
              <img src="/close.svg" />
            </button>

            {/* fotoğraflar */}
            <Images car={car} />

            {/* bilgiler */}
            {Object.entries(car).map(([key, value]) => (
              <div className="flex justify-between">
                <h4 className="capitalize">{key.split("_").join(" ")}</h4>
                <p className="font-semibold capitalize">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
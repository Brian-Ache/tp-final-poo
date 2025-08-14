import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ModalMotivo({ isOpen, onClose, onConfirm }) {
  const [motivo, setMotivo] = useState("");

  const handleConfirm = () => {
    if (motivo.trim()) {
      onConfirm(motivo);
      setMotivo("");
      onClose();
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
                Motivo de devolución
              </Dialog.Title>
              <input
                type="text"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                placeholder="Escribí el motivo..."
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition cursor-pointer "
                >
                  Confirmar
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-400 text-grey-800 rounded hover:bg-gray-500 transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

// Modal.js
import React, { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import useProxmox from "../../config/Store";
const ModalForm = ({ images, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isoOptions, setIsoOptions] = useState([]);
  const { register, handleSubmit, control, reset } = useForm();
  const promoxClient = useProxmox((state) => state.proxmoxClient);
  useMemo(() => {
    setIsoOptions(images);
  }, [images]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCreate = (data) => {
    console.log(data);
    promoxClient
      .createVM(
        "org",
        data.idMachine,
        data.machineName,
        "local:iso/ubuntu-22.04.3-live-server-amd64.iso"
      )
      .then((res) => {
        reset();
        refetch();
        closeModal();
      });
  };

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4">
        Open Modal
      </button>

      {isOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-end">
              <button onClick={closeModal} className="text-gray-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form
                className="w-full max-w-lg"
                onSubmit={handleSubmit(handleCreate)}
              >
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Machine Name
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Machine Name"
                      {...register("machineName", { required: true })}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Node
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Node"
                      {...register("node", { required: true })}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Id Machine
                    </label>
                    <input
                      class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                      {...register("idMachine", { required: true })}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
                    >
                      Iso
                    </label>

                    <Controller
                      name="iso"
                      control={control}
                      render={({ field }) => (
                        <select
                          defaultValue="local:iso/ubuntu-22.04.3-live-server-amd64.iso"
                          {...field}
                          key={field.length}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          {isoOptions.map((iso) => (
                            <option key={iso.name} value={iso.image}>
                              {iso.name}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </div>
                  <div className="flex items-center border-b m-auto py-2">
                    {/* center button with info color */}
                    <button
                      className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;

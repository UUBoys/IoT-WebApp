/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";

import Button from "../components/Button";

export interface AddNewDeviceValues {
  name: string;
  description: string;
  deviceId: string;
}

interface IAddNewDeviceModalProps {
  addNewDevice: (data: AddNewDeviceValues) => Promise<void>;
  defaultError?: string;
  closeModal: () => void;
}

const AddNewDeviceModal: React.FC<IAddNewDeviceModalProps> = ({
  addNewDevice,
  defaultError,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm<AddNewDeviceValues>();

  return (
    <div className="flex w-full flex-col items-center gap-32  align-top">
      <div className="flex  w-full flex-col items-start rounded-lg bg-gray-700 text-center  shadow-xl">
        <form
          onSubmit={handleSubmit(addNewDevice)}
          className="flex w-full flex-col gap-5 p-10 pb-20"
        >
          <h1 className="text-3xl font-bold text-white">
            Přidat nové zařízení
          </h1>
          <div className="space-y-4 text-start md:space-y-6">
            {" "}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium !text-white"
              >
                Název
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Název zařízení"
                className="!focus:ring-blue-500 !focus:border-blue-500 block w-full rounded-lg border !border-gray-600 !bg-gray-700 p-2.5 !text-white !placeholder-gray-400 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium !text-white"
              >
                Popis zařízení
              </label>
              <textarea
                id="description"
                rows={5}
                {...register("description")}
                placeholder="Popis zařízení"
                className="!focus:ring-blue-500 !focus:border-blue-500 block w-full rounded-lg border !border-gray-600 !bg-gray-700 p-2.5 !text-white !placeholder-gray-400 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="deviceId"
                className="mb-2 block text-sm font-medium !text-white"
              >
                Unikátní Kód
              </label>
              <input
                type="text"
                id="deviceId"
                {...register("deviceId")}
                placeholder="Unikátní kód zařízení"
                className="!focus:ring-blue-500 !focus:border-blue-500 block w-full rounded-lg border !border-gray-600 !bg-gray-700 p-2.5 !text-white !placeholder-gray-400 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
              />
            </div>
            {defaultError !== "" && (
              <p className="mt-2 text-xl italic text-red-500">{defaultError}</p>
            )}
          </div>

          <div className="flex w-full items-center justify-center gap-6">
            <div className="flex gap-5 text-end">
              <Button type="submit" size="lg" className="w-20">
                Uložit
              </Button>
            </div>
            <div className="flex gap-5 text-end">
              <Button
                onClick={closeModal}
                type="button"
                size="lg"
                color="danger"
                className="w-20"
              >
                Uložit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewDeviceModal;

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
      <div className="flex  w-full flex-col items-start rounded-lg bg-white text-center  shadow-xl">
        <form
          onSubmit={handleSubmit(addNewDevice)}
          className="flex w-full flex-col gap-5 p-10"
        >
          <h1 className="text-3xl font-bold text-black">
            Přidat nové zařízení
          </h1>
          <div className="space-y-4 text-start md:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium !text-gray-300"
              >
                Název
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                placeholder="Název zařízení"
                className=" block w-full rounded-lg border border-background-100 !bg-background-50 p-2.5 !text-black !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium !text-gray-300"
              >
                Popis zařízení
              </label>
              <textarea
                id="description"
                rows={5}
                {...register("description")}
                placeholder="Popis zařízení"
                className=" block w-full rounded-lg border border-background-100 !bg-background-50 p-2.5 !text-black !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="deviceId"
                className="mb-2 block text-sm font-medium !text-gray-300"
              >
                Unikátní Kód
              </label>
              <input
                type="text"
                id="deviceId"
                {...register("deviceId")}
                placeholder="Unikátní kód zařízení"
                className=" block w-full rounded-lg border border-background-100 !bg-background-50 p-2.5 !text-black !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none"
              />
            </div>
            {defaultError !== "" && (
              <p className="mt-2 text-xl italic text-red-500">{defaultError}</p>
            )}
          </div>

          <div className="flex w-full items-center justify-end gap-6 mt-[30px]">
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
                Zrušit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewDeviceModal;

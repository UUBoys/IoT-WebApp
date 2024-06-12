/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import clsx from "clsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMemo } from "react";
import Autocomplete from "../components/Autocomplete";
import { usePlantTypes as usePlantTypes } from "../hooks/QueryHooks/usePlantTypes";

export interface AddNewDeviceValues {
  name: string;
  description: string;
  deviceId: string;
  imageUrl?: string;
  image?: File;
  type?: string;
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
  const { register, handleSubmit, watch, setValue } =
    useForm<AddNewDeviceValues>();
  const watchedImageUrl = watch("imageUrl");
  const { plantTypes } = usePlantTypes();

  const watchedImageUrlPreview = useMemo(() => {
    if (watchedImageUrl && watchedImageUrl[0]) {
      return URL.createObjectURL(watchedImageUrl[0] as any);
    }
    return null;
  }, [watchedImageUrl]);

  return (
    <div className="flex w-full flex-col items-center gap-32  align-top">
      <div className="flex  w-full flex-col items-start rounded-lg bg-white text-center  shadow-xl">
        <form
          onSubmit={handleSubmit((data) =>
            addNewDevice({
              ...data,
              image: watchedImageUrl && (watchedImageUrl[0] as unknown as any),
            })
          )}
          className="flex w-full flex-col gap-5 p-10"
        >
          <h1 className="text-3xl font-bold text-black">
            Přidat nové zařízení
          </h1>
          <div className="space-y-4 text-start md:space-y-6">
            <label
              htmlFor="club-cover-picture"
              style={{ backgroundImage: `url(${watchedImageUrlPreview})` }}
              className={clsx(
                "relative flex h-3/5 min-h-[30vh] w-full cursor-pointer flex-col items-center justify-center rounded-t-lg bg-gray-200 bg-cover text-center text-2xl font-semibold text-gray-500"
              )}
            >
              <CloudUploadIcon className="h-20 w-20 text-gray-500" />
              Nahrát fotku
              <input
                className="hidden"
                id="club-cover-picture"
                type="file"
                multiple={false}
                {...register("imageUrl")}
                hidden
              />
              {watchedImageUrl && (
                <div className="absolute inset-0 bg-black/40" />
              )}
            </label>
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
              <label className="mb-2 block text-sm font-medium !text-gray-300">
                Typ květiny 🌺
              </label>
              <Autocomplete
                options={
                  plantTypes?.map((plantType) => ({
                    label: plantType ?? "",
                    value: plantType ?? "",
                  })) ?? []
                }
                onChange={(option) => {
                  console.log(option);
                  setValue("type", option?.value);
                }}
                className="!focus:ring-blue-500 !focus:border-blue-500 block w-full rounded-lg  !bg-transparent  !text-white !placeholder-gray-400 sm:text-sm"
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
                className=" block w-full rounded-lg border border-background-100 !bg-background-50 p-2.5 !text-black !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none resize-none"
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

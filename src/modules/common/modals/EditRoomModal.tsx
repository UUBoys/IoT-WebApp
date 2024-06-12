/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";

import Button from "../components/Button";

export interface IEditRoomValues {
  name: string;
}

interface IEditRoomModalProps {
  editRoom: (data: IEditRoomValues) => Promise<void>;
  defaultError?: string;
  defaultValues?: IEditRoomValues;
  closeModal: () => void;
}

const EditRoomModal: React.FC<IEditRoomModalProps> = ({
  editRoom,
  defaultError,
  closeModal,
  defaultValues,
}) => {
  const { register, handleSubmit } = useForm<IEditRoomValues>({
    defaultValues,
  });

  return (
    <div className="flex w-full flex-col items-center  align-top">
      <div className="flex  w-full flex-col items-start rounded-lg bg-white text-center  shadow-xl">
        <form
          onSubmit={handleSubmit(editRoom)}
          className="flex w-full flex-col gap-5 p-10"
        >
          <h1 className="text-3xl font-bold text-black">Upravit místnost</h1>
          <div className="space-y-4 text-start md:space-y-6">
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
                Upravit
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

export default EditRoomModal;

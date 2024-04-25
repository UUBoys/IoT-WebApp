/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from "react-hook-form";

import Button from "../components/Button";

export interface ICreateNewRoomValues {
  name: string;
}

interface ICreateNewRoomModalProps {
  createNewRoom: (data: ICreateNewRoomValues) => Promise<void>;
  defaultError?: string;
  closeModal: () => void;
}

const CreateNewRoomModal: React.FC<ICreateNewRoomModalProps> = ({
  createNewRoom,
  defaultError,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm<ICreateNewRoomValues>();

  return (
    <div className="flex w-full flex-col items-center gap-32  align-top">
      <div className="flex  w-full flex-col items-start rounded-lg bg-gray-700 text-center  shadow-xl">
        <form
          onSubmit={handleSubmit(createNewRoom)}
          className="flex w-full flex-col gap-5 p-10 pb-20"
        >
          <h1 className="text-3xl font-bold text-white">
            Vytvořit novou místnost
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
            {defaultError !== "" && (
              <p className="mt-2 text-xl italic text-red-500">{defaultError}</p>
            )}
          </div>

          <div className="flex w-full items-center justify-center gap-6">
            <div className="flex gap-5 text-end">
              <Button type="submit" size="lg" className="w-20 !bg-green-500">
                Vytvořit
              </Button>
            </div>
            <div className="flex gap-5 text-end">
              <Button
                onClick={closeModal}
                type="button"
                size="lg"
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

export default CreateNewRoomModal;

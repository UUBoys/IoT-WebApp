import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import clsx from "clsx";
import { useState } from "react";

import AddNewDeviceModal, {
  AddNewDeviceValues,
} from "../../modals/AddNewDeviceModal";
import { useModalStore } from "../../stores/modal-store";
import Button from "../Button";
import DeviceCard from "../DeviceCard";

import { uuid } from "@/modules/helpers/general";
import { IRoom } from "@/modules/utils/schemas/room";
import { usePairPlant } from "../../hooks/MutationHooks/usePairPlant";
import { toast } from "react-toastify";

interface IRoomWithPlantsProps {
  room: IRoom;
  className?: string;
  refetchRooms?: () => void;
}

const RoomWithPlants: React.FC<IRoomWithPlantsProps> = ({
  room: { plants: devices, name },
  refetchRooms,
  className = "",
}) => {
  // console.log("RoomWithPlants", devices);
  const [defaultError, setDefaultError] = useState("");
  const { openModal, closeModal } = useModalStore((s) => ({
    openModal: s.openModal,
    closeModal: s.closeModal,
  }));
  const { pairPlantAsync } = usePairPlant();

  const addNewDevice = async (deviceValues: AddNewDeviceValues) => {
    console.log("Add new device", deviceValues);
    try {
      await pairPlantAsync("plant", deviceValues.name, deviceValues.deviceId);
      refetchRooms && refetchRooms();
      closeModal();
      toast.success("Kytička se vytvořila úspěšně!");
    } catch (error: any) {
      toast.error(error || "Něco se pokazilo!");
    }
  };

  const openEditAppModal = () => {
    openModal({
      isClosable: false,
      content: (
        <AddNewDeviceModal
          closeModal={closeModal}
          addNewDevice={addNewDevice}
          defaultError={defaultError}
        />
      ),
    });
  };

  return (
    <div
      className={clsx(
        className,
        " h-full w-full py-2 px-4 bg-white rounded-lg shadow-xl"
      )}
    >
      <div className="flex w-full flex-col justify-between h-full flex-1">
        <h1 className="text-3xl text-black font-bold">{name}</h1>
        <Button
          color="primary"
          className="!h-10 bg-gray-700 !px-3 text-sm w-fit"
          size="md"
          onClick={openEditAppModal}
        >
          <div className="flex items-center !gap-2 ">
            <AddCircleOutlineIcon className="h-5 w-5" />
            Přidat zařízení
          </div>
        </Button>
      </div>
      <div className="flex flex-wrap gap-10 pt-4">
        {devices.map((device) => (
          <DeviceCard key={uuid()} className="min-w-[350px]" device={device} />
        ))}
      </div>
    </div>
  );
};

export default RoomWithPlants;

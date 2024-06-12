import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import clsx from "clsx";
import { useEffect, useState } from "react";

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
import { useRouter } from "next/router";
import { MultiStepLoader } from "../MultiStepLoader";
import { useCheckPairingProccess } from "../../hooks/QueryHooks/useCheckPairingProcess";
import { useAddPlantsToRoom } from "../../hooks/MutationHooks/useAddPlantToRoom";

interface IRoomWithPlantsProps {
  room: IRoom;
  className?: string;
  refetchRooms?: () => void;
}
const loadingStates = [
  {
    text: "Navazuji spojení s rostlinou",
  },
  {
    text: "Připojuji zařízení k síti",
  },
  {
    text: "Probíhá synchronizace dat",
  },
  {
    text: "Kontroluji stav připojení",
  },
  {
    text: "Zajišťuji stabilní spojení",
  },
  {
    text: "Probíhá inicializace systému",
  },
  {
    text: "Hledám dostupné sítě",
  },
  {
    text: "Připravuji zařízení k provozu",
  },
  {
    text: "Zpracovávám informace o rostlině",
  },
];

const RoomWithPlants: React.FC<IRoomWithPlantsProps> = ({
  room: { plants: devices, name, id },
  refetchRooms,
  className = "",
}) => {
  const [defaultError, setDefaultError] = useState("");
  const { push } = useRouter();
  const { openModal, closeModal } = useModalStore((s) => ({
    openModal: s.openModal,
    closeModal: s.closeModal,
  }));
  const { pairPlantAsync } = usePairPlant();
  const { addPlantsToRoomAsync } = useAddPlantsToRoom();
  const {
    isPaired,
    setPairingCode,
    error,
    loading: isPairedLoading,
  } = useCheckPairingProccess((plantId) => {
    addPlantsToRoomAsync(id, [plantId]);
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isPaired) {
      refetchRooms && refetchRooms();
      toast.success("Zařízení bylo úspěšně spárováno");
    }
  }, [isPaired, refetchRooms]);

  const addNewDevice = async (deviceValues: AddNewDeviceValues) => {
    try {
      await pairPlantAsync("plant", deviceValues.name, deviceValues.deviceId);
      setPairingCode(deviceValues.deviceId);
      closeModal();
      toast.success("Proces párování byl zahájen");
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
        " h-full w-full p-4 bg-white rounded-lg shadow-xl"
      )}
    >
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isPairedLoading}
        duration={2000}
      />
      <div className="flex w-full flex-col  h-full flex-1 gap-2">
        <div
          className={
            "flex-1 w-full flex flex-row justify-between items-center gap-2"
          }
        >
          <h1
            className="text-xl text-black font-bold cursor-pointer"
            onClick={() => push(`/room/${id}}`)}
          >
            {name}
          </h1>
          <AddToQueueIcon
            className={"text-primary-500 cursor-pointer relative z-[20]"}
            onClick={openEditAppModal}
          />
        </div>
        <p className={"text-sm text-gray-400"}>
          Počet zařízení <span className={"font-bold"}>{devices.length}</span>
        </p>
      </div>
    </div>
  );
};

export default RoomWithPlants;

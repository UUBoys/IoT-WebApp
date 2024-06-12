import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

import AddNewDeviceModal, {
  AddNewDeviceValues,
} from "../../modals/AddNewDeviceModal";
import { useModalStore } from "../../stores/modal-store";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { IRoom } from "@/modules/utils/schemas/room";
import { usePairPlant } from "../../hooks/MutationHooks/usePairPlant";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { MultiStepLoader } from "../MultiStepLoader";
import { useCheckPairingProccess } from "../../hooks/QueryHooks/useCheckPairingProcess";
import { useAddPlantsToRoom } from "../../hooks/MutationHooks/useAddPlantToRoom";
import { loadingStates, uuid } from "@/modules/helpers/general";
import { uploadFiles } from "@/modules/lib/uploadThingHelpers";
import { useApolloStatusStore } from "../../stores/apollo-store";
import { LoadingType } from "@/modules/helpers/loader-helpers";

interface IRoomWithPlantsProps {
  room: IRoom;
  className?: string;
  refetchRooms?: () => void;
}

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
  const { addRequest, removeRequest, checkFinalStatus } = useApolloStatusStore(
    (set) => ({
      addRequest: set.addRequest,
      removeRequest: set.removeRequest,
      checkFinalStatus: set.checkFinalStatus,
    })
  );
  const { pairPlantAsync } = usePairPlant();
  const { addPlantsToRoomAsync } = useAddPlantsToRoom();
  const {
    isPaired,
    setPairingCode,
    error,
    loading: isPairedLoading,
  } = useCheckPairingProccess(async (plantId) => {
    await addPlantsToRoomAsync(id, [plantId]);
    refetchRooms && refetchRooms();
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

  const lowMesurementLevelPlantsCount = useMemo(() => {
    if (!devices) return 0;
    return devices.filter((device) => {
      if (!device.measurements || !device.measurements?.length) return false;
      if (device.measurements[device.measurements.length - 1]?.value < 20)
        return true;
    }).length;
  }, [devices]);

  const addNewDevice = async (deviceValues: AddNewDeviceValues) => {
    const id = uuid();
    addRequest({ id, type: LoadingType.WITHOUT_CONFIRM });
    try {
      const uploadFilesTest =
        deviceValues.image &&
        (await uploadFiles("imageUploader", {
          files: [deviceValues.image as File],
        }));
      await pairPlantAsync(
        deviceValues.type ?? "neznámá květina",
        deviceValues.name,
        deviceValues.deviceId,
        uploadFilesTest && uploadFilesTest[0].url,
        deviceValues.description
      );
      setPairingCode(deviceValues.deviceId);
      closeModal();
      toast.success("Proces párování byl zahájen");
    } catch (error: any) {
      toast.error(error || "Něco se pokazilo!");
    }

    removeRequest(id);
    checkFinalStatus();
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
        !isPairedLoading && "hover:shadow-2xl hover:scale-[1.01]",
        " h-full w-full p-4 bg-white rounded-lg  transition-all cursor-pointer shadow-lg"
      )}
    >
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isPairedLoading}
        duration={2000}
      />
      <div
        onClick={() => {
          push(`/room/${id}`);
        }}
        className="flex w-full flex-col  h-full flex-1 gap-2"
      >
        <div
          className={
            "flex-1 w-full flex flex-row justify-between items-center gap-2"
          }
        >
          <h1 className="text-xl text-black font-bold cursor-pointer">
            {name}
          </h1>
          <AddToQueueIcon
            className={"text-primary-500 cursor-pointer relative z-[20]"}
            onClick={(e) => {
              e.stopPropagation();
              openEditAppModal();
            }}
          />
        </div>
        <div className="flex w-full justify-between">
          <div>
            <p className={"text-sm text-gray-400"}>
              Počet zařízení{" "}
              <span className={"font-bold"}>{devices.length}</span>
            </p>
          </div>
          {lowMesurementLevelPlantsCount &&
            lowMesurementLevelPlantsCount > 0 && (
              <div className="flex text-black font-bold text-lg gap-1">
                {lowMesurementLevelPlantsCount ?? 0}
                <WarningAmberIcon
                  className={clsx(
                    lowMesurementLevelPlantsCount > devices.length / 2
                      ? "text-red-500"
                      : "text-yellow-500",
                    "text-yellow-500 cursor-pointer relative z-[20]"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditAppModal();
                  }}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RoomWithPlants;

import React, { useEffect, useState } from "react";
import { useRoom } from "@/modules/common/hooks/QueryHooks/useRoom";
import { useRouter } from "next/router";
import Image from "next/image";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import clsx from "clsx";
import { IPlant } from "@/modules/utils/schemas/plant";
import Button from "@/modules/common/components/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModalStore } from "@/modules/common/stores/modal-store";
import EditRoomModal, {
  IEditRoomValues,
} from "@/modules/common/modals/EditRoomModal";
import CloseIcon from "@mui/icons-material/Close";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";

import QRCode from "react-qr-code";

import SendIcon from "@mui/icons-material/Send";
import { useUpdateRoom } from "@/modules/common/hooks/MutationHooks/useUpdateRoom";
import { toast } from "react-toastify";
import { NextPage } from "next";
import { useDeleteRoom } from "@/modules/common/hooks/MutationHooks/useDeleteRoom";
import { usePairPlant } from "@/modules/common/hooks/MutationHooks/usePairPlant";
import { useAddPlantsToRoom } from "@/modules/common/hooks/MutationHooks/useAddPlantToRoom";
import { useCheckPairingProccess } from "@/modules/common/hooks/QueryHooks/useCheckPairingProcess";
import AddNewDeviceModal, {
  AddNewDeviceValues,
} from "@/modules/common/modals/AddNewDeviceModal";
import { MultiStepLoader } from "@/modules/common/components/MultiStepLoader";
import { loadingStates, uuid } from "@/modules/helpers/general";
import { uploadFiles } from "@/modules/lib/uploadThingHelpers";
import { useApolloStatusStore } from "@/modules/common/stores/apollo-store";
import { LoadingType } from "@/modules/helpers/loader-helpers";
import { AnimatedTooltip } from "@/modules/common/components/AnimatedTooltip";

export async function getServerSideProps(context: {
  req: { headers: { host: any } };
}) {
  const host = context.req.headers.host;

  return {
    props: {
      host,
    },
  };
}

const RoomDetail: NextPage<{ host: string }> = ({ host }) => {
  const { query, push } = useRouter();
  const { room, refetchRoom } = useRoom(query.roomId as string);
  const { updateRoomAsync } = useUpdateRoom();
  const [defaultError, setDefaultError] = useState("");
  const { deleteRoomAsync } = useDeleteRoom();
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
    if (!room?.id) return;
    await addPlantsToRoomAsync(room?.id, [plantId]);
    refetchRoom();
  });
  const editRoom = async (roomValues: IEditRoomValues) => {
    try {
      await updateRoomAsync({
        id: query.roomId as string,
        name: roomValues.name,
        plants: [],
      });
      refetchRoom();
      closeModal();
      toast.success("Místnost byla úspěšně upravena!");
    } catch (error: any) {
      setDefaultError(error || "Něco se pokazilo!");
      toast.error("Něco se pokazilo!", error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isPaired) {
      refetchRoom();
      toast.success("Zařízení bylo úspěšně spárováno");
    }
  }, [isPaired, refetchRoom]);

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

  const openShareRoomModal = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://${host}/joinRoom/${room?.inviteCode}?roomId=${room?.id}`
      );
      toast("📩 Odkaz zkopírován!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    openModal({
      isClosable: true,
      content: (
        <div className="flex w-full justify-center pb-10  flex-col items-center  align-top">
          <div className="flex w-full items-center justify-end gap-6 mt-[10px]">
            <div className="flex gap-5 text-end">
              <Button
                onClick={closeModal}
                type="button"
                color="transparent"
                size="lg"
                className="w-20"
              >
                <CloseIcon className="h-5 text-black w-5" />
              </Button>
            </div>
          </div>
          <div className="flex   flex-col items-start rounded-lg bg-white text-center  ">
            <QRCode
              className="w-full shadow-xl"
              value={`https://${host}/joinRoom/${room?.inviteCode}?roomId=${room?.id}`}
            />
          </div>
        </div>
      ),
    });
  };

  const openEditRoomModal = () => {
    openModal({
      isClosable: false,
      content: (
        <EditRoomModal
          closeModal={closeModal}
          editRoom={editRoom}
          defaultError={defaultError}
          defaultValues={{ name: room?.name || "" }}
        />
      ),
    });
  };
  const openSubmitDeleteRoomModal = () => {
    openModal({
      isClosable: false,
      content: (
        <div className=" flex flex-col items-center justify-start gap-6 self-stretch p-8">
          <div className=" text-center text-2xl font-bold leading-relaxed text-gray-900">
            Opravdu si přejete smazat místnost <b>{room?.name}</b>?
          </div>
          <div className=" flex h-16 flex-col items-start justify-start gap-5 self-stretch">
            <div className=" flex h-16 flex-col items-start justify-start gap-3.5 self-stretch">
              <div className=" inline-flex items-start justify-start self-stretch">
                <div className=" shrink grow basis-0 text-center text-base font-normal leading-normal text-gray-500">
                  Jakmile odstraníte místnost, místnost bude vymazána z celé
                  databáze. <br />
                  <br />
                  <b>Tato akce je nevratná.</b>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col items-center justify-start gap-7">
            <div className=" inline-flex items-start justify-start gap-5">
              <div className=" flex items-center justify-center  ">
                <button
                  onClick={() => closeModal()}
                  className=" h-10 w-20 select-none rounded-lg bg-gray-300 p-3 text-sm font-medium leading-tight  text-black  transition-all hover:cursor-pointer  hover:bg-gray-500 hover:text-white"
                >
                  Zpět
                </button>
              </div>
              <div className=" flex items-center justify-center ">
                <button
                  onClick={async () => {
                    closeModal();
                    try {
                      await deleteRoomAsync(room?.id as string);
                      toast.success("Místnost byla úspěšně smazána!");
                      push("/");
                    } catch (error) {
                      toast.error("Něco se pokazilo!" + error);
                    }
                  }}
                  className=" h-10 w-24 select-none rounded-lg bg-red-600 p-3 text-sm font-medium leading-tight text-white transition-all hover:cursor-pointer hover:bg-red-800"
                >
                  Odstranit
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    });
  };

  const renderDeviceBlock = (
    plant: IPlant,
    status: "success" | "danger" | "warning"
  ) => {
    const isPlantDry =
      plant.measurements?.length > 0 &&
      plant.measurements[plant.measurements.length - 1]?.value < 20;
    console.log(plant.imageUrl);
    return (
      <div
        onClick={() => {
          push(`${query.roomId}/plant/${plant.id}`);
        }}
        className={"relative  bg-transparent cursor-pointer mt-[20px]"}
      >
        <div
          className={clsx(
            "ml-[15px] w-[100px] h-[20px] bg-${status}-500 rounded-t-md flex items-center justify-center shadow-2xl",
            plant.isOnline ? "bg-success-600" : "bg-danger-600"
          )}
        >
          <p className={"text-white font-bold"}>
            {plant.isOnline ? "Online" : "Offline"}
          </p>
        </div>
        <div
          className={clsx(
            isPlantDry && "border-r-[30px] border-yellow-400",
            "w-full    flex justify-between items-center  flex-row gap-4 bg-white hover:shadow-2xl shadow-lg transition-all hover:scale-[1.01] rounded-md"
          )}
        >
          <Image
            src={plant.imageUrl ?? "https://picsum.photos/200"}
            alt={"device-image"}
            className={"rounded-l-md"}
            height={80}
            width={80}
          />
          <div className={"flex flex-col  justify-evenly h-[70px] w-full"}>
            <p className={"font-bold text-xl text-black min-w-max"}>
              {plant.name}
            </p>
            <p className={"text-sm text-black min-w-max"}>{plant.type}</p>
            <p className={"!text-gray-400 line-clamp-3 max-w-full"}>
              {plant.description}
            </p>
          </div>
          {isPlantDry && (
            <div>
              <WarningAmberIcon
                className={clsx(
                  "text-yellow-500",
                  "text-yellow-500 cursor-pointer mr-2 relative z-[50]"
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
    );
  };
  return (
    <div className={"w-full px-4 md:px-20 mt-[40px]"}>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isPairedLoading}
        duration={2000}
      />
      <div className="flex w-full justify-between">
        <p className={"text-black font-bold text-4xl"}>{room?.name}</p>

        <div className="flex flex-col md:flex-row gap-3">
          {" "}
          <Button
            className=" !h-12 !px-3 text-lg "
            size="md"
            color="secondary"
            onClick={openShareRoomModal}
          >
            <div className="flex items-center justify-between !gap-2 ">
              <SendIcon className="h-5 w-5" />
              Pozvat uživatele
            </div>
          </Button>
          <Button
            className=" !h-12 !px-3 text-lg "
            size="md"
            color="danger"
            onClick={openSubmitDeleteRoomModal}
          >
            <div className="flex items-center justify-between !gap-2 ">
              <DeleteIcon className="h-5 w-5" />
              Smazat místnost
            </div>
          </Button>{" "}
          <Button
            className=" !h-12  !px-3 text-lg "
            size="md"
            color="primary"
            onClick={openEditRoomModal}
          >
            <div className="flex items-center justify-between !gap-2 ">
              <EditIcon className="h-5 w-5" />
              Upravit místnost
            </div>
          </Button>
        </div>
      </div>

      {room?.plants.map((plant) => {
        return renderDeviceBlock(plant, "success");
      })}
      <div
        onClick={(e) => {
          e.stopPropagation();
          openEditAppModal();
        }}
        className={"relative bg-transparent cursor-pointer mt-[20px]"}
      >
        <div
          className={
            "w-full  border-background-100 hover:scale-[1.05] hover:bg-secondary-900  flex flex-row gap-4 bg-primary-100/50 text-center items-center justify-center hover:shadow-2xl shadow-lg transition-all rounded-md"
          }
        >
          <div
            className={
              "flex flex-col group items-center py-10 text-secondary-900 hover:text-primary-100 font-bold justify-evenly w-full"
            }
          >
            Přidat nové zařízení
            <AddToQueueIcon
              className={
                "text-secondary-900 group-hover:text-primary-100 cursor-pointer relative z-[20]"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoomDetail;

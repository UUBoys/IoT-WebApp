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
import { ISpace } from "@/modules/utils/schemas/space";

interface ISpaceWithDevicesProps {
  space: ISpace;
  className?: string;
}

const SpaceWithDevices: React.FC<ISpaceWithDevicesProps> = ({
  space: { devices, name },
  className = "",
}) => {
  const [defaultError, setDefaultError] = useState("");
  const { openModal, closeModal } = useModalStore((s) => ({
    openModal: s.openModal,
    closeModal: s.closeModal,
  }));

  const addNewDevice = async (deviceValues: AddNewDeviceValues) => {
    console.log("Add new device", deviceValues);
    setDefaultError("pepega");
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
    <div className={clsx(className, " h-full w-full pt-10")}>
      <div className="flex w-full justify-between">
        <h1 className="text-4xl text-gray-100">{name}</h1>
        <Button
          color="primary"
          className=" !h-12 bg-gray-700 !px-3 text-lg "
          size="md"
          onClick={openEditAppModal}
        >
          <div className="flex items-center justify-between !gap-2 ">
            <AddCircleOutlineIcon className="h-5 w-5" />
            Přidat zařízení do prostoru
          </div>
        </Button>
      </div>
      <div className="flex flex-wrap gap-10 pt-10">
        {devices.map((device) => (
          <DeviceCard key={uuid()} className="min-w-[350px]" device={device} />
        ))}
      </div>
    </div>
  );
};

export default SpaceWithDevices;

import { useState } from "react";
import Select, { SelectItemProps } from "@/modules/common/components/Select";
import Button from "@/modules/common/components/Button";
import UndoIcon from "@mui/icons-material/Undo";
import { useRouter } from "next/router";
const rooms: SelectItemProps[] = [
  {
    label: "test room",
    value: "123123123",
  },
];

const Settings = () => {
  const { push, query } = useRouter();

  const [deviceName, setDeviceName] = useState<string>("Device name");
  const handleDeviceNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDeviceName(e.target.value);

  const [deviceRoom, setDeviceRoom] = useState<SelectItemProps>(rooms[0]);
  const handdleDeviceRoomChange = (e: SelectItemProps) => setDeviceRoom(e);

  const [deviceType, setDeviceType] = useState<SelectItemProps>(rooms[0]);
  const handleDeviceTypeChange = (e: SelectItemProps) => setDeviceType(e);

  return (
    <div
      className={"w-full h-[calc(100vh-65px)] flex items-center justify-center"}
    >
      <div className={"bg-gray-800 p-6 rounded-md w-[90%] max-w-[500px]"}>
        <div className={"flex flex-row gap-2"}>
          <UndoIcon
            onClick={() =>
              push(`/room/${query.roomId}/plant/${query.deviceId}`)
            }
          />
          <p className={"text-xl font-bold"}>Device Name</p>
        </div>
        <div className={"flex flex-col gap-4 mt-8"}>
          <input
            type={"text"}
            className={"rounded-md w-full text-black"}
            value={deviceName}
            onChange={handleDeviceNameChange}
          />

          <Select
            items={rooms}
            defaultSelected={deviceType}
            onSelectedChange={handleDeviceTypeChange}
            label={"Type"}
          />
          <Select
            items={rooms}
            defaultSelected={deviceRoom}
            label={"Room"}
            onSelectedChange={handdleDeviceRoomChange}
          />
        </div>
        <div className={"flex flex-row justify-end items-center gap-4 mt-10"}>
          <Button color={"success"}>Save</Button>
          <Button color={"danger"}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

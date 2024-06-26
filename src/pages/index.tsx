"use client";

import AddIcon from "@mui/icons-material/Add";
import { NextPage } from "next";
import React, { useState } from "react";

import RoomWithPlants from "@/modules/common/components/SpaceWithDevices";
import Button from "@/modules/common/components/Button";
import { useModalStore } from "@/modules/common/stores/modal-store";
import CreateNewRoomModal, {
  ICreateNewRoomValues,
} from "@/modules/common/modals/CreateNewRoomModal";
import { useCreateRoom } from "@/modules/common/hooks/MutationHooks/useCreateRoom";
import { useRooms } from "@/modules/common/hooks/QueryHooks/useRooms";

const Home: NextPage = () => {
  const { openModal, closeModal } = useModalStore((s) => ({
    openModal: s.openModal,
    closeModal: s.closeModal,
  }));
  const [defaultError, setDefaultError] = useState("");

  const { createRoomAsync } = useCreateRoom();
  const { rooms, refetchRooms } = useRooms();
  const createNewRoom = async (deviceValues: ICreateNewRoomValues) => {
    try {
      await createRoomAsync(deviceValues.name);
      refetchRooms();
      closeModal();
    } catch (error: any) {
      setDefaultError(error || "Něco se pokazilo!");
    }
  };

  const openEditAppModal = () => {
    openModal({
      isClosable: false,
      content: (
        <CreateNewRoomModal
          closeModal={closeModal}
          createNewRoom={createNewRoom}
          defaultError={defaultError}
        />
      ),
    });
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-10">
      <div className="flex w-full justify-end">
        <Button
          className=" !h-12 !bg-success-600 !px-3 text-lg "
          size="md"
          onClick={openEditAppModal}
        >
          <div className="flex items-center justify-between !gap-2 ">
            <AddIcon className="h-5 w-5" />
            Přidat novou místnost
          </div>
        </Button>
      </div>
      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full mt-[30px]"
        }
      >
        {rooms.map((room) => (
          <RoomWithPlants
            refetchRooms={refetchRooms}
            key={room.id}
            room={room}
          />
        ))}
      </div>
      {rooms.length === 0 && (
        <div className="flex w-full justify-center items-center h-[80vh]">
          <h1 className="text-4xl text-common-500">
            Nemáte žádné místnosti😔💔
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;

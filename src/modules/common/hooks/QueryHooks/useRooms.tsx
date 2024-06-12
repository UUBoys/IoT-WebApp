// Define Maybe type
import { useEffect, useState } from "react";
import { GET_ROOMS } from "@/modules/GRAPHQL/queries/GetRoomsQuery";
import { useQuery } from "@apollo/client";

type Maybe<T> = T | null | undefined;

// Define GraphQL-generated Room type
interface Room {
  id: string;
  name: string;
  plants?: Maybe<Maybe<Plant>[]>;
  inviteCode?: string;
}

interface Plant {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  mesurements: Maybe<Measurement[]>;
}

interface Measurement {
  id: string;
  value: number;
  date: Date;
}

// Define IRoom type to match your expected structure
interface IRoom {
  id: string;
  name: string;
  plants: IPlant[];
  inviteCode?: string;
}

interface IPlant {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  mesurements: IMeasurement[];
}

interface IMeasurement {
  id: string;
  value: number;
  date: Date;
}

interface Query {
  rooms?: Maybe<Room[]>;
}

interface IUseRoomsHook {
  rooms: IRoom[];
  refetchRooms: () => void;
}

// Type guard function to filter out null and undefined values
const isRoom = (room: Maybe<Room>): room is Room =>
  room !== null && room !== undefined;

// Function to transform Room to IRoom
const transformRoom = (room: Room): IRoom => ({
  id: room.id,
  name: room.name,
  inviteCode: room.inviteCode,
  plants: room.plants
    ? room.plants
        .filter(
          (plant): plant is Plant => plant !== null && plant !== undefined
        )
        .map((plant) => ({
          id: plant.id,
          name: plant.name,
          type: plant.type,
          imageUrl: plant.imageUrl,
          description: plant.description,
          mesurements: plant.mesurements
            ? plant.mesurements
                .filter(
                  (measurement): measurement is Measurement =>
                    measurement !== null && measurement !== undefined
                )
                .map((measurement) => ({
                  id: measurement.id,
                  value: measurement.value,
                  date: new Date(measurement.date),
                }))
            : [],
        }))
    : [],
});

export const useRooms = (): IUseRoomsHook => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const { data, refetch } = useQuery<Query>(GET_ROOMS, {
    fetchPolicy: "cache-and-network",
    context: { shouldTrackStatus: true },
  });

  useEffect(() => {
    if (data && data.rooms) {
      // Filter out any null or undefined values using the type guard function
      const filteredRooms: Room[] = data.rooms.filter(isRoom);

      // Transform rooms to IRoom and remove duplicates
      const uniqueRooms: IRoom[] = filteredRooms.reduce(
        (acc: IRoom[], room: Room) => {
          const transformedRoom = transformRoom(room);
          if (!acc.find((r) => r.id === transformedRoom.id)) {
            acc.push(transformedRoom);
          }
          return acc;
        },
        []
      );

      setRooms(uniqueRooms);
    }
  }, [data]);

  return {
    rooms,
    refetchRooms: refetch,
  };
};

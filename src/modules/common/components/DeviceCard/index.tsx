/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable tailwindcss/no-custom-classname */
import clsx from "clsx";
import Link from "next/link";

import { IDevice } from "@/modules/utils/schemas/device";

interface IDeviceCardProps {
  device: IDevice;
  className?: string;
}

const DeviceCard: React.FC<IDeviceCardProps> = ({
  device: { description, id, image, name },
  className = "",
}) => {
  return (
    <div
      className={clsx(
        className,
        "max-w-sm rounded-lg !bg-gray-800 shadow-lg  transition-all  hover:bg-gray-700"
      )}
    >
      <div
        className={clsx(
          `bg-[url('${
            image && image !== "" ? image : "/images/register-wallpaper.jpeg"
          }')]`,
          "min-h-[180px] rounded-t-lg bg-opacity-30  bg-cover bg-center bg-no-repeat bg-blend-multiply"
        )}
      />

      <div className="flex flex-col gap-3 p-5 pt-3">
        <Link href="/">
          <h5 className=" text-2xl font-bold tracking-tight !text-white ">
            {name}
          </h5>
        </Link>
        <Link
          href={`/devices/${id}`}
          className="0  inline-flex w-full items-center justify-center rounded-lg !bg-gray-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none  "
        >
          Spravovat
          <svg
            className="ms-2 h-3.5 w-3 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>{" "}
        <p className="mb-3 font-normal !text-gray-400 ">{description}</p>
      </div>
    </div>
  );
};

export default DeviceCard;

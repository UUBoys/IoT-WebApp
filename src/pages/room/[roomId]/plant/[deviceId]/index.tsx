/* eslint-disable @typescript-eslint/no-unused-vars */
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Add BarElement for Bar charts
  ArcElement, // Add ArcElement for Doughnut charts
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePlant } from "@/modules/common/hooks/QueryHooks/usePlant";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // Register BarElement for Bar charts
  ArcElement, // Register ArcElement for Doughnut charts
  Title,
  Tooltip,
  Legend
);

const DeviceDetail = () => {
  const { push, query } = useRouter();
  const { plant } = usePlant(query.deviceId);
  console.log(plant);
  const widgetClasses =
    "h-full w-full bg-white flex flex-col gap-3 p-4 rounded-md justify-center shadow-xl";

  const latestPlantMeasurement = plant?.measurements
    ? plant.measurements[plant.measurements.length - 1]
    : null;

  const data = {
    datasets: [
      {
        data: [
          latestPlantMeasurement ? latestPlantMeasurement.value : 0,
          latestPlantMeasurement ? 100 - latestPlantMeasurement.value : 0,
        ],
        backgroundColor: ["#00A6F6", "#E1F5FE"],
        borderColor: ["transparent", "transparent"],
        // hoverBackgroundColor: ["#FF6384", "transparent"],
        text: "Total: 9000+",
      },
    ],
    labels: ["Vlhkost", "Suchost"],
  };

  const options = {
    rotation: -90,
    cutout: "80%",
    plugins: {
      legend: {
        display: false, // Ensure the legend is hidden
      },
    },
  };

  const lineData = {
    labels: plant?.measurements
      ? plant.measurements.map((measurement) =>
          moment(measurement.date).format("HH:mm:ss")
        )
      : [],
    datasets: [
      {
        label: "Vlhkost půdy (v %)",
        data: plant?.measurements
          ? plant.measurements.map((measurement) => measurement.value)
          : [],
        fill: false,
        backgroundColor: "#00A6F6",
        borderColor: "#E1F5FE",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Daily Water Usage",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "% Vlhkosti",
        },
      },
      x: {
        title: {
          display: true,
          text: "Datum a čas",
        },
      },
    },
  };

  if (!plant) return <></>;
  return (
    <div
      className={"px-6 mt-10 flex flex-col gap-10 pb-5 max-w-[1100px] mx-auto"}
    >
      <div className={"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-10"}>
        <div
          className={
            "h-full w-full flex flex-col gap-10 rounded-md justify-center"
          }
        >
          <div
            className={
              " w-full bg-white flex flex-col gap-3 p-4 rounded-md  h-full shadow-xl"
            }
          >
            <div className={"flex flex-row justify-between items-center"}>
              <h1 className={"font-bold text-xl text-black"}>{plant.name}</h1>
              <div className={"flex flex-row gap-3 items-center"}>
                {plant.isOnline ? (
                  <div className={"bg-success-500 px-3 py-2 rounded-md"}>
                    Online
                  </div>
                ) : (
                  <div className={"bg-danger-500 px-3 py-2 rounded-md"}>
                    Offline
                  </div>
                )}
                <SettingsIcon
                  onClick={() => push(`/device/${query.id}/settings`)}
                />
              </div>
            </div>
            <p className={"text-sm font-medium text-gray-300"}>
              {plant.description}
            </p>
          </div>
          <div
            className={
              "h-[200px] w-full bg-white flex flex-col gap-3 p-4 rounded-md justify-center shadow-xl"
            }
          >
            <div className={"flex flex-row gap-5 w-full"}>
              <div
                className={
                  "px-3 py-2 bg-lime-500 rounded-md flex-1 cursor-pointer"
                }
              >
                Water
              </div>
              <div
                className={
                  "px-3 py-2 bg-gray-500 rounded-md flex-1 cursor-pointer"
                }
              >
                Schedule
              </div>
              <div
                className={
                  "px-3 py-2 bg-red-500 rounded-md flex-1 cursor-pointer"
                }
              >
                Turn off
              </div>
            </div>
            <div
              className={
                "px-3 py-2 bg-gray-500 rounded-md mt-2 cursor-pointer text-center "
              }
            >
              Settings
            </div>
          </div>
        </div>
        <div
          className={
            "h-full w-full bg-gray-800 flex flex-col gap-3 rounded-md justify-center relative shadow-xl"
          }
        >
          <Image
            src={
              plant.imageUrl ||
              "https://g.denik.cz/15/aa/lide-od-vedle-jan-port-teplice-mladi-me-neberou-jako-starecka-07_denik-630.jpg"
            }
            className={"rounded-md"}
            alt={"plant-image"}
            fill
          />
        </div>
        <div className={widgetClasses}>
          <h1 className={"font-bold text-xl text-black"}>Vlhkost</h1>
          <div className={"w-full h-fit relative"}>
            <Doughnut data={data} options={options} />
            <p
              className={
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-bold text-2xl"
              }
            >
              {latestPlantMeasurement &&
                latestPlantMeasurement.value.toFixed(2)}
              %
            </p>
          </div>
          <p className={"text-gray-500 text-center"}>
            {plant.measurements && plant.measurements.length
              ? `Poslední aktualizace: ${moment(
                  plant.measurements[plant.measurements.length - 1].date
                ).fromNow()}`
              : ""}
          </p>
        </div>
      </div>

      <div className={"w-full bg-white p-3 rounded-md"}>
        <Bar data={lineData} options={barOptions} />
      </div>
    </div>
  );
};

export default DeviceDetail;

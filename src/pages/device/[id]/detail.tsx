import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DeviceDetail = () => {
  const { push, query } = useRouter();
  const widgetClasses =
    "h-full w-full bg-gray-800 flex flex-col gap-3 p-4 rounded-md justify-center";

  const data = {
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#1AA7EC", "transparent"],
        borderColor: ["#1E2F97", "transparent"],
        // hoverBackgroundColor: ["#FF6384", "transparent"],
        text: "Total: 9000+",
      },
    ],
    labels: ["water", "Drained"],
  };

  const options = {
    rotation: -90,
    cutout: "80%",
    legend: {
      display: true,
      position: "right",
    },
  };

  const lineData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Water Usage (liters)",
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Water Usage",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Liters",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
    },
  };

  return (
    <div className={"px-6 mt-10 flex flex-col gap-10"}>
      <div className={"grid grid-cols-3 gap-10"}>
        <div
          className={
            "h-full w-full flex flex-col gap-10 rounded-md justify-center"
          }
        >
          <div
            className={
              " w-full bg-gray-800 flex flex-col gap-3 p-4 rounded-md  h-full"
            }
          >
            <div className={"flex flex-row justify-between items-center"}>
              <h1 className={"font-bold text-xl"}>{"{DeviceName}"}</h1>
              <div className={"flex flex-row gap-3 items-center"}>
                <div className={"bg-lime-500 px-3 py-2 rounded-md"}>Online</div>
                <SettingsIcon
                  onClick={() => push(`/device/${query.id}/settings`)}
                />
              </div>
            </div>
            <p className={"text-sm font-medium"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              id nunc mollis, malesuada tortor non, vulputate enim. Pellentesque
              auctor ornare nibh ac imperdiet. Nulla facilisi. Aliquam interdum
              et ex id dignissim. Fusce scelerisque, lectus ut scelerisque
              volutpat, quam leo elementum nisl, ut tempus urna dui eu odio.
              Suspendisse suscipit, sem quis feugiat pretium, libero ex posuere
              ligula, egestas fringilla arcu ipsum eget mauris. Integer eget
              sodales ante.
            </p>
          </div>
          <div
            className={
              "h-[100px] w-full bg-gray-800 flex flex-col gap-3 p-4 rounded-md justify-center"
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
          </div>
        </div>
        <div
          className={
            "h-full w-full bg-gray-800 flex flex-col gap-3 rounded-md justify-center relative"
          }
        >
          <Image
            src={
              "https://g.denik.cz/15/aa/lide-od-vedle-jan-port-teplice-mladi-me-neberou-jako-starecka-07_denik-630.jpg"
            }
            className={"rounded-md"}
            alt={"plant-image"}
            fill
          />
        </div>
        <div className={widgetClasses}>
          <h1 className={"font-bold text-xl"}>Water level</h1>
          <Doughnut data={data} options={options} />
          <p className={"text-gray-500 text-center"}>
            Last update: 21 minutes ago
          </p>
        </div>
      </div>

      <div className={"w-full bg-gray-800 p-3 rounded-md"}>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default DeviceDetail;

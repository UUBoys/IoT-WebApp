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
import Select, { SelectItemProps } from "@/modules/common/components/Select";
import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

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

const filterChartOptions = [
  {
    label: "Den",
    value: "day",
  },
  {
    label: "Týden",
    value: "week",
  },
  {
    label: "Měsíc",
    value: "month",
  },
];

const DeviceDetail = () => {
  const { push, query } = useRouter();
  const { plant } = usePlant(query.deviceId);

  const [filterBy, setFilterBy] = useState<SelectItemProps>(
    filterChartOptions[0]
  );
  const [filterDate, setFilterDate] = useState(new Date());
  const [filteredData, setFileteredData] = useState<
    {
      id: string;
      date: Date;
      value: number;
    }[]
  >([]);

  const widgetClasses =
    "h-full w-full bg-white flex flex-col gap-3 p-4 rounded-md justify-center shadow-xl";

  const latestPlantMeasurement = plant?.measurements
    ? plant.measurements[plant.measurements.length - 1]
    : null;

  const diagramColor = latestPlantMeasurement
    ? latestPlantMeasurement.value > 20
      ? "#00A6F6"
      : latestPlantMeasurement.value > 10
      ? "#FFD633"
      : "#FF4B4B"
    : "#00A6F6";

  useEffect(() => {
    if (plant?.measurements.length) {
      setFileteredData(plant.measurements);
    }
  }, [plant?.measurements]);

  const data = {
    datasets: [
      {
        data: [
          latestPlantMeasurement ? latestPlantMeasurement.value : 0,
          latestPlantMeasurement ? 100 - latestPlantMeasurement.value : 0,
        ],
        backgroundColor: [diagramColor, "#E1F5FE"],
        borderColor: ["transparent", "transparent"],
        // hoverBackgroundColor: ["#FF6384", "transparent"],
        text: "Total: 9000+",
      },
    ],
    labels: ["Vlhkost", "Suchost"],
  };

  const options = {
    rotation: 0,
    cutout: "80%",
    plugins: {
      legend: {
        display: false, // Ensure the legend is hidden
      },
    },
  };

  const lineData = {
    labels: filteredData.map((measurement) =>
      filterBy.value === "day"
        ? moment(measurement.date).format("HH:mm:ss")
        : moment(measurement.date).format("DD. mm. yy HH:mm:ss")
    ),
    datasets: [
      {
        label: "Vlhkost půdy (v %)",
        data: filteredData.map((measurement) => measurement.value),
        fill: false,
        // backgroundColor: "#00A6F6",
        borderColor: "#E1F5FE",
        backgroundColor: filteredData.map((measurement) =>
          measurement.value > 20
            ? "#00A6F6"
            : measurement.value > 10
            ? "#FFD633"
            : "#FF4B4B"
        ),
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

  const handleOnFilterChartChange = (e: SelectItemProps) => {
    setFilterBy(e);
    const selectedDate = moment(filterDate);

    let filtered = [];
    if (plant?.measurements) {
      if (e.value === "day") {
        filtered = plant.measurements.filter((measurement) =>
          moment(measurement.date).isSame(selectedDate, "day")
        );
      } else if (e.value === "week") {
        filtered = plant.measurements.filter((measurement) =>
          moment(measurement.date).isSame(selectedDate, "week")
        );
      } else if (e.value === "month") {
        filtered = plant.measurements.filter((measurement) =>
          moment(measurement.date).isSame(selectedDate, "month")
        );
      }
    }

    setFileteredData(filtered);
  };

  const handleOnDateChange = (date) => {
    setFilterDate(date);
    const selectedDate = moment(date);

    let filtered = [];
    if (plant?.measurements) {
      if (filterBy.value === "day") {
        filtered = plant.measurements.filter((measurement) =>
          moment(measurement.date).isSame(selectedDate, "day")
        );
      } else if (filterBy.value === "week") {
        filtered = plant.measurements.filter((measurement) =>
          moment(measurement.date).isSame(selectedDate, "week")
        );
      } else if (filterBy.value === "month") {
        filtered = plant.measurements.filter((measurement) =>
          moment(measurement.date).isSame(selectedDate, "month")
        );
      }
    }

    setFileteredData(filtered);
  };

  if (!plant) return <></>;
  return (
    <div
      className={"px-6 mt-10 flex flex-col gap-10 pb-5 max-w-[1100px] mx-auto"}
    >
      <div className={"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6"}>
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
              <div>
                <h1 className={"font-bold text-xl text-black"}>{plant.name}</h1>
                <p className={"text-sm font-medium text-gray-300"}>
                  Typ: <span className={"font-bold"}>{plant?.type}</span>
                </p>
              </div>

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
                {/*<SettingsIcon*/}
                {/*  className={"text-gray-300"}*/}
                {/*  onClick={() => push(`/device/${query.id}/settings`)}*/}
                {/*/>*/}
              </div>
            </div>

            <p className={"text-sm font-medium text-gray-300 line-clamp-[10]"}>
              {plant.description}
            </p>
          </div>
          {/*<div*/}
          {/*  className={*/}
          {/*    "h-[200px] w-full bg-white flex flex-col gap-3 p-4 rounded-md justify-center shadow-xl"*/}
          {/*  }*/}
          {/*>*/}
          {/*  <p>Naposledy </p>*/}
          {/*</div>*/}
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

      <div
        className={
          "bg-white shadow-xl rounded-md p-2  flex items-center flex-row justify-center gap-5 w-fit relative z-[10]"
        }
      >
        <Select
          items={filterChartOptions}
          className={"w-[150px] relative top-[-2px]"}
          onSelectedChange={handleOnFilterChartChange}
          defaultSelected={filterBy}
        />
        <DatePicker
          selected={filterDate}
          onChange={handleOnDateChange}
          className=" block w-[120px] rounded-lg border border-background-100 !bg-background-50 p-2.5  !placeholder-gray-400 focus:!bg-white sm:text-sm outline-none focus:outline-none text-black"
          dateFormat="dd. MM. yyyy"
        />
      </div>

      <div
        className={
          "w-full bg-white p-3 rounded-md shadow-xl relative top-[-20px]"
        }
      >
        <Bar data={lineData} options={barOptions} />
      </div>
    </div>
  );
};

export default DeviceDetail;

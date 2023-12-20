import React, { useEffect, useState } from "react";
import formatDiskData from "../../utils/FormatDiskData";
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import useProxmox from "../../config/Store";

export default function TableLine({ machine }) {
  return (
    <tr className="border-b border-dashed last:border-b-0">
      <td className="p-3 pl-0">
        <div className="flex items-center">
          <div className="relative inline-block shrink-0 rounded-2xl me-3">
            <img
              src={"images/" + machine.template + ".png"}
              className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
              alt=""
            />
          </div>
        </div>
      </td>
      <td className="p-3 pl-0">
        <span className="font-semibold text-light-inverse text-md/normal">
          {machine.vmid}
        </span>
      </td>
      <td className="p-3 pr-0">
        <span className="font-semibold text-light-inverse text-md/normal">
          {machine.name}
        </span>
      </td>
      <td className="p-3 pr-0 ">
        <span className="font-semibold text-light-inverse text-md/normal">
          {(machine.cpu * 100).toFixed(2) + " %"}
        </span>
      </td>
      <td className="p-3 pr-0 ">
        <span className="font-semibold text-light-inverse text-md/normal">
          {(machine.mem / (1024 * 1024)).toFixed(2) + " MB"}
        </span>
      </td>
      <td className="p-3 pr-12 ">
        <span
          className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
            machine.status === "stopped"
              ? "text-danger bg-danger-light"
              : "text-success bg-success-light"
          }`}
        >
          {" "}
          {machine.status}
        </span>
      </td>
      <td className="pr-12 text-start">
        <span className="font-semibold text-light-inverse text-md/normal">
          {formatDiskData(machine.disk)}
        </span>
      </td>
      <td className="pr-12 text-start">
        <button
          onClick={() => machine.caller(machine)}
          className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"
        >
          <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
            {machine.status === "stopped" ? (
              <PlayIcon className="w-5 h-5 text-green-500" />
            ) : (
              <StopIcon className="w-5 h-5 text-red-500" />
            )}
          </span>
        </button>
      </td>
      <td className="p-3 pr-0 ">
        <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
          <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </button>
      </td>
    </tr>
  );
}

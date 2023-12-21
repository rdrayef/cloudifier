import React from "react";
import TableLine from "./TableLine";

function MachinesTable({ title, machines }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css"
      />
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">{title}</span>
                </h3>
                <div className="relative flex flex-wrap items-center my-2">
                  <a className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light">
                    {" "}
                    See other projects{" "}
                  </a>
                </div>
              </div>
              {/* end card header */}
              {/* card body  */}
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[175px]">OS</th>
                        <th className="pb-3 text-start min-w-[175px]">#ID</th>
                        <th className="pb-3 text-start min-w-[175px]">NAME</th>
                        <th className="pb-3 text-start min-w-[100px]">CPU</th>
                        <th className="pb-3 text-start min-w-[100px]">
                          MEMORY
                        </th>
                        <th className="pb-3 pr-12 text-start min-w-[175px]">
                          STATUS
                        </th>
                        <th className="pb-3 pr-12 text-start min-w-[100px]">
                          DISK
                        </th>
                        <th className="pb-3 pr-5 text-start min-w-[50px]">
                          ACTIONS
                        </th>
                        <th className="pb-3 text-start min-w-[50px]">
                          DETAILS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {machines.map((item, key) => (
                        <TableLine machine={item} key={key} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MachinesTable;

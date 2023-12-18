import React from "react";

const RatingBar = ({ rating }) => {
  const percentage = rating / 100 * 100;

  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
            Rating
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-teal-600">
            {rating}%
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full bg-gray-200 rounded-full">
          <div
            style={{ width: `${percentage}%` }}
            className="text-center py-1 rounded-full text-white bg-teal-500"
          />
        </div>
      </div>
    </div>
  );
};

export default RatingBar;

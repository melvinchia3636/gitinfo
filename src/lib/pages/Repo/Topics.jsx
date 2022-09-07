/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Icon } from "@iconify/react";

function Topics({ data }) {
  return data.topics.length ? (
    <div className="mt-10">
      <div className="flex items-center text-2xl font-medium tracking-wide gap-2 text-zinc-600 dark:text-zinc-300">
        <Icon
          icon="uil:bookmark"
          className="w-8 h-8 text-custom-500 dark:text-custom-400"
        />
        Topics
      </div>
      <p className="flex flex-wrap mt-4 ml-1 text-sm tracking-wide text-zinc-600 dark:text-zinc-300 gap-1">
        {data.topics.map((e) => (
          <span className="px-4 pt-1 pb-1.5 shadow-md block bg-custom-500 rounded-full text-zinc-100">
            {e}
          </span>
        ))}
      </p>
    </div>
  ) : (
    ""
  );
}

export default Topics;

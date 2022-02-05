/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function Stats({ data }) {
  return (
    <div className="flex gap-3 px-1 tracking-wide">
      <div className="flex items-center gap-2 rounded-md p-2 bg-white dark:bg-zinc-600 w-full shadow-md">
        <div className="p-2 bg-custom-200 dark:bg-custom-500 rounded-md">
          <Icon icon="ant-design:star-filled" className="w-8 h-8 text-custom-500 dark:text-custom-100" />
        </div>
        <div className="text-sm font-medium text-zinc-400 flex flex-col justify-between">
          Stars
          <span className="text-2xl text-zinc-600 dark:text-zinc-200">{data.stargazers_count.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-md p-2 bg-white dark:bg-zinc-600 w-full shadow-md">
        <div className="p-2 bg-custom-200 dark:bg-custom-500 rounded-md">
          <Icon icon="ant-design:fork-outlined" className="w-8 h-8 text-custom-500 dark:text-custom-100 stroke-[0.4px]" />
        </div>
        <div className="text-sm font-medium text-zinc-400 flex flex-col justify-between">
          Forks
          <span className="text-2xl text-zinc-600 dark:text-zinc-200">{data.forks.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-md p-2 bg-white dark:bg-zinc-600 w-full shadow-md">
        <div className="p-2 bg-custom-200 dark:bg-custom-500 rounded-md">
          <Icon icon="uil:eye" className="w-8 h-8 text-custom-500 dark:text-custom-100" />
        </div>
        <div className="text-sm font-medium text-zinc-400 flex flex-col justify-between">
          Subscribers
          <span className="text-2xl text-zinc-600 dark:text-zinc-200">{data.subscribers_count.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-md p-2 bg-white dark:bg-zinc-600 w-full shadow-md">
        <div className="p-2 bg-custom-200 dark:bg-custom-500 rounded-md">
          <Icon icon="octicon:issue-opened-24" className="w-8 h-8 text-custom-500 dark:text-custom-100 stroke-custom-500 dark:stroke-custom-100 stroke-[0.4px]" />
        </div>
        <div className="text-sm font-medium text-zinc-400 flex flex-col justify-between">
          Issues
          <span className="text-2xl text-zinc-600 dark:text-zinc-200">{data.open_issues.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Stats;

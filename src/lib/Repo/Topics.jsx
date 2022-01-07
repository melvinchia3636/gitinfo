/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function Topics({ data }) {
  return (
    data.topics.length ? (
      <div className="mt-10">
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="uil:bookmark" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          Topics
        </div>
        <p className="mt-4 text-slate-600 dark:text-gray-100 text-sm ml-1 tracking-wide flex gap-1 flex-wrap">{data.topics.map((e) => <span className="px-4 pt-1 pb-1.5 shadow-md block bg-indigo-500 rounded-full text-white">{e}</span>)}</p>
      </div>
    ) : ''
  );
}

export default Topics;

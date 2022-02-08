/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function Topics({ data }) {
  return (
    data.topics.length ? (
      <div className="mt-10">
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
          <Icon icon="uil:bookmark" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          Topics
        </div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-200 text-sm ml-1 tracking-wide flex gap-1 flex-wrap">{data.topics.map((e) => <span className="px-4 pt-1 pb-1.5 shadow-md block bg-custom-500 rounded-full text-zinc-200">{e}</span>)}</p>
      </div>
    ) : ''
  );
}

export default Topics;

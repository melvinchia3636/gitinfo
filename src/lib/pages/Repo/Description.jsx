/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function Description({ data }) {
  return (
    data.description || data.homepage ? (
      <div className="mt-10">
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="uil:info-circle" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          Description
        </div>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300 text-lg ml-1 tracking-wide">{data.description}</p>
        {data.homepage ? (
          <a href={data.homepage} target="_blank" rel="noreferrer" className="text-custom-500 dark:text-custom-400 mt-2 font-medium flex items-center gap-2 ml-1 tracking-wide">
            <Icon icon="uil:external-link-alt" className="w-5 h-5" />
            {data.homepage}
          </a>
        ) : ''}
      </div>
    ) : ''
  );
}

export default Description;

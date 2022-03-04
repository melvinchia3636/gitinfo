/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function License({ data }) {
  return (
    data.license ? (
      <div className="mt-10">
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="codicon:law" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          License
        </div>
        <p className="mt-3 text-zinc-600 dark:text-zinc-300 text-lg ml-1 tracking-wide">{data.license.name}</p>
      </div>
    ) : ''
  );
}

export default License;

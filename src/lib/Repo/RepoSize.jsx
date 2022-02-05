/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function RepoSize({ data }) {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="uil:file" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
        Repository Size
      </div>
      <p className="mt-3 text-zinc-600 dark:text-zinc-200 text-lg ml-1 tracking-wide">
        {(data.size / (data.size < 1024 ? 1 : 1024)).toFixed(2).toLocaleString()}
        {' '}
        {data.size < 1024 ? 'KB' : 'MB'}
      </p>
    </div>
  );
}

export default RepoSize;

/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function TimeOfCreation({ data }) {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="uil:clock" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
        Time of Creation
      </div>
      <p className="mt-3 text-zinc-600 dark:text-zinc-200 text-lg ml-1 tracking-wide">{new Date(data.created_at).toLocaleString()}</p>
    </div>
  );
}

export default TimeOfCreation;

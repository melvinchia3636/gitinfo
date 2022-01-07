/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function LastUpdated({ data }) {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
        <Icon icon="ic:round-refresh" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
        Last Updated
      </div>
      <p className="mt-3 text-slate-600 dark:text-gray-100 text-lg ml-1 tracking-wide">{new Date(data.updated_at).toLocaleString()}</p>
    </div>
  );
}

export default LastUpdated;
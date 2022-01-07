/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function License({ data }) {
  return (
    data.license ? (
      <div className="mt-10">
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="codicon:law" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          License
        </div>
        <p className="mt-3 text-slate-600 dark:text-gray-100 text-lg ml-1 tracking-wide">{data.license.name}</p>
      </div>
    ) : ''
  );
}

export default License;

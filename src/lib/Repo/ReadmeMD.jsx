/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';
import Readme from './Readme';

function ReadmeMD({ data }) {
  return (
    data.readmeContent ? (
      <div className="mt-10">
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="codicon:law" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          README.md
        </div>
        <Readme data={data} />
      </div>
    ) : ''
  );
}

export default ReadmeMD;

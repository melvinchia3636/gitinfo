/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';
import Readme from './Readme';

function ReadmeMD({ data }) {
  return (
    data.readmeContent ? (
      <div>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
          <Icon icon="codicon:law" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          README.md
        </div>
        <Readme data={data} />
      </div>
    ) : ''
  );
}

export default ReadmeMD;

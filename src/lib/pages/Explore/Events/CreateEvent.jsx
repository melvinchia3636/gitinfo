/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';

function CreateEvent({ e }) {
  return (
    <div>
      <div className="flex gap-2 text-xl overflow-hidden font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="octicon:repo-16" className="w-6 h-6 mt-1 flex-shrink-0 text-custom-500 dark:text-custom-400" />
        <div className="flex flex-col min-w-0">
          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            Created
            {' '}
            {e.payload.ref_type}
            {' '}
            {e.payload.ref_type === 'branch' ? (
              <>
                <span className="font-bold">{e.payload.ref}</span>
                {' '}
                in
                {' '}
              </>
            ) : ''}
            <a href={`/repo/${e.repo.name}`} target="_blank" rel="noreferrer" className="text-custom-500">{e.repo.name}</a>
          </p>
          <p className="text-sm text-zinc-400">{new Date(e.created_at).toDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;

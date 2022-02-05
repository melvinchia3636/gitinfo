/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Readme from '../../Repo/Readme';

function PushEvent({ e }) {
  return (
    <div>
      <div className="flex gap-2 text-xl overflow-hidden font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="octicon:repo-push-16" className="w-6 h-6 mt-1.5 flex-shrink-0 text-custom-500 dark:text-custom-400" />
        <div className="flex flex-col min-w-0">
          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            Created
            {' '}
            {e.payload.size}
            {' '}
            commits in
            {' '}
            <Link to={`/repo/${e.repo.name}`} className="font-bold">{e.repo.name}</Link>
          </p>
          <p className="text-sm text-zinc-400">{new Date(e.created_at).toDateString()}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {e.payload.commits.map((c) => (
          <div className="flex gap-3">
            <div className="text-custom-500 dark:text-zinc-200 bg-custom-200 dark:bg-custom-500 rounded-full w-[4.6rem] flex-shrink-0 text-sm flex justify-center py-0.5 h-min">{c.sha.slice(0, 7)}</div>
            <div className="-mt-[1.55rem]">
              <Readme data={{ readmeContent: c.message }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PushEvent;

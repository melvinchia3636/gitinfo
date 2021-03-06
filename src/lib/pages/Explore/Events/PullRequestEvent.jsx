/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';

function PullRequestEvent({ e }) {
  return (
    <div>
      <div className="flex gap-2 text-xl overflow-hidden font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
        <Icon icon="octicon:git-merge-16" className="w-6 h-6 mt-1 flex-shrink-0 text-custom-500 dark:text-custom-400" />
        <div className="flex flex-col min-w-0">
          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            {e.payload.action[0].toUpperCase() + e.payload.action.slice(1)}
            {' '}
            pull request
            {' '}
            for
            {' '}
            <a href={`/repo/${e.repo.name}`} target="_blank" rel="noreferrer" className="text-custom-500">{e.repo.name}</a>
          </p>
        </div>
      </div>
      <div className="w-full border mt-4 rounded-md border-zinc-300 dark:border-zinc-600 shadow-sm p-4">
        <div className="flex gap-2 text-xl overflow-hidden font-bold text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="octicon:git-pull-request-16" className={`w-5 h-5 mt-1 flex-shrink-0 ${e.payload.pull_request.state === 'closed' ? 'text-custom-500' : 'text-green-600'}`} />
          <p>
            {e.payload.pull_request.title}
            {' '}
            <span className="font-medium text-zinc-400">
              #
              {e.payload.pull_request.number}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 dark:text-zinc-300">
          <div className="bg-custom-100 dark:bg-transparent dark:border border-custom-500 whitespace-nowrap py-0.5 px-4 rounded-full">
            <span className="text-custom-500 ">{e.payload.pull_request.base.user.login}</span>
            :
            {e.payload.pull_request.base.ref}
          </div>
          <Icon icon="octicon:arrow-left-16" className="w-5 h-5" />
          <div className="bg-custom-100 dark:bg-transparent dark:border border-custom-500 py-0.5 px-4 rounded-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="text-custom-500">{e.payload.pull_request.head.user.login}</span>
            :
            {e.payload.pull_request.head.ref}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PullRequestEvent;

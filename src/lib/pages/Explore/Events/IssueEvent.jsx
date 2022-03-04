/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';
import emoji from 'emoji-dictionary';
import Readme from '../../Repo/Readme';

const reactionMap = {
  '+1': '+1',
  '-1': '-1',
  laugh: 'smile',
  hooray: 'tada',
  confused: 'confused',
  heart: 'heart',
  rocket: 'rocket',
  eyes: 'eyes',
};

function IssueEvent({ e }) {
  return (
    <div>
      <div className="flex gap-2 text-xl overflow-hidden font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="w-6 h-6 flex-shrink-0 text-custom-500 mt-1 dark:text-custom-400 iconify iconify--icon-park-outline" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path d="M24 44c8.235 0 15-6.526 15-14.902c0-2.056-.105-4.26-1.245-7.686c-1.14-3.426-1.369-3.868-2.574-5.984c-.515 4.317-3.27 6.117-3.97 6.655c0-.56-1.666-6.747-4.193-10.45C24.537 8 21.163 5.617 19.185 4c0 3.07-.863 7.634-2.1 9.96c-1.236 2.325-1.468 2.41-3.013 4.14c-1.544 1.73-2.253 2.265-3.545 4.365C9.236 24.565 9 27.362 9 29.418C9 37.794 15.765 44 24 44z" stroke="currentColor" strokeWidth="4.6" strokeLinejoin="round" fill="none" /></svg>
        <div className="flex flex-col min-w-0">
          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            {e.payload.action[0].toUpperCase() + e.payload.action.slice(1)}
            {' '}
            issue of
            {' '}
            <a href={`/repo/${e.repo.name}`} target="_blank" rel="noreferrer" className="text-custom-500">{e.repo.name}</a>
          </p>
          <p className="text-sm text-zinc-400">{new Date(e.created_at).toLocaleString()}</p>
        </div>
      </div>
      <div className="w-full border mt-4 rounded-md border-zinc-300 dark:border-zinc-600 shadow-sm p-4">
        <div className="flex gap-2 text-xl overflow-hidden font-bold text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon={`octicon:issue-${e.payload.issue.state === 'closed' ? 'closed' : 'opened'}-16`} className={`flex-shrink-0 w-5 h-5 mt-1 ${e.payload.issue.state === 'closed' ? 'text-custom-500' : 'text-green-600'}`} />
          <p>
            {e.payload.issue.title}
            {' '}
            <span className="font-medium text-zinc-400">
              #
              {e.payload.issue.number}
            </span>
          </p>
        </div>
        <Readme data={{ readmeContent: e.payload.issue.body }} />
        <div className="mt-4 flex items-center gap-4">
          <p className="text-md text-zinc-400">{new Date(e.payload.issue.created_at).toLocaleString()}</p>
          <div className="flex items-center gap-1.5">
            <Icon icon="uil:comment-alt" className="w-5 h-5 mb-0.5 text-custom-500" />
            {e.payload.issue.comments + 1}
          </div>
        </div>
        {Boolean(e.payload.issue.reactions.total) && (
        <div className="flex gap-1 mt-6 items-center -ml-1">
          <Icon icon="uil:smile" className="w-6 h-6 text-zinc-300 dark:text-zinc-500" />
          {Object.entries(e.payload.issue.reactions).slice(2).map(([k, v]) => (
            v ? (
              <div className="flex items-center gap-1 rounded-full px-2 border border-zinc-300 dark:border-zinc-600">
                <span>{emoji.getUnicode(reactionMap[k])}</span>
                <span className="text-sm">{v}</span>
              </div>
            ) : ''
          ))}
          <div className="ml-1 text-sm dark:text-zinc-500 hover:underline transition-all duration-200 hover:text-custom-500">
            {e.payload.issue.reactions.reactions.total_count}
            {' '}
            people reacted
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default IssueEvent;

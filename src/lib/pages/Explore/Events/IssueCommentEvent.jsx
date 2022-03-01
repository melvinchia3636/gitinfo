/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
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

function IssueCommentEvent({ e }) {
  return (
    <div>
      <div className="flex gap-2 text-xl overflow-hidden font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="uil:comment-alt" className="w-6 h-6 mt-1 flex-shrink-0 text-custom-500 dark:text-custom-400" />
        <div className="flex flex-col min-w-0">
          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            Commented on an issue of
            {' '}
            <Link to={`/repo/${e.repo.name}`} className="font-bold text-custom-500">{e.repo.name}</Link>
          </p>
          <p className="text-sm text-zinc-400">{new Date(e.created_at).toLocaleString()}</p>
        </div>
      </div>
      <div className="w-full border mt-4 rounded-md border-zinc-300 dark:border-zinc-600 shadow-sm p-4">
        <div className="flex gap-2 text-xl overflow-hidden font-bold text-zinc-600 dark:text-zinc-200 tracking-wide">
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
        <Readme data={{ readmeContent: e.payload.comment.body }} />
        <div className="mt-4 flex items-center gap-4">
          <p className="text-md text-zinc-400">{new Date(e.payload.comment.created_at).toLocaleString()}</p>
        </div>
        {Boolean(e.payload.comment.reactions.total) && (
        <div className="flex gap-1 mt-6 items-center -ml-1">
          <Icon icon="uil:smile" className="w-6 h-6 text-zinc-300 dark:text-zinc-500" />
          {Object.entries(e.payload.comment.reactions).slice(2).map(([k, v]) => (
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

export default IssueCommentEvent;

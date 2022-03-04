/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';
import {
  parseDiff, Diff, Hunk, Decoration,
} from 'react-diff-view';
import Readme from '../../Repo/Readme';

function Appdiff({ diffText }) {
  const files = parseDiff(diffText);

  const renderFile = ({
    oldPath, newPath, oldRevision, newRevision, type, hunks,
  }) => (
    <div key={`${oldRevision}-${newRevision}`} className="file-diff">
      <header className="diff-header">{oldPath === newPath ? oldPath : `${oldPath} -> ${newPath}`}</header>
      <Diff viewType="unified" diffType={type} hunks={hunks}>
        {(hunks) => hunks.map((hunk) => [
          <Decoration key={`deco-${hunk.content}`}>
            <div className="hunk-header">{hunk.content}</div>
          </Decoration>,
          <Hunk key={hunk.content} hunk={hunk} />,
        ])}
      </Diff>
    </div>
  );
  return <div>{files.map(renderFile)}</div>;
}

function PullRequestReviewCommentEvent({ e }) {
  const data = String.raw`
diff --git a/${e.payload.comment.path} b/${e.payload.comment.path}
index c3f75dc..2cda10e 100644
--- a/${e.payload.comment.path}
+++ b/${e.payload.comment.path}
${e.payload.comment.diff_hunk}
  `;

  return (
    <div className="min-w-0">
      <div className="flex min-w-0 gap-2 text-xl overflow-hidden font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
        <Icon icon="uil:eye" className="w-7 h-7 flex-shrink-0 text-custom-500 dark:text-custom-400" />
        <div className="flex flex-col min-w-0">
          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            Reviewed pull request
            {' '}
            for
            {' '}
            <a href={`/repo/${e.repo.name}`} target="_blank" rel="noreferrer" className="text-custom-500">{e.repo.name}</a>
          </p>
          <p className="text-sm text-zinc-400">{new Date(e.payload.comment.created_at).toLocaleString()}</p>
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
        <div className="-mt-4">
          <Readme data={{ readmeContent: e.payload.comment.body }} />
        </div>
        <div className="flex items-center overflow-x-auto gap-2 mt-4 text-sm dark:text-zinc-300">
          <Appdiff diffText={data} />
        </div>
      </div>
    </div>
  );
}

export default PullRequestReviewCommentEvent;

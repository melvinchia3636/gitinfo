/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';
import Readme from '../../Repo/Readme';
import { bytesToSize } from '../../Repo/Releases';

function ReleaseEvent({ e }) {
  return (
    <div className="flex flex-col min-w-0 w-full">
      <div className="flex gap-2 text-xl overflow-hidden font-medium text-zinc-600 dark:text-zinc-200 tracking-wide min-w-0 w-full">
        <Icon icon="uil:box" className="w-7 h-7 mt-1 flex-shrink-0 text-custom-500 dark:text-custom-400" />
        <div className="flex flex-col min-w-0 w-full">
          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis min-w-0">
            Created release in
            {' '}
            <a href={`/repo/${e.repo.name}`} target="_blank" rel="noreferrer" className="text-custom-500">{e.repo.name}</a>
          </p>
          <p className="text-sm text-zinc-400">{new Date(e.created_at).toDateString()}</p>
        </div>
      </div>
      <div className="w-full p-6">
        <h4 className="text-4xl font-bold">{e.payload.release.name}</h4>
        <div className="text-lg flex mt-2 gap-6">
          <div className="flex items-center gap-2">
            <Icon icon="uil:tag-alt" className="w-5 h-5 text-custom-500" />
            {e.payload.release.tag_name}
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="ph:git-commit-bold" className="w-5 h-5 text-custom-500" />
            {e.payload.release.target_commitish.slice(0, 6)}
          </div>
        </div>
        <Readme data={{ readmeContent: e.payload.release.body }} />
        <div className="mt-6">
          <h5 className="text-2xl">
            Assets
            {' '}
            <span className="text-xs mt-1">
              (
              {e.payload.release.assets.length + 2}
              )
            </span>
          </h5>
          <div className="flex flex-col gap-2 mt-3">
            {e.payload.release.assets.map((a) => (
              <div className="flex items-center gap-1 text-lg">
                <Icon icon="uil:cube" className="text-custom-500 w-6 h-6" />
                <a href={a.browser_download_url} target="_blank" rel="noopener noreferrer">{a.name}</a>
                <span className="text-xs mt-1">
                  (
                  {bytesToSize(a.size)}
                  )
                </span>
              </div>
            ))}
            <div className="flex items-center gap-1 text-lg">
              <Icon icon="tabler:file-zip" className="text-custom-500 w-6 h-6" />
              <a href={e.payload.release.zipball_url} target="_blank" rel="noopener noreferrer">Source code (zip)</a>
            </div>
            <div className="flex items-center gap-1 text-lg">
              <Icon icon="tabler:file-zip" className="text-custom-500 w-6 h-6" />
              <a href={e.payload.release.tarball_url} target="_blank" rel="noopener noreferrer">Source code (.tar.gz)</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReleaseEvent;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import FETCH_HEADERS from '../constants';

function Tags({
  data, nextTagsPage, setNextTagsPage, setData,
}) {
  const [isTagsLoading, setTagsLoading] = useState(false);

  const fetchNextTagsPage = () => {
    setTagsLoading(true);
    fetch(`${data.tags_url.replace(/\{.*?\}/, '')}?page=${nextTagsPage}&per_page=10`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, tags: data.tags.concat(e) });
      if (e.length === 10) {
        setNextTagsPage(nextTagsPage + 1);
      } else {
        setNextTagsPage(null);
      }
      setTagsLoading(false);
    });
  };

  return (
    data.tags.length ? (
      <div className="mt-8">
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="uil:box" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          Tags
          <span className="text-xs mt-2">
            (
            {data.tagsCount.toLocaleString()}
            )
          </span>
        </div>
        <div className="mt-7 flex flex-col text-slate-600 dark:text-white">
          {data.tags.map((e, i) => (
            <div className={`w-full p-6 ${i ? 'border-t border-slate-300 dark:border-zinc-500 pt-7' : 'pt-0'}`}>
              <h4 className="text-2xl font-bold">{e.name}</h4>
              <div className="flex items-center gap-6 mt-2 -ml-1">
                <div className="flex items-center gap-1 text-lg">
                  <Icon icon="tabler:file-zip" className="text-indigo-500 w-6 h-6" />
                  <a href={e.zipball_url} target="_blank" rel="noopener noreferrer">zip</a>
                </div>
                <div className="flex items-center gap-1 text-lg">
                  <Icon icon="tabler:file-zip" className="text-indigo-500 w-6 h-6" />
                  <a href={e.tarball_url} target="_blank" rel="noopener noreferrer">.tar.gz</a>
                </div>
                <div className="flex items-center gap-1 text-lg">
                  <Icon icon="ph:git-commit-bold" className="text-indigo-500 w-6 h-6" />
                  <p>{e.commit.sha.slice(0, 6)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {nextTagsPage ? (
          <button onClick={fetchNextTagsPage} type="button" className="text-lg text-white h-14 w-full bg-indigo-500 rounded-md shadow-md mt-6">
            {isTagsLoading ? 'Loading...' : 'Load more'}
          </button>
        ) : ''}
      </div>
    ) : ''
  );
}

export default Tags;

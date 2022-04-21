/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import FETCH_HEADERS from '../../../constants';
import colors from '../../../assets/colors.json';

function Repo({ query }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/search/repositories?q=${query || ''}`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [query]);

  return (
    <div className="mt-4 pb-12 overflow-y-auto">
      {data?.items?.length > 0 && data.items.map((e) => (
        <a href={`/repo/${e.full_name}`} target="_blank" rel="noreferrer" className="w-full p-4 border-b border-zinc-300 dark:border-zinc-600 block text-zinc-600 dark:text-zinc-300">
          <h3 className="text-3xl font-semibold text-custom-500 break-all">{e.name}</h3>
          {e.description && <p className="text-lg pl-0.5 mt-2">{e.description}</p>}
          <div className="text-lg flex mt-4 gap-x-6 gap-y-2 flex-wrap">
            {e.language && (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 inline-block rounded-full mb-0.5" style={{ backgroundColor: colors[e.language]?.color }} />
              {e.language}
            </div>
            )}
            <div className="flex items-center gap-2">
              <Icon icon="uil:star" className="w-5 h-5 mb-0.5 text-custom-500" />
              {e.stargazers_count.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="uil:eye" className="w-5 h-5 mb-0.5 text-custom-500" />
              {e.watchers_count.toLocaleString()}
            </div>
            {e.forks_count > 0 && (
            <div className="flex items-center gap-1.5">
              <Icon icon="jam:fork" className="w-5 h-5 mb-0.5 text-custom-500" />
              {e.forks_count.toLocaleString()}
            </div>
            )}
            {e.open_issues > 0 && (
            <div className="flex items-center gap-1.5">
              <Icon icon="octicon:issue-opened-16" className="w-4 h-4 mb-0.5 text-custom-500 stroke-[0.5px] stroke-custom-500 overflow-visible" />
              {e.open_issues.toLocaleString()}
            </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}

export default Repo;

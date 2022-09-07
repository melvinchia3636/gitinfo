/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import color from './assets/colors.json';
import FETCH_HEADERS from './constants';
import { hexIsLight } from './pages/Repo/Issues';

function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);

  const fetchResult = async (e) => {
    e.preventDefault();
    if (query) {
      setFirstSearch(false);
      setLoading(true);
      const org = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}+type:org`, FETCH_HEADERS).then((res) => res.json());
      const users = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}+type:user`, FETCH_HEADERS).then((res) => res.json());
      const repo = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`, FETCH_HEADERS).then((res) => res.json());
      setResult({ org, users, repo });
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full pb-8 transition-none">
      <div className="relative z-10 w-full mx-0 mt-4 mb-16 overflow-hidden rounded-lg shadow-lg bg-zinc-50 dark:bg-zinc-700 440:mx-6 sm:mx-24 md:mx-32 lg:mx-0 lg:w-1/2">
        <form onSubmit={fetchResult} className="flex items-center gap-4">
          <Icon icon="uil:search" className="flex-shrink-0 w-6 h-6 ml-4 text-zinc-300" />
          <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search Github" className="w-full py-4 text-xl placeholder-zinc-300 caret-custom-500 focus:border-none focus:outline-none text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-700" />
          <button aria-label="search" type="submit" className="flex items-center h-full p-3 py-3 m-1 text-lg bg-custom-500 rounded-md text-zinc-100 gap-1"><Icon icon="uil:arrow-right" className="w-8 h-8" /></button>
        </form>
        {!isLoading ? (
          <div className={`border-t-zinc-50 dark:border-t-zinc-500 max-h-[24rem] overflow-y-scroll transition-all duration-500 flex flex-col gap-4 px-4 ${result?.users?.items?.length || result?.repo?.items?.length ? 'py-4 border-t-2' : '0'}`}>
            {result?.users?.items?.length || result?.repo?.items?.length ? (
              <>
                {result?.repo?.items?.length ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="mb-2 text-zinc-300">Repositories</h2>
                      <Link to={`/search/repo?q=${encodeURIComponent(query)}`} className="text-xs font-medium text-zinc-300">See more</Link>
                    </div>
                    <div>
                      {result.repo.items.slice(0, 5).map((e) => (
                        <Link to={`/repo/${e.full_name}`} className="flex items-center px-2 py-2 border-b gap-3 border-zinc-50 dark:border-zinc-600 hover:bg-custom-50 dark:hover:bg-zinc-600 transition-all duration-200 hover:rounded-md">
                          <span className={`bg-custom-500 px-4 whitespace-nowrap py-1 ${hexIsLight(color[e.language]?.color || '#000000') ? 'text-zinc-600' : 'text-zinc-50'} font-medium text-xs rounded-full`} style={{ backgroundColor: color[e.language]?.color }}>{e.language || 'NaN'}</span>
                          <h3 className="text-lg text-zinc-600 dark:text-zinc-300 w-[99%] overflow-hidden whitespace-nowrap overflow-ellipsis">{e.full_name}</h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : ''}
                {result?.users?.items?.length ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="mb-2 text-zinc-300">Users</h2>
                      <Link to={`/search/user?q=${encodeURIComponent(query)}`} className="text-xs font-medium text-zinc-300">See more</Link>
                    </div>
                    <div>
                      {result.users.items.slice(0, 5).map((e) => (
                        <Link to={`/user/${e.login}`} className="flex items-center px-2 py-2 border-b gap-4 border-zinc-50 dark:border-zinc-600 hover:bg-custom-50 dark:hover:bg-zinc-600 transition-all duration-200 hover:rounded-md">
                          <img src={e.avatar_url} alt={e.login} className="w-8 h-8 rounded-full" />
                          <h3 className="text-lg text-zinc-600 dark:text-zinc-300">{e.login}</h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : ''}
                {result?.org?.items?.length ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="mb-2 text-zinc-300">Organizations</h2>
                      <Link to={`/search/org?q=${encodeURIComponent(query)}`} className="text-xs font-medium text-zinc-300">See more</Link>
                    </div>
                    <div>
                      {result.org.items.slice(0, 5).map((e) => (
                        <Link to={`/user/${e.login}`} className="flex items-center px-2 py-2 border-b gap-4 border-zinc-50 dark:border-zinc-600 hover:bg-custom-50 dark:hover:bg-zinc-600 transition-all duration-200 hover:rounded-md">
                          <img src={e.avatar_url} alt={e.login} className="w-8 h-8 rounded-full" />
                          <h3 className="text-lg text-zinc-600 dark:text-zinc-300">{e.login}</h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : ''}
              </>
            ) : (!firstSearch ? <p className="p-4 text-center text-zinc-400">No results were found.</p> : '')}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full min-h-0 px-4 py-4 transition-none">
            <svg className="spinner" viewBox="0 0 50 50">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
            </svg>
          </div>
        )}
      </div>
      <p className="absolute w-full px-8 text-center left-1/2 bottom-4 transform -translate-x-1/2 text-zinc-600 dark:text-zinc-300">
        Created by
        {' '}
        <a href="https://thecodeblog.net" className="underline text-custom-500">Melvin Chia</a>
        {' '}
        with 💖. Project under MIT license.
      </p>
    </div>
  );
}

export default Home;

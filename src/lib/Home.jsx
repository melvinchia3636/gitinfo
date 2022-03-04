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
    <div className="h-full w-full flex items-center justify-center pb-8 transition-none">
      <div className="bg-zinc-50 dark:bg-zinc-700 relative z-10 mt-4 rounded-lg shadow-lg overflow-hidden w-full mx-0 440:mx-6 sm:mx-24 md:mx-32 lg:mx-0 lg:w-1/2">
        <form onSubmit={fetchResult} className="flex items-center gap-4">
          <Icon icon="uil:search" className="w-6 h-6 ml-4 text-zinc-300 flex-shrink-0" />
          <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search Github" className="placeholder-zinc-300 caret-custom-500 py-4 w-full text-xl focus:border-none focus:outline-none text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-700" />
          <button aria-label="search" type="submit" className="bg-custom-500 text-lg py-3 m-1 rounded-md text-zinc-200 h-full p-3 flex items-center gap-1"><Icon icon="uil:arrow-right" className="w-8 h-8" /></button>
        </form>
        {!isLoading ? (
          <div className={`border-t-zinc-50 dark:border-t-zinc-500 max-h-[24rem] overflow-y-scroll transition-all duration-500 flex flex-col gap-4 px-4 ${result?.users?.items?.length || result?.repo?.items?.length ? 'py-4 border-t-2' : '0'}`}>
            {result?.users?.items?.length || result?.repo?.items?.length ? (
              <>
                {result?.users?.items?.length ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-zinc-300 mb-2">Users</h2>
                      <a href="/" className="text-xs font-medium text-zinc-300">See more</a>
                    </div>
                    <div>
                      {result.users.items.slice(0, 5).map((e) => (
                        <Link to={`/user/${e.login}`} className="flex items-center gap-4 py-2 border-b border-zinc-50 dark:border-zinc-600 px-2 hover:bg-custom-50 dark:hover:bg-zinc-500 transition-all duration-200 hover:rounded-md">
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
                      <h2 className="text-zinc-300 mb-2">Organizations</h2>
                      <a href="/" className="text-xs font-medium text-zinc-300">See more</a>
                    </div>
                    <div>
                      {result.org.items.slice(0, 5).map((e) => (
                        <Link to={`/user/${e.login}`} className="flex items-center gap-4 py-2 border-b border-zinc-50 dark:border-zinc-600 px-2 hover:bg-custom-50 dark:hover:bg-zinc-500 transition-all duration-200 hover:rounded-md">
                          <img src={e.avatar_url} alt={e.login} className="w-8 h-8 rounded-full" />
                          <h3 className="text-lg text-zinc-600 dark:text-zinc-300">{e.login}</h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : ''}
                {result?.repo?.items?.length ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-zinc-300 mb-2">Repositories</h2>
                      <a href="/" className="text-xs font-medium text-zinc-300">See more</a>
                    </div>
                    <div>
                      {result.repo.items.slice(0, 5).map((e) => (
                        <Link to={`/repo/${e.full_name}`} className="flex items-center gap-3 py-2 border-b border-zinc-50 dark:border-zinc-600 px-2 hover:bg-custom-50 dark:hover:bg-zinc-500 transition-all duration-200 hover:rounded-md">
                          <span className={`bg-custom-500 px-4 whitespace-nowrap py-1 ${hexIsLight(color[e.language]?.color || '#000000') ? 'text-zinc-600' : 'text-zinc-50'} font-medium text-xs rounded-full`} style={{ backgroundColor: color[e.language]?.color }}>{e.language || 'NaN'}</span>
                          <h3 className="text-lg text-zinc-600 dark:text-zinc-300 w-[99%] overflow-hidden whitespace-nowrap overflow-ellipsis">{e.full_name}</h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : ''}
              </>
            ) : (!firstSearch ? <p className="text-center p-4 text-zinc-400">No results were found.</p> : '')}
          </div>
        ) : (
          <div className="w-full min-h-0 h-full flex items-center justify-center transition-none py-4 px-4">
            <svg className="spinner" viewBox="0 0 50 50">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
            </svg>
          </div>
        )}
      </div>
      <p className="w-full px-8 absolute left-1/2 bottom-4 transform -translate-x-1/2 text-zinc-600 dark:text-zinc-300 text-center">
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

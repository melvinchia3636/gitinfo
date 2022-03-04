import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

function Emojis() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({});
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/emojis').then((res) => res.json()).then((d) => setData(d));
  }, []);

  return (
    <div className="overflow-y-auto text-zinc-600 dark:text-zinc-300 flex h-full mt-4 flex-col overflow-x-hidden">
      <div className="px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-bold text-3xl flex items-end">
          <span>
            Github
            {' '}
            <span className="text-custom-500">Emojis</span>
          </span>
          <span className="text-sm mb-1.5 block ml-2">
            (
            {Object.entries(data).length}
            )
          </span>
        </h3>
        <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-700 p-4 rounded-lg shadow-md w-full sm:w-auto">
          <Icon icon="uil:search" className="w-6 h-6 text-zinc-300 flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search emojis"
            className="bg-transparent w-full placeholder-zinc-300 text-lg focus:outline-none"
          />
        </div>
      </div>
      {JSON.stringify(data) !== '{}' ? (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] mt-4 gap-2 min-w-0 px-4 py-4">
          {Object
            .entries(data)
            .filter(([name]) => (
              query ? name.toLowerCase().includes(query.toLowerCase()) : true
            )).map(
              ([name, images]) => (
                <div className="flex items-center justify-center px-4 py-6 flex-col gap-8 bg-zinc-50 dark:bg-zinc-700 rounded-lg shadow-md">
                  <img src={images} alt={name} />
                  <p className="break-all text-center">{name}</p>
                </div>
              ),
            )}
        </div>
      ) : (
        <div className="w-full min-h-0 h-full flex items-center justify-center pb-32 mt-6 transition-none">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default Emojis;

import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import ReactStickyBox from 'react-sticky-box';
import FETCH_HEADERS from '../../constants';
import colors from '../../assets/colors.json';

function Templates() {
  const [section, setSection] = useState(0);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/${['gitignore/templates', 'licenses'][section]}`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      });
  }, [section]);

  useEffect(() => { console.log(data); }, [data]);

  return (
    <>
      <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-200">
        <h3 className="font-bold text-3xl flex items-end">
          <span>
            Github
            {' '}
            <span className="text-custom-500">Templates</span>
          </span>
        </h3>
        <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-600 p-4 rounded-lg shadow-md">
          <Icon icon="uil:search" className="w-6 h-6 text-zinc-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates"
            className="bg-transparent placeholder-zinc-300 text-lg focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-start justify-between gap-8 mt-6 h-full overflow-y-auto">
        <ReactStickyBox>
          <div className="flex flex-col gap-4 mb-4 text-zinc-600 dark:text-zinc-200 text-lg">
            {[['uil:github-alt',
              'Gitignore'],
            ['octicon:law-16', 'License'],
            ].map(([icon, name], index) => (
              <button onClick={() => setSection(index)} className={`flex items-center transition-all gap-3 w-48 text-left px-4 py-2 pt-2.5 rounded-md ${section === index ? 'text-white bg-custom-500 shadow-md' : ''}`} type="button">
                <Icon icon={icon} className={icon.startsWith('octicon') ? 'w-[1.3rem] h-[1.3rem]' : 'w-6 h-6'} />
                {name}
              </button>
            ))}
          </div>
        </ReactStickyBox>
        <div className="min-w-0 pb-8 flex-1 flex flex-col text-zinc-600 dark:text-zinc-200">
          {data.length > 0 && (
            section === 0 && typeof data[0] === 'string' ? data.filter((e) => (query ? e.toLowerCase().includes(query.toLowerCase()) : true)).map((e) => (
              <div className="px-2 py-4 border-b border-gray-300 text-lg flex items-center gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:border-zinc-600 duration-300 hover:rounded-md">
                <span className="w-4 h-4 rounded-full block shadow-sm" style={{ backgroundColor: ((Object.entries(colors).filter(([name]) => name.toLowerCase() === e.toLowerCase()))[0] || [])[1]?.color || 'white' }} />
                {e}
              </div>
            )) : data.filter((e) => (
              query ? e.name.toLowerCase().includes(query.toLowerCase()) : true
            )).map((e) => (
              <div className="px-2 py-4 border-b border-gray-300 text-lg flex items-center gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:border-zinc-600 duration-300 hover:rounded-md">
                <span className="w-28 flex items-center font-bold justify-center py-1 text-custom-500 bg-custom-100 dark:bg-custom-500 dark:text-zinc-200 overflow-hidden rounded-full text-sm shadow-sm whitespace-nowrap">{e.key}</span>
                {e.name}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Templates;

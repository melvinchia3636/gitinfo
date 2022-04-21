/* eslint-disable no-unused-vars */
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Repo from './type/Repo';

function Search() {
  const params = useParams();
  const queryParams = useSearchParams();
  const query = queryParams[0].get('q');
  const { type } = params;
  const [openTypeSelector, setOpenTypeSelector] = useState(false);
  const TYPES = {
    repo: 'Repositories', user: 'Users', org: 'Organizatons',
  };

  return (
    <>
      <h3 className="font-bold text-3xl gap-2 flex items-end whitespace-nowrap">
        Search
        <div className="relative">
          <button onClick={() => setOpenTypeSelector(!openTypeSelector)} type="button" className="text-custom-500 -mr-1 flex items-center gap-0.5">
            {TYPES[type]}
            <Icon icon="uil:angle-down" className="w-6 h-6 stroke-[0.6px] stroke-custom-500 mt-[3px]" />
          </button>
          <div className={`absolute -bottom-2 left-0 w-48 text-zinc-600 dark:text-zinc-300 text-lg text-left rounded-md shadow-lg translate-y-full bg-zinc-700 flex flex-col overflow-hidden transition-all duration-700 font-normal ${openTypeSelector ? 'max-h-48 py-2' : 'max-h-0 py-0'}`}>
            {Object.entries(TYPES).map(([link, name]) => (
              <Link className={`px-4 py-2 hover:bg-custom-50 dark:hover:bg-zinc-600 flex justify-between items-center ${link === type ? 'text-custom-500 font-semibold' : ''}`} to={`/search/${link}?q=${query}`}>
                {name}
                {link === type && <Icon icon="uil:check" />}
              </Link>
            ))}
          </div>
        </div>
        on Github
      </h3>
      <Repo query={query} />
    </>
  );
}

export default Search;

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FETCH_HEADERS from '../../../constants';

function Repo({ query }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${query || ''}+type:org`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [query]);

  return (
    <div className="mt-4 pb-12 overflow-y-auto">
      {data?.items?.length > 0 && data.items.map((e) => (
        <Link to={`/user/${e.login}`} className="py-4 px-2 flex flex-col border-b border-zinc-300 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-600 duration-300 hover:rounded-md">
          <div className="flex items-center gap-4">
            <img src={e.avatar_url} alt={e.login} className="rounded-full w-8 h-8" />
            <h3 className="text-xl text-custom-500 font-semibold">{e.login}</h3>
          </div>
          {e.description?.length > 0 && <p className="mt-2">{e.description}</p>}
        </Link>
      ))}
    </div>
  );
}

export default Repo;

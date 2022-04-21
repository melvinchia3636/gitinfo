/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FETCH_HEADERS from '../../../constants';

function Repo({ query }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${query || ''}+type:user`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [query]);

  return (
    <div className="mt-4 pb-12 overflow-y-auto">
      {data?.items?.length > 0 && data.items.map((e) => (
        <Link to={`/user/${e.login}`} className="py-4 px-2 flex border-b border-zinc-300 dark:border-zinc-600 gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-2000 duration-300 hover:rounded-md">
          <img src={e.avatar_url} alt={e.login} className="rounded-full w-8 h-8" />
          <h3 className="text-xl">{e.login}</h3>
        </Link>
      ))}
    </div>
  );
}

export default Repo;

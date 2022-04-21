/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FETCH_HEADERS from '../../../constants';

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
        <div className="py-4 px-4 border-b border-zinc-300 dark:border-zinc-600 gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-600 duration-300 hover:rounded-md">
          <h3 className="text-2xl">
            <Link className="text-custom-500" to={`/user/${e.owner.login}`}>{e.owner.login}</Link>
            {' '}
            /
            {' '}
            <Link className="text-custom-500" to={`/repo/${e.full_name}`}>{e.name}</Link>
          </h3>
          <p>{e.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Repo;

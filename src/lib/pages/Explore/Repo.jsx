import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FETCH_HEADERS from '../../constants';

function Repo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/repositories', FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div>
      {data.map((e) => (
        <div className="py-4 px-2 border-b border-zinc-300 gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-500 duration-300 hover:rounded-md">
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

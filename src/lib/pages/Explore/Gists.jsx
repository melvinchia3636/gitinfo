import React, { useState, useEffect } from 'react';
import FETCH_HEADERS from '../../constants';

function Gist() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/gists/public', FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  return (
    <div>
      {data.map((e) => (
        <div className="py-4 px-2 border-b border-zinc-300 gap-4">
          <div className="flex items-center gap-2 text-lg">
            <img src={e.owner.avatar_url} alt={e.owner.login} className="w-6 h-6 rounded-full" />
            {e.owner.login}
          </div>
          <p className="text-lg mt-2">{e.description}</p>
          <div className="mt-4 flex flex-col gap-2">
            {Object.values(e.files).map((f) => (
              <div className="shadow-md rounded-md p-4 flex flex-col w-full bg-zinc-50">
                <h3 className="text-lg text-custom-500 whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {f.filename}
                </h3>
                <div className="flex items-center gap-6">
                  <p className="text-zinc-400">
                    {f.type}
                    {' - '}
                    {(f.size / (f.size < 1024 ? 1 : 1024)).toFixed(2).toLocaleString()}
                    {' '}
                    {f.size < 1024 ? 'KB' : 'MB'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mt-4">
            Created at
            {' '}
            {new Date(e.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Gist;

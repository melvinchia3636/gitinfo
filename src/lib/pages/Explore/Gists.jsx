import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Gist() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(2);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/gists/public?per_page=30', FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const fetchNextPage = () => {
    setLoading(true);
    fetch(`https://api.github.com/gists/public?page=${nextPage}&per_page=30`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((e) => {
        setData([...data, ...e]);
        if (e.length === 30) {
          setNextPage(nextPage + 1);
        } else {
          setNextPage(null);
        }
        setLoading(false);
      });
  };

  return (
    data.length ? (
      <div className="pb-8">
        {data.map((e) => (
          <div className="py-4 px-2 border-b border-zinc-300 dark:border-zinc-600 gap-4">
            <div className="flex items-center gap-2 text-lg">
              <img src={e.owner.avatar_url} alt={e.owner.login} className="w-6 h-6 rounded-full" />
              {e.owner.login}
            </div>
            <p className="text-lg mt-2">{e.description}</p>
            <div className="mt-4 flex flex-col gap-2">
              {Object.values(e.files).map((f) => (
                <div className="shadow-md rounded-md p-4 flex flex-col w-full bg-zinc-50 dark:bg-zinc-600">
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
        {nextPage ? (
          <button onClick={fetchNextPage} type="button" className="text-lg text-zinc-200 h-14 w-full bg-custom-500 rounded-md shadow-md mt-8">
            {isLoading ? (
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: loadingWhiteAnim,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                height={40}
                width={40}
                isStopped={false}
                isPaused={false}
              />
            ) : 'Load more'}
          </button>
        ) : ''}
      </div>
    ) : ''
  );
}

export default Gist;
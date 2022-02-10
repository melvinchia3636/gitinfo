import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Organization() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(2);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/organizations', FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const fetchNextPage = () => {
    setLoading(true);
    fetch(`https://api.github.com/organizations?since=${data[data.length - 1].id}`, FETCH_HEADERS)
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
          <Link to={`/user/${e.login}`} className="py-4 px-2 flex flex-col border-b border-zinc-300 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-500 duration-300 hover:rounded-md">
            <div className="flex items-center gap-4">
              <img src={e.avatar_url} alt={e.login} className="rounded-full w-8 h-8" />
              <h3 className="text-xl text-custom-500 font-semibold">{e.login}</h3>
            </div>
            {e.description?.length > 0 && <p className="mt-2">{e.description}</p>}
          </Link>
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

export default Organization;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function User() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(2);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users', FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const fetchNextPage = () => {
    setLoading(true);
    fetch(`https://api.github.com/users?since=${data[data.length - 1].id}`, FETCH_HEADERS)
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
          <Link to={`/user/${e.login}`} className="py-4 px-2 flex border-b border-zinc-300 dark:border-zinc-600 gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-2000 duration-300 hover:rounded-md">
            <img src={e.avatar_url} alt={e.login} className="rounded-full w-8 h-8" />
            <h3 className="text-xl">{e.login}</h3>
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
    ) : (
      <div className="w-full min-h-0 h-full flex items-center justify-center pb-32 mt-6 transition-none">
        <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
        </svg>
      </div>
    )
  );
}

export default User;

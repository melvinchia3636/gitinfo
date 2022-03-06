import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Repo() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(2);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/repositories', FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const fetchNextPage = () => {
    setLoading(true);
    fetch(`https://api.github.com/repositories?since=${data[data.length - 1].id}`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((e) => {
        setData([...data, ...e]);
        if (e.length === 100) {
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
          <div className="py-4 px-4 border-b border-zinc-300 dark:border-zinc-600 gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-2000 duration-300 hover:rounded-md">
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
        {nextPage ? (
          <button onClick={fetchNextPage} type="button" className="text-lg text-zinc-100 h-14 w-full bg-custom-500 rounded-md shadow-md mt-8">
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

export default Repo;

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Stargazers({
  data, setData,
}) {
  const [isStargazersLoading, setStargazersLoading] = useState(false);
  const [nextStargazersPage, setNextStargazersPage] = useState(1);

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS).then((res) => res.json()).then(async ({ resources: { core } }) => {
      if (core.remaining) {
        const stargazers = await fetch(`${data.stargazers_url.replace(/\{.*?\}/, '')}?per_page=90`, FETCH_HEADERS).then((r) => r.json());

        if (data.stargazers_count > 90) setNextStargazersPage(2);
        else setNextStargazersPage(null);

        setData({
          ...data,
          stargazers,
        });
      }
    });
  }, []);

  const fetchNextStargazersPage = () => {
    setStargazersLoading(true);
    fetch(`${data.stargazers_url}?page=${nextStargazersPage}&per_page=90`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, stargazers: data.stargazers.concat(e) });
      if (e.length === 90) {
        setNextStargazersPage(nextStargazersPage + 1);
      } else {
        setNextStargazersPage(null);
      }
      setStargazersLoading(false);
    });
  };

  return (
    data.stargazers?.length ? (
      <div>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="uil:star" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          Stargazers
          <span className="text-xs mt-2">
            (
            {data.stargazers_count.toLocaleString()}
            )
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-5 gap-y-5 mt-6 flex-wrap">
          {data.stargazers.map((e) => (
            <Link to={`/user/${e.login}`} className="text-zinc-600 truncate dark:text-zinc-300 text-lg block items-center">
              <img src={e.avatar_url} alt={e.login} className="w-6 h-6 rounded-full inline mr-3" />
              {e.login}
            </Link>
          ))}
        </div>
        {nextStargazersPage ? (
          <button onClick={fetchNextStargazersPage} type="button" className="text-lg text-zinc-100 h-14 w-full bg-custom-500 rounded-md shadow-md mt-8">
            {isStargazersLoading ? (
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

export default Stargazers;

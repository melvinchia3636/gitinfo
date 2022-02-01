/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../constants';
import loadingWhiteAnim from '../assets/loading-white.json';

function Stargazers({
  data, nextStargazersPage, setNextStargazersPage, setData,
}) {
  const [isStargazersLoading, setStargazersLoading] = useState(false);
  const fetchNextStargazersPage = () => {
    setStargazersLoading(true);
    fetch(`${data.stargazers_url}?page=${nextStargazersPage}&per_page=30`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, stargazers: data.stargazers.concat(e) });
      if (e.length === 30) {
        setNextStargazersPage(nextStargazersPage + 1);
      } else {
        setNextStargazersPage(null);
      }
      setStargazersLoading(false);
    });
  };

  return (
    data.stargazers.length ? (
      <div className="mt-10">
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="uil:star" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          Stargazers
          <span className="text-xs mt-2">
            (
            {data.stargazers_count.toLocaleString()}
            )
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-5 gap-y-3 mt-4 flex-wrap">
          {data.stargazers.map((e) => (
            <Link to={`/user/${e.login}`} className="text-slate-600 break-all dark:text-gray-100 text-lg flex items-center gap-2">
              <img src={e.avatar_url} alt={e.login} className="w-6 h-6 rounded-full" />
              {e.login}
            </Link>
          ))}
        </div>
        {nextStargazersPage ? (
          <button onClick={fetchNextStargazersPage} type="button" className="text-lg text-white h-14 w-full bg-indigo-500 rounded-md shadow-md mt-4">
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
    ) : ''
  );
}

export default Stargazers;
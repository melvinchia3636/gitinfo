/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../constants';
import loadingWhiteAnim from '../assets/loading-white.json';

function Subscribers({
  data, nextSubscribersPage, setNextSubscribersPage, setData,
}) {
  const [isSubscribersLoading, setSubscribersLoading] = useState(false);
  const fetchNextSubscribersPage = () => {
    setSubscribersLoading(true);
    fetch(`${data.subscribers_url}?page=${nextSubscribersPage}&per_page=90`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, subscribers: data.subscribers.concat(e) });
      if (e.length === 90) {
        setNextSubscribersPage(nextSubscribersPage + 1);
      } else {
        setNextSubscribersPage(null);
      }
      setSubscribersLoading(false);
    });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
        <Icon icon="uil:eye" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
        Subscribers
        <span className="text-xs mt-2">
          (
          {data.subscribers_count.toLocaleString()}
          )
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-5 gap-y-3 mt-4 flex-wrap">
        {data.subscribers.map((e) => (
          <Link to={`/user/${e.login}`} className="text-slate-600 break-all dark:text-gray-100 text-lg flex items-center gap-2">
            <img src={e.avatar_url} alt={e.login} className="w-6 h-6 rounded-full" />
            {e.login}
          </Link>
        ))}
      </div>
      {nextSubscribersPage ? (
        <button onClick={fetchNextSubscribersPage} type="button" className="text-lg text-white h-14 w-full bg-indigo-500 rounded-md shadow-md mt-4">
          {isSubscribersLoading ? (
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
  );
}

export default Subscribers;

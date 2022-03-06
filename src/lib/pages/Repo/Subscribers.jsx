/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Subscribers({
  data, setData,
}) {
  const [isSubscribersLoading, setSubscribersLoading] = useState(false);
  const [nextSubscribersPage, setNextSubscribersPage] = useState(1);

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS).then((res) => res.json()).then(async ({ resources: { core } }) => {
      if (core.remaining) {
        const subscribers = await fetch(`${data.subscribers_url.replace(/\{.*?\}/, '')}?per_page=90`, FETCH_HEADERS).then((r) => r.json());
        const subscribersCount = await fetch(`${data.subscribers_url.replace(/\{.*?\}/, '')}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 0);

        if (subscribersCount > 90) setNextSubscribersPage(2);
        else setNextSubscribersPage(null);

        setData({
          ...data,
          subscribers,
          subscribersCount,
        });
      }
    });
  }, []);

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
    data.subscribers?.length ? (
      <>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="uil:eye" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          Subscribers
          <span className="text-xs mt-2">
            (
            {data.subscribers_count.toLocaleString()}
            )
          </span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-5 gap-y-5 mt-4 flex-wrap">
          {data.subscribers.map((e) => (
            <Link to={`/user/${e.login}`} className="text-zinc-600 truncate dark:text-zinc-300 text-lg block items-center">
              <img src={e.avatar_url} alt={e.login} className="w-6 h-6 rounded-full inline mr-3" />
              {e.login}
            </Link>
          ))}
        </div>
        {nextSubscribersPage ? (
          <button onClick={fetchNextSubscribersPage} type="button" className="text-lg text-zinc-100 h-14 w-full bg-custom-500 rounded-md shadow-md mt-8">
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
      </>
    ) : (
      <div className="w-full min-h-0 h-full flex items-center justify-center pb-32 mt-6 transition-none">
        <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
        </svg>
      </div>
    )
  );
}

export default Subscribers;

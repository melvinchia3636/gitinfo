/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Contributors({
  data, nextContributorsPage, setNextContributorsPage, setData,
}) {
  const [isContributorsLoading, setContributorsLoading] = useState(false);
  const fetchNextContributorsPage = () => {
    setContributorsLoading(true);
    fetch(`${data.contributors_url}?page=${nextContributorsPage}&per_page=90`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, contributors: data.contributors.concat(e) });
      if (e.length === 90) {
        setNextContributorsPage(nextContributorsPage + 1);
      } else {
        setNextContributorsPage(null);
      }
      setContributorsLoading(false);
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="uil:users-alt" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
        Contributors
        <span className="text-xs mt-2">
          (
          {parseInt(data.contributorsCount, 10).toLocaleString()}
          )
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-5 gap-y-5 mt-4 flex-wrap">
        {data.contributors.map((e) => (
          <Link to={`/user/${e.login}`} className="text-zinc-600 break-all dark:text-zinc-200 text-lg flex items-center gap-2">
            <img src={e.avatar_url} alt={e.login} className="w-6 h-6 rounded-full" />
            {e.login}
          </Link>
        ))}
      </div>
      {nextContributorsPage ? (
        <button onClick={fetchNextContributorsPage} type="button" className="text-lg text-zinc-200 h-14 w-full bg-custom-500 rounded-md shadow-md mt-8">
          {isContributorsLoading ? (
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

export default Contributors;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import colors from '../../assets/colors.json';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Forks({
  data, setData,
}) {
  const [isForksLoading, setForksLoading] = useState(false);
  const [nextForksPage, setNextForksPage] = useState(1);

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS).then((res) => res.json()).then(async ({ resources: { core } }) => {
      if (core.remaining) {
        const forks = await fetch(`${data.forks_url.replace(/\{.*?\}/, '')}?per_page=30`, FETCH_HEADERS).then((r) => r.json());
        if (forks.length === 30) setNextForksPage(2);
        else setNextForksPage(null);

        setData({ ...data, forks });
      }
    });
  }, []);

  const fetchNextForksPage = () => {
    setForksLoading(true);
    fetch(`${data.forks_url.replace(/\{.*?\}/, '')}?page=${nextForksPage}&per_page=30`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, forks: data.forks.concat(e) });
      if (e.length === 30) {
        setNextForksPage(nextForksPage + 1);
      } else {
        setNextForksPage(null);
      }
      setForksLoading(false);
    });
  };

  return (
    data.forks.length ? (
      <div>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="uil:tag" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          Forks
          <span className="text-xs mt-2">
            (
            {data.forks_count.toLocaleString()}
            )
          </span>
        </div>
        <div className="mt-3 flex flex-col text-zinc-600 dark:text-zinc-300">
          {data.forks.map((e) => (
            <div className="w-full p-4 border-b border-zinc-300 dark:border-zinc-600 block text-zinc-600 dark:text-zinc-300">
              <h3 className="text-2xl">
                <a className="text-custom-500" target="_blank" rel="noreferrer" href={`/user/${e.owner.login}`}>{e.owner.login}</a>
                {' '}
                /
                {' '}
                <a className="text-custom-500" target="_blank" rel="noreferrer" href={`/repo/${e.full_name}`}>{e.name}</a>
              </h3>
              {e.description && <p className="text-lg pl-0.5 mt-2">{e.description}</p>}
              <div className="text-lg flex mt-4 gap-x-6 gap-y-2 flex-wrap">
                {e.language && (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 inline-block rounded-full mb-0.5" style={{ backgroundColor: colors[e.language]?.color }} />
                    {e.language}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Icon icon="uil:star" className="w-5 h-5 mb-0.5 text-custom-500" />
                  {e.stargazers_count.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="uil:eye" className="w-5 h-5 mb-0.5 text-custom-500" />
                  {e.watchers_count.toLocaleString()}
                </div>
                {e.forks_count > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Icon icon="jam:fork" className="w-5 h-5 mb-0.5 text-custom-500" />
                    {e.forks_count.toLocaleString()}
                  </div>
                )}
                {e.open_issues > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Icon icon="octicon:issue-opened-16" className="w-4 h-4 mb-0.5 text-custom-500 stroke-[0.5px] stroke-custom-500 overflow-visible" />
                    {e.open_issues.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {nextForksPage ? (
          <button onClick={fetchNextForksPage} type="button" className="text-lg text-zinc-100 h-14 w-full bg-custom-500 rounded-md shadow-md mt-6">
            {isForksLoading ? (
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

export default Forks;

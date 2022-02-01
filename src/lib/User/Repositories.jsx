/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import colors from '../assets/colors.json';
import FETCH_HEADERS from '../constants';
import loadingWhiteAnim from '../assets/loading-white.json';

function Repositories({ repos_url, repos_count }) {
  const [data, setData] = useState([]);
  const [nextReposPage, setNextReposPage] = useState(null);
  const [isReposLoading, setReposLoading] = useState(false);

  const fetchNextReposPage = () => {
    setReposLoading(true);
    fetch(`${repos_url}?page=${nextReposPage}&per_page=20`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData([...data, ...e]);
      if (e.length === 20) {
        setNextReposPage(nextReposPage + 1);
      } else {
        setNextReposPage(null);
      }
      setReposLoading(false);
    });
  };

  useEffect(() => {
    fetch(`${repos_url}?per_page=20`, FETCH_HEADERS).then((res) => res.json()).then((d) => {
      setData(d);
      if (d.length === 20) {
        setData(d);
        setNextReposPage(2);
      }
    });
  }, []);
  return (
    <div>
      <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
        <Icon icon="uil:book-alt" className="w-8 h-8 text-indigo-500 dark:text-indigo-400 -mt-1" />
        Repositories
        <span className="text-xs mt-2">
          (
          {repos_count.toLocaleString()}
          )
        </span>
      </div>
      <div className="mt-4">
        {data.map((e) => (
          <a href={`/repo/${e.full_name}`} target="_blank" rel="noreferrer" className="w-full p-4 border-b border-slate-300 dark:border-slate-600 block text-slate-600 dark:text-white">
            <h3 className="text-3xl font-semibold">{e.name}</h3>
            {e.description && <p className="text-lg pl-0.5 mt-2">{e.description}</p>}
            <div className="text-lg flex mt-4 gap-6">
              {e.language && (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 inline-block rounded-full mb-0.5" style={{ backgroundColor: colors[e.language]?.color }} />
                {e.language}
              </div>
              )}
              <div className="flex items-center gap-2">
                <Icon icon="uil:star" className="w-5 h-5 mb-0.5 text-indigo-500" />
                {e.stargazers_count.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="uil:eye" className="w-5 h-5 mb-0.5 text-indigo-500" />
                {e.watchers_count.toLocaleString()}
              </div>
            </div>
          </a>
        ))}
        {nextReposPage ? (
          <button onClick={fetchNextReposPage} type="button" className="text-lg text-white h-14 w-full bg-indigo-500 rounded-md shadow-md mt-6">
            {isReposLoading ? (
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
    </div>
  );
}

export default Repositories;

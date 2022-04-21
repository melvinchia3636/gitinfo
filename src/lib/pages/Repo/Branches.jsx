/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Branches({
  data, setData,
}) {
  const [isBranchesLoading, setBranchesLoading] = useState(false);
  const [nextBranchesPage, setNextBranchesPage] = useState(1);

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS).then((res) => res.json()).then(async ({ resources: { core } }) => {
      if (core.remaining) {
        const branches = await fetch(`${data.branches_url.replace(/\{.*?\}/, '')}?per_page=30`, FETCH_HEADERS).then((r) => r.json());
        const branchesCount = await fetch(`${data.branches_url.replace(/\{.*?\}/, '')}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 0);

        if (branches.length === 30) setNextBranchesPage(2);
        else setNextBranchesPage(null);

        setData({ ...data, branches, branchesCount });
      }
    });
  }, []);

  const fetchNextBranchesPage = () => {
    setBranchesLoading(true);
    fetch(`${data.branches_url.replace(/\{.*?\}/, '')}?page=${nextBranchesPage}&per_page=30`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, branches: data.branches.concat(e) });
      if (e.length === 30) {
        setNextBranchesPage(nextBranchesPage + 1);
      } else {
        setNextBranchesPage(null);
      }
      setBranchesLoading(false);
    });
  };

  return (
    data.branches?.length ? (
      <div>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="uil:tag" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          Branches
          <span className="text-xs mt-2">
            (
            {data.branchesCount.toLocaleString()}
            )
          </span>
        </div>
        <div className="mt-7 flex flex-col text-zinc-600 dark:text-zinc-300">
          {data.branches.map((e, i) => (
            <div className={`w-full p-6 flex items-center justify-between ${i ? 'border-t border-zinc-300 dark:border-zinc-600 pt-7' : 'pt-0'}`}>
              <h4 className="text-xl font-bold">{e.name}</h4>
              <p className="bg-custom-100 text-custom-500 dark:bg-transparent dark:border border-custom-500 py-0.5 pt-1 px-4 rounded-full whitespace-nowrap overflow-hidden overflow-ellipsis text-sm">{e.commit.sha.slice(0, 6)}</p>
            </div>
          ))}
        </div>
        {nextBranchesPage ? (
          <button onClick={fetchNextBranchesPage} type="button" className="text-lg text-zinc-100 h-14 w-full bg-custom-500 rounded-md shadow-md mt-4">
            {isBranchesLoading ? (
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

export default Branches;

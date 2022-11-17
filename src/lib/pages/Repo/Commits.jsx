/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import moment from 'moment';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';

function Commits({ data, setData }) {
  const [isCommitsLoading, setCommitsLoading] = useState(false);
  const [nextCommitsPage, setNextCommitsPage] = useState(1);

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS)
      .then((res) => res.json())
      .then(async ({ resources: { core } }) => {
        if (core.remaining) {
          const commits = await fetch(
            `${data.commits_url.replace(/\{.*?\}/, '')}?per_page=30`,
            FETCH_HEADERS,
          ).then((r) => r.json());
          const commitsCount = await fetch(
            `${data.commits_url.replace(/\{.*?\}/, '')}?per_page=1`,
            FETCH_HEADERS,
          ).then(
            (r) =>
              r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)
                ?.groups?.page || 0,
          );

          if (commits.length === 30) setNextCommitsPage(2);
          else setNextCommitsPage(null);

          setData({ ...data, commits, commitsCount });
        }
      });
  }, []);

  const fetchNextCommitsPage = () => {
    setCommitsLoading(true);
    fetch(
      `${data.commits_url.replace(
        /\{.*?\}/,
        '',
      )}?page=${nextCommitsPage}&per_page=30`,
      FETCH_HEADERS,
    )
      .then((res) => res.json())
      .then((e) => {
        setData({ ...data, commits: data.commits.concat(e) });
        if (e.length === 30) {
          setNextCommitsPage(nextCommitsPage + 1);
        } else {
          setNextCommitsPage(null);
        }
        setCommitsLoading(false);
      });
  };

  return (
    <>
      <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
        <Icon
          icon="uil:box"
          className="w-8 h-8 text-custom-500 dark:text-custom-400"
        />
        Commits
        <span className="text-xs mt-1">
          (
          {data.commitsCount
            ? Number(data.commitsCount).toLocaleString('en-US')
            : 0}
          )
        </span>
      </div>
      <div className="mt-6 flex flex-col text-zinc-600 dark:text-zinc-300">
        {data.commits?.length ? (
          <div>
            {data.commits.map((e, i) => (
              <div
                className={`w-full p-6 ${
                  i
                    ? 'border-t border-zinc-300 dark:border-zinc-600 pt-7 flex'
                    : 'pt-0'
                }`}
              >
                <div className="w-1/2 flex flex-col gap-2">
                  <p className="truncate font-bold text-lg">
                    {e.commit.message}
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src={e.author?.avatar_url}
                      alt="avatar"
                      className="w-5 h-5 rounded-full"
                    />
                    <p className="flex items-center gap-1.5">
                      {e.commit.author.name}{' '}
                      <span className="text-zinc-400 dark:text-zinc-500">
                        committed {moment(e.commit.author.date).fromNow()}
                      </span>
                      {/* <Icon
                        icon="uil:check"
                        className="w-5 h-5 ml-1 text-custom-500"
                      /> */}
                    </p>
                  </div>
                </div>
                <div />
              </div>
            ))}
            {nextCommitsPage ? (
              <button
                onClick={fetchNextCommitsPage}
                type="button"
                className="text-lg text-zinc-100 h-14 w-full bg-custom-500 rounded-md shadow-md mt-8"
              >
                {isCommitsLoading ? (
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
                ) : (
                  'Load more'
                )}
              </button>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className="w-full min-h-0 h-full flex items-center justify-center pb-32 mt-6 transition-none">
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="7"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}

export default Commits;

/* eslint-disable no-nested-ternary */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import colors from './colors.json';
import FETCH_PARAMS from './constants';
import loadingAnim from './loading.json';
import loadingWhiteAnim from './loading-white.json';

function Repo() {
  const [data, setData] = useState({});
  const [nextContributorsPage, setNextContributorsPage] = useState(1);
  const [nextSubscribersPage, setNextSubscribersPage] = useState(1);
  const [nextStargazersPage, setNextStargazersPage] = useState(1);
  const [isContributorsLoading, setContributorsLoading] = useState(false);
  const [isSubscribersLoading, setSubscribersLoading] = useState(false);
  const [isStargazersLoading, setStargazersLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_PARAMS).then((res) => res.json()).then(({ resources: { core } }) => {
      if (core.remaining) {
        fetch(`https://api.github.com/repos/${params.user}/${params.reponame}`, FETCH_PARAMS).then((res) => res.json()).then(async (d) => {
          const langs = await fetch(d.languages_url, FETCH_PARAMS).then((r) => r.json());
          const contributors = await fetch(`${d.contributors_url}?per_page=90`, FETCH_PARAMS).then((r) => r.json());
          const subscribers = await fetch(`${d.subscribers_url}?per_page=90`, FETCH_PARAMS).then((r) => r.json());
          const stargazers = await fetch(`${d.stargazers_url}?per_page=90`, FETCH_PARAMS).then((r) => r.json());

          const contributorsCount = await fetch(`${d.contributors_url}?per_page=1`, FETCH_PARAMS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 1);

          if (contributors.length >= 30) setNextContributorsPage(2);
          else setNextContributorsPage(null);
          if (subscribers.length >= 30) setNextSubscribersPage(2);
          else setNextSubscribersPage(null);
          if (stargazers.length >= 30) setNextStargazersPage(2);
          else setNextStargazersPage(null);

          setData({
            ...d, langs, contributors, subscribers, stargazers, contributorsCount,
          });
          const width = document.querySelector('.l').clientWidth;
          const sum = Object.values(langs).reduce((a, b) => a + b, 0);
          Array.from(document.querySelectorAll('[data-key]')).forEach((ele) => {
            // eslint-disable-next-line no-param-reassign
            ele.style.width = `${(parseInt(ele.attributes['data-value'].value, 10) / sum) * width}px`;
          });
        });
      } else {
        setData('finished');
      }
    });
  }, []);

  const fetchNextContributorsPage = () => {
    setContributorsLoading(true);
    fetch(`${data.contributors_url}?page=${nextContributorsPage}&per_page=90`, FETCH_PARAMS).then((res) => res.json()).then((e) => {
      if (e.length) {
        setData({ ...data, contributors: data.contributors.concat(e) });
        setNextContributorsPage(nextContributorsPage + 1);
      } else {
        setNextContributorsPage(null);
      }
      setContributorsLoading(false);
    });
  };

  const fetchNextSubscribersPage = () => {
    setSubscribersLoading(true);
    fetch(`${data.subscribers_url}?page=${nextSubscribersPage}&per_page=90`, FETCH_PARAMS).then((res) => res.json()).then((e) => {
      if (e.length) {
        setData({ ...data, subscribers: data.subscribers.concat(e) });
        setNextSubscribersPage(nextSubscribersPage + 1);
      } else {
        setNextSubscribersPage(null);
      }
      setSubscribersLoading(false);
    });
  };

  const fetchNextStargazersPage = () => {
    setStargazersLoading(true);
    fetch(`${data.stargazers_url}?page=${nextStargazersPage}&per_page=90`, FETCH_PARAMS).then((res) => res.json()).then((e) => {
      if (e.length) {
        setData({ ...data, stargazers: data.stargazers.concat(e) });
        setNextStargazersPage(nextStargazersPage + 1);
      } else {
        setNextStargazersPage(null);
      }
      setStargazersLoading(false);
    });
  };

  return (
    <div className="h-full w-full pt-4 pb-0 break-all overflow-scroll">
      {JSON.stringify(data) !== '{}' ? (
        data !== 'finished' ? (
          <div className="pb-8">
            <div className="flex gap-2 items-center text-slate-600 text-3xl tracking-wide font-medium">
              <Icon icon="uil:book-alt" className="w-10 h-10 text-purple-500" />
              {data.full_name}
            </div>
            <div className="flex gap-3 mt-8 px-1 tracking-wide">
              <div className="flex items-center gap-2 rounded-md p-2 bg-white w-full shadow-md">
                <div className="p-2 bg-purple-200 rounded-md">
                  <Icon icon="ant-design:star-filled" className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-sm font-medium text-slate-400 flex flex-col justify-between">
                  Stars
                  <span className="text-2xl text-slate-600">{data.stargazers_count.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-md p-2 bg-white w-full shadow-md">
                <div className="p-2 bg-purple-200 rounded-md">
                  <Icon icon="ant-design:fork-outlined" className="w-8 h-8 text-purple-500 stroke-[0.4px]" />
                </div>
                <div className="text-sm font-medium text-slate-400 flex flex-col justify-between">
                  Forks
                  <span className="text-2xl text-slate-600">{data.forks.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-md p-2 bg-white w-full shadow-md">
                <div className="p-2 bg-purple-200 rounded-md">
                  <Icon icon="uil:eye" className="w-8 h-8 text-purple-500" />
                </div>
                <div className="text-sm font-medium text-slate-400 flex flex-col justify-between">
                  Subscribers
                  <span className="text-2xl text-slate-600">{data.subscribers_count.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-md p-2 bg-white w-full shadow-md">
                <div className="p-2 bg-purple-200 rounded-md">
                  <Icon icon="octicon:issue-opened-24" className="w-8 h-8 text-purple-500 stroke-purple-500 stroke-[0.4px]" />
                </div>
                <div className="text-sm font-medium text-slate-400 flex flex-col justify-between">
                  Issues
                  <span className="text-2xl text-slate-600">{data.open_issues.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 tracking-wide">
                <Icon icon="uil:info-circle" className="w-8 h-8 text-purple-500" />
                Description
              </div>
              <p className="mt-3 text-slate-600 text-lg ml-1 tracking-wide">{data.description}</p>
              {data.homepage ? (
                <a href={data.homepage} target="_blank" rel="noreferrer" className="text-purple-500 mt-2 font-medium flex items-center gap-2 ml-1 tracking-wide">
                  <Icon icon="uil:external-link-alt" className="w-5 h-5" />
                  {data.homepage}
                </a>
              ) : ''}
            </div>
            {data.license ? (
              <div className="mt-8">
                <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 tracking-wide">
                  <Icon icon="codicon:law" className="w-8 h-8 text-purple-500" />
                  License
                </div>
                <p className="mt-3 text-slate-600 text-lg ml-1 tracking-wide">{data.license.name}</p>
              </div>
            ) : ''}
            {data.topics.length ? (
              <div className="mt-8">
                <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 tracking-wide">
                  <Icon icon="uil:bookmark" className="w-8 h-8 text-purple-500" />
                  Topics
                </div>
                <p className="mt-4 text-slate-600 text-sm ml-1 tracking-wide flex gap-1 flex-wrap">{data.topics.map((e) => <span className="px-4 pt-1 pb-1.5 shadow-md block bg-purple-500 rounded-full text-white">{e}</span>)}</p>
              </div>
            ) : ''}
            <div className="mt-8">
              <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 tracking-wide">
                <Icon icon="ic:round-code" className="w-8 h-8 text-purple-500" />
                Languages
              </div>
              <div className="mt-3 flex w-full bg-slate-500 h-4 l rounded-full overflow-hidden">
                {Object.entries(data.langs).map(([k, v]) => (
                  <div className="h-full bg-purple-500" style={{ backgroundColor: colors[k]?.color }} data-key={k} data-value={v} />
                ))}
              </div>
              <div className="flex gap-x-5 gap-y-3 mt-4 flex-wrap">
                {Object.keys(data.langs).map((k) => (
                  <div className="text-slate-600 text-lg flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: colors[k]?.color }} />
                    {k}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 tracking-wide">
                <Icon icon="uil:users-alt" className="w-8 h-8 text-purple-500" />
                Contributors
                <span className="text-xs mt-2">
                  (
                  {parseInt(data.contributorsCount, 10).toLocaleString()}
                  )
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-5 gap-y-3 mt-4 flex-wrap">
                {data.contributors.map((e) => (
                  <Link to={`/user/${e.login}`} className="text-slate-600 text-lg flex items-center gap-2">
                    <img src={e.avatar_url} alt={e.login} className="w-6 h-6 rounded-full" />
                    {e.login}
                  </Link>
                ))}
              </div>
              {nextContributorsPage ? (
                <button onClick={fetchNextContributorsPage} type="button" className="text-lg text-white h-14 w-full bg-purple-500 rounded-md shadow-md mt-6">
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
            <div className="mt-8">
              <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 tracking-wide">
                <Icon icon="uil:eye" className="w-8 h-8 text-purple-500" />
                Subscribers
                <span className="text-xs mt-2">
                  (
                  {data.subscribers_count.toLocaleString()}
                  )
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-5 gap-y-3 mt-4 flex-wrap">
                {data.subscribers.map((e) => (
                  <Link to={`/user/${e.login}`} className="text-slate-600 text-lg flex items-center gap-2">
                    <img src={e.avatar_url} alt={e.login} className="w-6 h-6 rounded-full" />
                    {e.login}
                  </Link>
                ))}
              </div>
              {nextSubscribersPage ? (
                <button onClick={fetchNextSubscribersPage} type="button" className="text-lg text-white h-14 w-full bg-purple-500 rounded-md shadow-md mt-6">
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
            <div className="mt-8">
              <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 tracking-wide">
                <Icon icon="uil:star" className="w-8 h-8 text-purple-500" />
                Stargazers
                <span className="text-xs mt-2">
                  (
                  {data.stargazers_count.toLocaleString()}
                  )
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-5 gap-y-3 mt-4 flex-wrap">
                {data.stargazers.map((e) => (
                  <Link to={`/user/${e.login}`} className="text-slate-600 text-lg flex items-center gap-2">
                    <img src={e.avatar_url} alt={e.login} className="w-6 h-6 rounded-full" />
                    {e.login}
                  </Link>
                ))}
              </div>
              {nextStargazersPage ? (
                <button onClick={fetchNextStargazersPage} type="button" className="text-lg text-white h-14 w-full bg-purple-500 rounded-md shadow-md mt-6">
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
          </div>
        ) : (
          <div className="w-full h-full flex items-center pb-12 flex-col gap-2 justify-center text-slate-600 text-2xl">
            <Icon icon="uil:exclamation-triangle" className="w-12 h-12" />
            API rate limit exceeded
          </div>
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center pb-12">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingAnim,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={60}
            width={60}
            isStopped={false}
            isPaused={false}
          />
        </div>
      )}

    </div>
  );
}

export default Repo;

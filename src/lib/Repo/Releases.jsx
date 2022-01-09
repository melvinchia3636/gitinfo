/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import emoji from 'emoji-dictionary';
import Lottie from 'react-lottie';
import Readme from './Readme';
import FETCH_HEADERS from '../constants';
import loadingWhiteAnim from '../assets/loading-white.json';
import loadingAnim from '../assets/loading.json';

const reactionMap = {
  '+1': '+1',
  '-1': '-1',
  laugh: 'smile',
  hooray: 'tada',
  confused: 'confused',
  heart: 'heart',
  rocket: 'rocket',
  eyes: 'eyes',
};

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / 1024 ** i, 2)} ${sizes[i]}`;
}

function Releases({
  data, nextReleasesPage, setNextReleasesPage, setData,
}) {
  const [isReleasesLoading, setReleasesLoading] = useState(false);
  const [isReactionLoading, setReactionLoading] = useState(false);
  const [nextReactionPage, setNextReactionPage] = useState(null);
  const [isReactedPeopleListShow, setReactedPeopleListShow] = useState(false);
  const [reactionData, setReactionData] = useState([]);
  const [currentReactionURL, setCurrentReactionURL] = useState(null);

  const fetchNextReleasesPage = () => {
    setReleasesLoading(true);
    fetch(`${data.releases_url.replace(/\{.*?\}/, '')}?page=${nextReleasesPage}&per_page=5`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, releases: data.releases.concat(e) });
      if (e.length === 5) {
        setNextReleasesPage(nextReleasesPage + 1);
      } else {
        setNextReleasesPage(null);
      }
      setReleasesLoading(false);
    });
  };

  const fetchNextReactionPage = () => {
    setReactionLoading(true);
    fetch(`${currentReactionURL}?page=${nextReactionPage}&per_page=30`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setReactionData(reactionData.concat(e));
      if (e.length === 30) {
        setNextReactionPage(nextReactionPage + 1);
      } else {
        setNextReactionPage(null);
      }
      setReactionLoading(false);
    });
  };

  const showReactedPeopleList = (reactionURL) => {
    setReactedPeopleListShow(true);
    setCurrentReactionURL(reactionURL);
    setNextReactionPage(null);
    setReactionData([]);
    fetch(`${reactionURL}?per_page=30`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((e) => {
        setReactionData(e);
        if (e.length === 30) setNextReactionPage(2);
        else setNextReactionPage(null);
      });
  };

  return (
    data.releases.length ? (
      <div className="mt-8">
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="uil:box" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          Releases
          <span className="text-xs mt-2">
            (
            {data.releasesCount.toLocaleString()}
            )
          </span>
        </div>
        <div className="mt-6 flex flex-col text-slate-600 dark:text-white">
          {data.releases.map((e, i) => (
            <div className={`w-full p-6 ${i ? 'border-t border-slate-300 dark:border-zinc-500' : 'pt-0'}`}>
              <h4 className="text-4xl font-bold">{e.name}</h4>
              <div className="text-lg flex mt-2 gap-6">
                <div className="flex items-center gap-2">
                  <Icon icon="uil:tag-alt" className="w-5 h-5 text-indigo-500" />
                  {e.tag_name}
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="ph:git-commit-bold" className="w-5 h-5 text-indigo-500" />
                  {e.target_commitish.slice(0, 6)}
                </div>
              </div>
              <Readme content={e.body} />
              <div className="mt-6">
                <h5 className="text-2xl">
                  Assets
                  {' '}
                  <span className="text-xs mt-1">
                    (
                    {e.assets.length + 2}
                    )
                  </span>
                </h5>
                <div className="flex flex-col gap-2 mt-3">
                  {e.assets.map((a) => (
                    <div className="flex items-center gap-1 text-lg">
                      <Icon icon="uil:cube" className="text-indigo-500 w-6 h-6" />
                      <a href={a.browser_download_url} target="_blank" rel="noopener noreferrer">{a.name}</a>
                      <span className="text-xs mt-1">
                        (
                        {bytesToSize(a.size)}
                        )
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1 text-lg">
                    <Icon icon="tabler:file-zip" className="text-indigo-500 w-6 h-6" />
                    <a href={e.zipball_url} target="_blank" rel="noopener noreferrer">Source code (zip)</a>
                  </div>
                  <div className="flex items-center gap-1 text-lg">
                    <Icon icon="tabler:file-zip" className="text-indigo-500 w-6 h-6" />
                    <a href={e.tarball_url} target="_blank" rel="noopener noreferrer">Source code (.tar.gz)</a>
                  </div>
                </div>
                <div className="flex gap-1 mt-6 items-center -ml-1">
                  <Icon icon="uil:smile" className="w-6 h-6 text-slate-300 dark:text-gray-500" />
                  {Object.entries(e.reactions).slice(2).map(([k, v]) => (
                    v ? (
                      <div className="flex items-center gap-1 rounded-full px-2 border border-slate-300 dark:border-gray-500">
                        <span>{emoji.getUnicode(reactionMap[k])}</span>
                        <span className="text-sm">{v}</span>
                      </div>
                    ) : ''
                  ))}
                  <button type="button" onClick={() => showReactedPeopleList(e.reactions.url)} className="ml-1 text-sm dark:text-gray-500 hover:underline transition-all duration-200 hover:text-indigo-500">
                    {e.reactions.total_count}
                    {' '}
                    people reacted
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {nextReleasesPage ? (
          <button onClick={fetchNextReleasesPage} type="button" className="text-lg text-white h-14 w-full bg-indigo-500 rounded-md shadow-md mt-6">
            {isReleasesLoading ? 'Loading...' : 'Load more'}
          </button>
        ) : ''}
        <div
          onClick={() => setReactedPeopleListShow(false)}
          className={`absolute top-0 left-0 flex overflow-hidden items-center justify-center w-full h-screen bg-black transition-all ${isReactedPeopleListShow ? 'z-0 bg-opacity-20 duration-200' : 'z-[-1] bg-opacity-0 duration-500'}`}
        />
        <div className={`w-96 h-[80vh] overscroll-contain absolute top-1/2 left-1/2 -translate-x-1/2 bg-white shadow-2xl text-slate-600 rounded-xl overflow-y-scroll p-6 flex flex-col gap-4 transform transition-all duration-500 ${isReactedPeopleListShow ? '-translate-y-1/2' : 'translate-y-[100%]'}`}>
          {reactionData.length ? reactionData.map((e) => (
            <div className="flex items-center gap-4">
              <div className="relative inline-block">
                <img src={e.user.avatar_url} alt={e.user.login} className="w-12 h-12 rounded-full" />
                <span className="absolute -bottom-2 -right-2 text-2xl">{emoji.getUnicode(reactionMap[e.content])}</span>
              </div>
              <div>
                <p className="text-xl">{e.user.login}</p>
                <p className="text-xs text-slate-400">{new Date(e.created_at).toLocaleString()}</p>
              </div>
            </div>
          )) : (
            <div className="flex w-full h-full items-center justify-center">
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
          {nextReactionPage ? (
            <button onClick={fetchNextReactionPage} type="button" className="text-lg text-white h-14 flex-shrink-0 w-full bg-indigo-500 rounded-md shadow-md mt-4">
              {isReactionLoading ? (
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
    ) : ''
  );
}

export default Releases;

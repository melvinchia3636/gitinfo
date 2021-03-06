/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';
import { applySaturationToHexColor, shadeColor, hexIsLight } from './Issues';

function Labels({
  data, setData,
}) {
  const [isLabelsLoading, setLabelsLoading] = useState(false);
  const [nextLabelsPage, setNextLabelsPage] = useState(1);

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS).then((res) => res.json()).then(async ({ resources: { core } }) => {
      if (core.remaining) {
        const labels = await fetch(`${data.labels_url.replace(/\{.*?\}/, '')}?per_page=20`, FETCH_HEADERS).then((r) => r.json());
        const labelsCount = await fetch(`${data.labels_url.replace(/\{.*?\}/, '')}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 0);

        if (labelsCount > 20) setNextLabelsPage(2);
        else setNextLabelsPage(null);

        setData({
          ...data,
          labels,
          labelsCount,
        });
      }
    });
  }, []);

  const fetchNextLabelsPage = () => {
    setLabelsLoading(true);
    fetch(`${data.labels_url.replace(/\{.*?\}/, '')}?page=${nextLabelsPage}&per_page=20`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, labels: data.labels.concat(e) });
      if (e.length === 20) {
        setNextLabelsPage(nextLabelsPage + 1);
      } else {
        setNextLabelsPage(null);
      }
      setLabelsLoading(false);
    });
  };

  return (
    data.labels?.length ? (
      <div>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="uil:tag-alt" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          Labels
          <span className="text-xs mt-2">
            (
            {data.labelsCount.toLocaleString()}
            )
          </span>
        </div>
        <div className="mt-6 flex flex-col text-zinc-600 dark:text-zinc-300">
          {data.labels.map((e, i) => {
            const color = !hexIsLight(e.color) ? applySaturationToHexColor(shadeColor(`#${e.color}`, 100), 80) : `#${e.color}`;
            return (
              <div className={`w-full p-4 ${i ? 'border-t border-zinc-300 dark:border-zinc-600' : 'pt-0'}`}>
                <div className={`text-xs font-bold shadow-md rounded-full px-3 whitespace-nowrap pt-1.5 pb-1 inline dark:hidden ${hexIsLight(e.color) ? 'text-zinc-600' : 'text-zinc-100'}`} style={{ backgroundColor: `#${e.color}` }}>{e.name}</div>
                <div
                  className="text-xs font-bold shadow-md rounded-full px-3 whitespace-nowrap outline outline-1 pt-1.5 pb-1 hidden dark:inline"
                  style={{
                    backgroundColor: `${color}30`,
                    outlineColor: color,
                    color,
                  }}
                >
                  {e.name}
                </div>
                <p className="mt-2 text-lg">{e.description}</p>
              </div>
            );
          })}
        </div>
        {nextLabelsPage ? (
          <button onClick={fetchNextLabelsPage} type="button" className="text-lg text-zinc-100 h-14 w-full bg-custom-500 rounded-md shadow-md mt-6">
            {isLabelsLoading ? (
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

export default Labels;

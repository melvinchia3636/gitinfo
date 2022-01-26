/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import FETCH_HEADERS from '../constants';

function hex_is_light(color) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness > 155;
}

function Labels({
  data, nextLabelsPage, setNextLabelsPage, setData,
}) {
  const [isLabelsLoading, setLabelsLoading] = useState(false);

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
    data.labels.length ? (
      <div className="mt-8">
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="uil:tag-alt" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          Labels
          <span className="text-xs mt-2">
            (
            {data.labelsCount.toLocaleString()}
            )
          </span>
        </div>
        <div className="mt-6 flex flex-col text-slate-600 dark:text-white">
          {data.labels.map((e, i) => (
            <div className={`w-full p-4 ${i ? 'border-t border-slate-300 dark:border-zinc-500' : 'pt-0'}`}>
              <h4 className={`text-xs font-bold shadow-md rounded-full px-3 pt-1.5 pb-1 inline ${hex_is_light(e.color) ? 'text-slate-600' : 'text-white'}`} style={{ backgroundColor: `#${e.color}` }}>{e.name}</h4>
              <p className="mt-2 text-lg">{e.description}</p>
            </div>
          ))}
        </div>
        {nextLabelsPage ? (
          <button onClick={fetchNextLabelsPage} type="button" className="text-lg text-white h-14 w-full bg-indigo-500 rounded-md shadow-md mt-6">
            {isLabelsLoading ? 'Loading...' : 'Load more'}
          </button>
        ) : ''}
      </div>
    ) : ''
  );
}

export default Labels;

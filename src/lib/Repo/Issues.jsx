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

function Issues({
  data, nextIssuesPage, setNextIssuesPage, setData,
}) {
  const [isIssuesLoading, setIssuesLoading] = useState(false);

  const fetchNextIssuesPage = () => {
    setIssuesLoading(true);
    fetch(`${data.issues_url.replace(/\{.*?\}/, '')}?page=${nextIssuesPage}&per_page=20`, FETCH_HEADERS).then((res) => res.json()).then((e) => {
      setData({ ...data, issues: data.issues.concat(e) });
      if (e.length === 20) {
        setNextIssuesPage(nextIssuesPage + 1);
      } else {
        setNextIssuesPage(null);
      }
      setIssuesLoading(false);
    });
  };

  return (
    data.issues.length ? (
      <div className="mt-8">
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="uil:tag-alt" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          Issues
          <span className="text-xs mt-2">
            (
            {data.issuesCount.toLocaleString()}
            )
          </span>
        </div>
        <div className="mt-6 flex flex-col text-slate-600 dark:text-white">
          {data.issues.map((e, i) => (
            <div className={`w-full p-4 ${i ? 'border-t border-slate-300 dark:border-zinc-500' : 'pt-0'}`}>
              <div className="flex items-center gap-2">
                <Icon icon="octicon:issue-opened-16" className="text-green-700 dark:text-green-500 w-5 h-5 flex-shrink-0" />
                <h4 className="text-xl flex-shrink overflow-hidden overflow-ellipsis whitespace-nowrap font-bold">{e.title}</h4>
                <div className="flex items-center gap-2">
                  {e.labels.map((t) => (
                    <p className={`text-xs font-bold shadow-md rounded-full px-3 whitespace-nowrap pt-1.5 pb-1 inline ${hex_is_light(t.color) ? 'text-slate-600' : 'text-white'}`} style={{ backgroundColor: `#${t.color}` }}>{t.name}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 items-center text-slate-400 text-sm ml-7 mt-1.5">
                <p>
                  #
                  {e.number}
                  {' '}
                  opened at
                  {' '}
                  {new Date(e.created_at).toLocaleString()}
                  {' '}
                  by
                  {' '}
                  {e.user.login}
                </p>
                {e.milestone ? (
                  <div className="flex gap-1 items-center">
                    <Icon icon="octicon:milestone-16" className="w-4 h-4" />
                    {e.milestone.title}
                  </div>
                ) : ''}
                {e.comments ? (
                  <div className="flex gap-1 items-center">
                    <Icon icon="uil:chat" className="w-4 h-4" />
                    {e.comments}
                  </div>
                ) : ''}
              </div>
            </div>
          ))}
        </div>
        {nextIssuesPage ? (
          <button onClick={fetchNextIssuesPage} type="button" className="text-lg text-white h-14 w-full bg-indigo-500 rounded-md shadow-md mt-6">
            {isIssuesLoading ? 'Loading...' : 'Load more'}
          </button>
        ) : ''}
      </div>
    ) : ''
  );
}

export default Issues;

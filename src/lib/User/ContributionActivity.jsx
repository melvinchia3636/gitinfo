/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import StickyBox from 'react-sticky-box';
import { Link } from 'react-router-dom';
import emoji from 'emoji-dictionary';
import FETCH_HEADERS from '../constants';
import Readme from '../Repo/Readme';

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

function Heatmap({ data }) {
  useEffect(() => {
    Array.from(document.querySelectorAll('.react-calendar-heatmap rect')).forEach((e) => {
      e.setAttribute('rx', 2.4);
      e.setAttribute('ry', 2.4);
    });
  }, []);

  return (
    <CalendarHeatmap
      startDate={(() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);
        return date;
      })()}
      values={data}
      classForValue={(value) => {
        if (!value) {
          return 'color-empty';
        }
        return `color-scale-${value.count}`;
      }}
    />
  );
}

function ContributionActivity({ username, eventsUrl }) {
  // eslint-disable-next-line no-unused-vars
  const [contributionCalendar, setContributionCalendar] = useState([]);
  const [years, setYears] = useState([]);
  const [contributionEvents, setContributionEvents] = useState([]);

  useEffect(() => {
    fetch(`https://cors-anywhere.thecodeblog.net/github.com/${username}?tab=overview`, FETCH_HEADERS)
      .then((res) => res.text())
      .then((raw) => {
        const HTMLParser = new DOMParser();
        const html = HTMLParser.parseFromString(raw, 'text/html');
        const calendar = html.querySelector('svg.js-calendar-graph-svg');
        setContributionCalendar(Array.from(calendar.querySelectorAll('rect')).map((e) => ({
          date: e.getAttribute('data-date'),
          count: parseInt(e.getAttribute('data-level'), 10),
        })));
        const yrs = Array.from(html.querySelectorAll('[id*=year-link]')).map((e) => e.innerText);
        setYears(yrs);
      });
    fetch(eventsUrl, FETCH_HEADERS).then((res) => res.json()).then((d) => setContributionEvents(d));
    fetch('https://api.github.com/users/fabpot/hovercard', FETCH_HEADERS).then((res) => res.json()).then((d) => console.log(d));
  }, []);

  return (
    <div className="relative">
      {contributionCalendar.length > 0 && (
      <>
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="mdi:puzzle-edit-outline" className="w-8 h-8 text-indigo-500 dark:text-indigo-400 -mt-1" />
          Contribution Activities
        </div>
        <div className="flex gap-6 mt-6 items-start">
          <div className="flex flex-col min-w-0">
            <Heatmap data={contributionCalendar} />
            <div className="text-slate-600 flex flex-col mt-4">
              {contributionEvents.map((e) => (
                <div className="border-slate-300 dark:border-slate-500 border-b p-4 pt-5">
                  {e.type === 'PushEvent' ? (
                    <div>
                      <div className="flex gap-2 text-xl overflow-hidden font-medium text-slate-600 dark:text-gray-100 tracking-wide">
                        <Icon icon="octicon:repo-push-16" className="w-6 h-6 mt-2 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
                        <div className="flex flex-col min-w-0">
                          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                            Created
                            {' '}
                            {e.payload.size}
                            {' '}
                            commits in
                            {' '}
                            <Link to={`/repo/${e.repo.name}`} className="font-bold">{e.repo.name}</Link>
                          </p>
                          <p className="text-sm text-slate-400">{new Date(e.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        {e.payload.commits.map((c) => (
                          <div className="flex gap-3">
                            <div className="text-indigo-500 dark:text-white bg-indigo-200 dark:bg-indigo-500 rounded-full w-[4.6rem] flex-shrink-0 text-sm flex justify-center py-0.5 h-min">{c.sha.slice(0, 7)}</div>
                            <div className="-mt-[1.55rem]">
                              <Readme data={{ readmeContent: c.message }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : ''}
                  {e.type === 'IssuesEvent' ? (
                    <div>
                      <div className="flex gap-2 text-xl overflow-hidden font-medium text-slate-600 dark:text-gray-100 tracking-wide">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="w-6 h-6 flex-shrink-0 text-indigo-500 mt-2 dark:text-indigo-400 iconify iconify--icon-park-outline" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path d="M24 44c8.235 0 15-6.526 15-14.902c0-2.056-.105-4.26-1.245-7.686c-1.14-3.426-1.369-3.868-2.574-5.984c-.515 4.317-3.27 6.117-3.97 6.655c0-.56-1.666-6.747-4.193-10.45C24.537 8 21.163 5.617 19.185 4c0 3.07-.863 7.634-2.1 9.96c-1.236 2.325-1.468 2.41-3.013 4.14c-1.544 1.73-2.253 2.265-3.545 4.365C9.236 24.565 9 27.362 9 29.418C9 37.794 15.765 44 24 44z" stroke="currentColor" strokeWidth="4.6" strokeLinejoin="round" fill="none" /></svg>
                        <div className="flex flex-col min-w-0">
                          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {e.payload.action}
                            {' '}
                            issue for
                            {' '}
                            <Link to={`/repo/${e.repo.name}`} className="font-bold">{e.repo.name}</Link>
                          </p>
                          <p className="text-sm text-slate-400">{new Date(e.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="w-full border mt-4 rounded-md border-slate-300 dark:border-slate-500 shadow-sm p-4">
                        <div className="flex gap-2 text-xl overflow-hidden font-bold text-slate-600 dark:text-gray-100 tracking-wide">
                          <Icon icon={`octicon:issue-${e.payload.issue.state === 'closed' ? 'closed' : 'opened'}-16`} className={`w-5 h-5 mt-1 dark:text-indigo-400 ${e.payload.issue.state === 'closed' ? 'text-indigo-500' : 'text-green-600'}`} />
                          <p>
                            {e.payload.issue.title}
                            {' '}
                            <span className="font-medium text-slate-400">
                              #
                              {e.payload.issue.number}
                            </span>
                          </p>
                        </div>
                        <Readme data={{ readmeContent: e.payload.issue.body }} />
                        <div className="mt-4 flex items-center gap-4">
                          <p className="text-md text-slate-400">{new Date(e.payload.issue.created_at).toLocaleString()}</p>
                          <div className="flex items-center gap-1.5">
                            <Icon icon="uil:comment-alt" className="w-5 h-5 mb-0.5 text-indigo-500" />
                            {e.payload.issue.comments + 1}
                          </div>
                        </div>
                        {Boolean(e.payload.issue.reactions.total) && (
                        <div className="flex gap-1 mt-6 items-center -ml-1">
                          <Icon icon="uil:smile" className="w-6 h-6 text-slate-300 dark:text-gray-500" />
                          {Object.entries(e.payload.issue.reactions).slice(2).map(([k, v]) => (
                            v ? (
                              <div className="flex items-center gap-1 rounded-full px-2 border border-slate-300 dark:border-gray-500">
                                <span>{emoji.getUnicode(reactionMap[k])}</span>
                                <span className="text-sm">{v}</span>
                              </div>
                            ) : ''
                          ))}
                          <div className="ml-1 text-sm dark:text-gray-500 hover:underline transition-all duration-200 hover:text-indigo-500">
                            {e.payload.issue.reactions.reactions.total_count}
                            {' '}
                            people reacted
                          </div>
                        </div>
                        )}
                      </div>
                    </div>
                  ) : '' }
                </div>
              ))}
            </div>
          </div>
          <StickyBox offsetTop={20} offsetBottom={20}>
            <div className="flex flex-col text-slate-600 dark:text-white">
              {years.map((e, i) => (
                <button className={`block px-4 py-2 pt-2.5 rounded-md ${!i ? 'text-white bg-indigo-500 shadow-md' : ''}`} key={`yearbtn-${e}`} type="button">
                  {e}
                </button>
              ))}
            </div>
          </StickyBox>
        </div>
      </>
      )}

    </div>
  );
}

export default ContributionActivity;

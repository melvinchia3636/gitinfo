/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import StickyBox from 'react-sticky-box';
import FETCH_HEADERS from '../../constants';
import IssueCommentEvent from './Events/IssueCommentEvent';
import PushEvent from './Events/PushEvent';
import IssueEvent from './Events/IssueEvent';
import DeleteEvent from './Events/DeleteEvent';
import PullRequestEvent from './Events/PullRequestEvent';

function Heatmap({ data }) {
  useEffect(() => {
    Array.from(document.querySelectorAll('.react-calendar-heatmap rect')).forEach((e) => {
      e.setAttribute('rx', 2.4);
      e.setAttribute('ry', 2.4);
    });
  }, []);

  return (
    <div className="hidden sm:block">
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
    </div>
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
    fetch(eventsUrl, FETCH_HEADERS).then((res) => res.json()).then((d) => {
      if (d.length) {
        const contributions = [d[0]];
        for (const ev of d.slice(1)) {
          if (
            contributions[contributions.length - 1].type === ev.type
          && ev.type === 'PushEvent'
          && contributions[contributions.length - 1].repo.id === ev.repo.id
          && new Date(contributions[contributions.length - 1]
            .created_at)
            .toDateString()
          === new Date(ev
            .created_at)
            .toDateString()
          ) {
            contributions[contributions.length - 1].payload.commits.push(...ev.payload.commits);
            contributions[contributions.length - 1].payload.size += ev.payload.commits.length;
          } else {
            contributions.push(ev);
          }
        }
        setContributionEvents(contributions);
      }
    });
  }, []);

  return (
    contributionCalendar.length ? (
      <div className="relative">
        {contributionCalendar.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-4 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
            <Icon icon="mdi:puzzle-edit-outline" className="w-8 h-8 text-custom-500 dark:text-custom-400 -mt-1" />
            Contribution Activities
          </div>
          <Heatmap data={contributionCalendar} className="hidden sm:block" />
          <div className="flex gap-8 items-start min-w-0 w-full mt-6">
            <div className="flex flex-col min-w-0 w-full">
              {contributionEvents.length > 0 && (
              <div className="text-zinc-600 flex flex-col -mt-4 w-full">
                {contributionEvents.map((e) => (
                  <div className="border-zinc-300 dark:border-zinc-600 border-b p-4 pt-5 min-w-0 flex flex-col w-full">
                    {e.type === 'PushEvent' ? (
                      <PushEvent e={e} />
                    ) : ''}
                    {e.type === 'IssuesEvent' ? (
                      <IssueEvent e={e} />
                    ) : '' }
                    {e.type === 'IssueCommentEvent' ? (
                      <IssueCommentEvent e={e} />
                    ) : '' }
                    {e.type === 'DeleteEvent' ? (
                      <DeleteEvent e={e} />
                    ) : '' }
                    {e.type === 'PullRequestEvent' ? (
                      <PullRequestEvent e={e} />
                    ) : '' }
                  </div>
                ))}
              </div>
              )}
            </div>
            <StickyBox offsetTop={20} offsetBottom={20} className="hidden lg:block">
              <div className="flex flex-col text-zinc-600 dark:text-zinc-200">
                {years.map((e, i) => (
                  <button className={`block px-4 py-2 pt-2.5 rounded-md ${!i ? 'text-zinc-200 bg-custom-500 shadow-md' : ''}`} key={`yearbtn-${e}`} type="button">
                    {e}
                  </button>
                ))}
              </div>
            </StickyBox>
          </div>
        </>
        )}
      </div>
    ) : <div className="-mb-12" />
  );
}

export default ContributionActivity;

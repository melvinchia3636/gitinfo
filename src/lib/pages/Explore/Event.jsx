import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../../constants';
import loadingWhiteAnim from '../../assets/loading-white.json';
import PushEvent from './Events/PushEvent';
import IssueEvent from './Events/IssueEvent';
import IssueCommentEvent from './Events/IssueCommentEvent';
import DeleteEvent from './Events/DeleteEvent';
import PullRequestEvent from './Events/PullRequestEvent';
import PullRequestReviewCommentEvent from './Events/PullRequestReviewComment';
import CreateEvent from './Events/CreateEvent';
import ReleaseEvent from './Events/ReleaseEvent';

function Event() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(2);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/events?per_page=30', FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const fetchNextPage = () => {
    setLoading(true);
    fetch(`https://api.github.com/events?page=${nextPage}&per_page=30`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((e) => {
        setData([...data, ...e]);
        if (e.length === 30) {
          setNextPage(nextPage + 1);
        } else {
          setNextPage(null);
        }
        setLoading(false);
      });
  };

  return (
    data.length ? (
      <div className="pb-8 min-w-0">
        {data.map((e) => (
          <div className="border-zinc-300 dark:border-zinc-600 border-b p-4 pt-5 min-w-0 flex flex-col w-full">
            <a href={`/user/${e.actor.login}`} target="_blank" rel="noreferrer" className="text-custom-500 flex items-center gap-2 mb-4 text-xl font-semibold">
              <img src={e.actor.avatar_url} alt={e.actor.login} className="w-8 h-8 rounded-full" />
              {e.actor.login}
            </a>
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
            {e.type === 'PullRequestReviewCommentEvent' ? (
              <PullRequestReviewCommentEvent e={e} />
            ) : '' }
            {e.type === 'CreateEvent' ? (
              <CreateEvent e={e} />
            ) : '' }
            {e.type === 'ReleaseEvent' ? (
              <ReleaseEvent e={e} />
            ) : '' }
          </div>
        ))}
        {nextPage ? (
          <button onClick={fetchNextPage} type="button" className="text-lg text-zinc-200 h-14 w-full bg-custom-500 rounded-md shadow-md mt-8">
            {isLoading ? (
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

export default Event;

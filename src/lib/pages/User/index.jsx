/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import ReactStickyBox from 'react-sticky-box';
import FETCH_HEADERS from '../../constants';

import LeftSide from './LeftSide';
import RightSide from './RightSide';

function User() {
  const [data, setData] = useState({});

  const params = useParams();

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS).then((res) => res.json()).then(({ resources: { core } }) => {
      if (core.remaining) {
        fetch(`https://api.github.com/users/${params.username}`, FETCH_HEADERS).then((res) => res.json()).then(async (d) => {
          setData(d);
        });
      } else {
        setData('finished');
      }
    });
  }, []);

  return (
    <div className="h-full w-full flex pb-0 lg:mt-0 mt-4">
      {JSON.stringify(data) !== '{}' ? (
        data !== 'finished' ? (
          <div className="w-full h-full overflow-y-scroll flex flex-col lg:flex-row justify-between gap-6 xl:gap-12 items-start">
            <ReactStickyBox className="hidden lg:block">
              <LeftSide data={data} />
            </ReactStickyBox>
            <div className="block lg:hidden w-full">
              <LeftSide data={data} />
            </div>
            <RightSide data={data} />
          </div>
        ) : (
          <div className="w-full h-full flex items-center pb-12 flex-col gap-2 justify-center text-zinc-600 dark:text-zinc-200 text-2xl">
            <Icon icon="uil:exclamation-triangle" className="w-12 h-12" />
            API rate limit exceeded
          </div>
        )
      ) : (
        <div className="w-full min-h-0 h-full flex items-center justify-center pb-32 mt-6 transition-none">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default User;

/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Lottie from 'react-lottie';
import FETCH_HEADERS from '../constants';
import loadingAnim from '../assets/loading.json';

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
  });
  return (
    <div className="h-full w-full flex pt-4 pb-0">
      {JSON.stringify(data) !== '{}' ? (
        data !== 'finished' ? (
          <div className="w-full h-full flex justify-between gap-12">
            <LeftSide data={data} />
            <RightSide data={data} />
          </div>
        ) : (
          <div className="w-full h-full flex items-center pb-12 flex-col gap-2 justify-center text-slate-600 dark:text-gray-100 text-2xl">
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

export default User;

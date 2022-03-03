/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';
import Moment from 'react-moment';

function LeftSide({ data }) {
  return (
    <div className="text-zinc-600 lg:pb-16 dark:text-zinc-200 overflow-y-scroll h-full mb-8 no-scrollbar flex flex-col sm:flex-row lg:flex-col justify-between sm:items-center lg:justify-start w-full lg:w-[19rem] gap-8">
      <img src={data.avatar_url} alt={data.login} className="rounded-2xl hidden lg:block w-72 h-72 object-contain bg-zinc-50 dark:bg-zinc-600 shadow-lg" />
      <div className="w-full lg:w-auto lg:ml-0.5">
        <div className="flex items-center gap-4">
          <img src={data.avatar_url} alt={data.login} className="w-[3.6rem] h-[3.6rem] rounded-full -mt-2 lg:hidden" />
          <div className="w-full lg:w-72">
            <h2 className="text-4xl mt-0 lg:mt-4 font-bold">{data.name || 'No Username'}</h2>
            <p className="text-xl text-custom-500 -mt-1 lg:mt-0">{data.login}</p>
          </div>
        </div>
        <p className="text-lg mt-4 w-full lg:w-72">{data.bio}</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8">
          <div>
            <div className="text-lg flex items-center gap-3 mt-6">
              <Icon icon="uil:users-alt" className="text-custom-500 w-6 h-6 flex-shrink-0" />
              {data.followers.toLocaleString()}
              {' '}
              followers ·
              {' '}
              {data.following.toLocaleString()}
              {' '}
              following
            </div>
            {Boolean(data.location) && (
            <div className="text-lg flex items-center gap-3 mt-2 flex-nowrap break-all">
              <Icon icon="uil:location-point" className="text-custom-500 w-6 h-6 flex-shrink-0" />
              {data.location}
            </div>
            )}
            {Boolean(data.email) && (
            <div className="text-lg flex items-center gap-3 mt-2 flex-nowrap break-all">
              <Icon icon="uil:envelope" className="text-custom-500 w-6 h-6 flex-shrink-0" />
              {data.email}
            </div>
            )}
            {Boolean(data.blog) && (
            <a href={(!data.blog.startsWith('http') ? '//' : '') + data.blog} target="_blank" rel="noreferrer" className="text-lg flex items-center gap-3 mt-2 flex-nowrap break-all">
              <Icon icon="uil:link" className="text-custom-500 w-6 h-6 flex-shrink-0" />
              {data.blog}
            </a>
            )}
            {Boolean(data.twitter_username) && (
            <a href={`https://twitter.com/${data.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-lg flex items-center gap-3 mt-2 flex-nowrap break-all">
              <Icon icon="uil:twitter" className="text-custom-500 w-6 h-6 flex-shrink-0" />
              @
              {data.twitter_username}
            </a>
            )}
          </div>
          <div>
            <div className="text-lg flex items-center gap-3 mt-6 flex-nowrap">
              <Icon icon="icon-park-outline:timer" className="text-custom-500 w-[1.7rem] h-[1.7rem]" />
              Joined on
              {' '}
              <Moment format="ll" className="-ml-1">{data.created_at}</Moment>
            </div>
            <div className="text-lg flex items-center gap-3 mt-2 flex-nowrap">
              <Icon icon="ic:round-update" className="text-custom-500 w-[1.6rem] h-[1.6rem]" />
              Last updated on
              {' '}
              <Moment format="ll" className="-ml-1">{data.updated_at}</Moment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;

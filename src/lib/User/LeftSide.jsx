/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';
import Moment from 'react-moment';

function LeftSide({ data }) {
  return (
    <div className="text-slate-600 dark:text-white overflow-y-scroll h-full mb-8 no-scrollbar">
      <img src={data.avatar_url} alt={data.login} className="rounded-2xl w-72 h-72 bg-white shadow-lg" />
      <div className="ml-0.5">
        <h2 className="text-4xl mt-4 font-bold">{data.name}</h2>
        <p className="text-xl text-indigo-500">{data.login}</p>
        <p className="text-lg mt-4 w-72">{data.bio}</p>
        <div className="text-lg flex items-center gap-3 mt-6">
          <Icon icon="uil:users-alt" className="text-indigo-500 w-6 h-6" />
          {data.followers.toLocaleString()}
          {' '}
          followers ·
          {' '}
          {data.following.toLocaleString()}
          {' '}
          following
        </div>
        {Boolean(data.location) && (
        <div className="text-lg flex items-center gap-3 mt-2">
          <Icon icon="uil:location-point" className="text-indigo-500 w-6 h-6" />
          {data.location}
        </div>
        )}
        {Boolean(data.email) && (
        <div className="text-lg flex items-center gap-3 mt-2">
          <Icon icon="uil:envelope" className="text-indigo-500 w-6 h-6" />
          {data.email}
        </div>
        )}
        {Boolean(data.blog) && (
        <a href={data.blog} target="_blank" rel="noreferrer" className="text-lg flex items-center gap-3 mt-2">
          <Icon icon="uil:link" className="text-indigo-500 w-6 h-6" />
          {data.blog}
        </a>
        )}
        {Boolean(data.twitter_username) && (
        <a href={`https://twitter.com/${data.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-lg flex items-center gap-3 mt-2">
          <Icon icon="uil:twitter" className="text-indigo-500 w-6 h-6" />
          @
          {data.twitter_username}
        </a>
        )}
        <div className="text-lg flex items-center gap-3 mt-6">
          <Icon icon="icon-park-outline:timer" className="text-indigo-500 w-[1.7rem] h-[1.7rem]" />
          Joined on
          {' '}
          <Moment format="ll" className="-ml-1">{data.created_at}</Moment>
        </div>
        <div className="text-lg flex items-center gap-3 mt-2">
          <Icon icon="ic:round-update" className="text-indigo-500 w-[1.6rem] h-[1.6rem]" />
          Last updated on
          {' '}
          <Moment format="ll" className="-ml-1">{data.updated_at}</Moment>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import FETCH_HEADERS from '../../constants';

export function hexIsLight(color) {
  const hex = color.replace('#', '');
  const cR = parseInt(hex.substr(0, 2), 16);
  const cG = parseInt(hex.substr(2, 2), 16);
  const cB = parseInt(hex.substr(4, 2), 16);
  const brightness = ((cR * 299) + (cG * 587) + (cB * 114)) / 1000;
  return brightness > 155;
}

export function shadeColor(col, amt) {
  let c = col;
  let usePound = false;

  if (c[0] === '#') {
    c = c.slice(1);
    usePound = true;
  }

  let R = parseInt(c.substring(0, 2), 16);
  let G = parseInt(c.substring(2, 4), 16);
  let B = parseInt(c.substring(4, 6), 16);

  // to make the colour less bright than the input
  // change the following three "+" symbols to "-"
  R += amt;
  G += amt;
  B += amt;

  if (R > 255) R = 255;
  else if (R < 0) R = 0;

  if (G > 255) G = 255;
  else if (G < 0) G = 0;

  if (B > 255) B = 255;
  else if (B < 0) B = 0;

  const RR = ((R.toString(16).length === 1) ? `0${R.toString(16)}` : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? `0${G.toString(16)}` : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? `0${B.toString(16)}` : B.toString(16));

  return (usePound ? '#' : '') + RR + GG + BB;
}

export function applySaturationToHexColor(hex, saturationPercent) {
  const saturationFloat = saturationPercent / 100;
  const rgbIntensityFloat = [
    parseInt(hex.substr(1, 2), 16) / 255,
    parseInt(hex.substr(3, 2), 16) / 255,
    parseInt(hex.substr(5, 2), 16) / 255,
  ];

  const rgbIntensityFloatSorted = rgbIntensityFloat.slice(0).sort((a, b) => a - b);
  const maxIntensityFloat = rgbIntensityFloatSorted[2];
  const mediumIntensityFloat = rgbIntensityFloatSorted[1];
  const minIntensityFloat = rgbIntensityFloatSorted[0];

  if (maxIntensityFloat === minIntensityFloat) {
    // All colors have same intensity, which means
    // the original color is gray, so we can't change saturation.
    return hex;
  }

  // New color max intensity wont change. Lets find medium and weak intensities.
  let newMediumIntensityFloat;
  const newMinIntensityFloat = maxIntensityFloat * (1 - saturationFloat);

  if (mediumIntensityFloat === minIntensityFloat) {
    // Weak colors have equal intensity.
    newMediumIntensityFloat = newMinIntensityFloat;
  } else {
    // Calculate medium intensity with respect to original intensity proportion.
    const intensityProportion = (
      maxIntensityFloat - mediumIntensityFloat
    ) / (
      mediumIntensityFloat - minIntensityFloat
    );
    newMediumIntensityFloat = (
      intensityProportion * newMinIntensityFloat + maxIntensityFloat
    ) / (
      intensityProportion + 1
    );
  }

  const newRgbIntensityFloat = [];
  const newRgbIntensityFloatSorted = [
    newMinIntensityFloat,
    newMediumIntensityFloat,
    maxIntensityFloat,
  ];

  // We've found new intensities, but we have then sorted from min to max.
  // Now we have to restore original order.
  rgbIntensityFloat.forEach((originalRgb) => {
    const rgbSortedIndex = rgbIntensityFloatSorted.indexOf(originalRgb);
    newRgbIntensityFloat.push(newRgbIntensityFloatSorted[rgbSortedIndex]);
  });

  const floatToHex = (val) => (`0${Math.round(val * 255).toString(16)}`).substr(-2);
  const rgb2hex = (rgb) => `#${floatToHex(rgb[0])}${floatToHex(rgb[1])}${floatToHex(rgb[2])}`;

  const newHex = rgb2hex(newRgbIntensityFloat);

  return newHex;
}

function Issues({
  data, setData,
}) {
  const [isIssuesLoading, setIssuesLoading] = useState(false);
  const [nextIssuesPage, setNextIssuesPage] = useState(1);

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS).then((res) => res.json()).then(async ({ resources: { core } }) => {
      if (core.remaining) {
        const issues = await fetch(`${data.issues_url.replace(/\{.*?\}/, '')}?per_page=20`, FETCH_HEADERS).then((r) => r.json());
        const issuesCount = await fetch(`${data.issues_url.replace(/\{.*?\}/, '')}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 0);

        if (issuesCount > 20) setNextIssuesPage(2);
        else setNextIssuesPage(null);

        setData({
          ...data,
          issues,
          issuesCount,
        });
      }
    });
  }, []);

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
    data.issues?.length ? (
      <div>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
          <Icon icon="octicon:issue-opened-16" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          Issues
          <span className="text-xs mt-2">
            (
            {data.issuesCount.toLocaleString()}
            )
          </span>
        </div>
        <div className="mt-6 flex flex-col text-zinc-600 dark:text-zinc-300">
          {data.issues.map((e, i) => (
            <div className={`w-full p-4 ${i ? 'border-t border-zinc-300 dark:border-zinc-600' : 'pt-0'}`}>
              <div className="flex items-center gap-2">
                <Icon icon="octicon:issue-opened-16" className="text-green-700 dark:text-green-500 w-5 h-5 flex-shrink-0" />
                <h4 className="text-xl flex-shrink overflow-hidden overflow-ellipsis whitespace-nowrap font-bold pr-2">{e.title}</h4>
                <div className="flex items-center gap-2">
                  {e.labels.slice(0, 3).map((t) => {
                    const color = !hexIsLight(t.color) ? applySaturationToHexColor(shadeColor(`#${t.color}`, 100), 80) : `#${t.color}`;
                    return (
                      <>
                        <div className={`text-xs font-bold shadow-md rounded-full px-3 whitespace-nowrap pt-1.5 pb-1 inline dark:hidden ${hexIsLight(t.color) ? 'text-zinc-600' : 'text-white'}`} style={{ backgroundColor: `#${t.color}` }}>{t.name}</div>
                        <div
                          className="text-xs font-bold shadow-md rounded-full px-3 whitespace-nowrap outline outline-1 pt-1.5 pb-1 hidden dark:inline"
                          style={{
                            backgroundColor: `${color}20`,
                            outlineColor: color,
                            color,
                          }}
                        >
                          {t.name}
                        </div>
                      </>
                    );
                  })}
                  {e.labels.length - 3 > 0 && (
                  <span className="whitespace-nowrap">
                    +
                    {e.labels.length - 3}
                    {' '}
                    more
                  </span>
                  )}
                </div>
              </div>
              <div className="flex gap-4 items-center text-zinc-400 text-sm ml-7 mt-1.5">
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
          <button onClick={fetchNextIssuesPage} type="button" className="text-lg text-white h-14 w-full bg-custom-500 rounded-md shadow-md mt-6">
            {isIssuesLoading ? 'Loading...' : 'Load more'}
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

export default Issues;

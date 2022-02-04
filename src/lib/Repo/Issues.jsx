/* eslint-disable no-throw-literal */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
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

export function shadeColor(col, amt) {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  let R = parseInt(col.substring(0, 2), 16);
  let G = parseInt(col.substring(2, 4), 16);
  let B = parseInt(col.substring(4, 6), 16);

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
  if (!/^#([0-9a-f]{6})$/i.test(hex)) {
    throw ('Unexpected color format');
  }

  if (saturationPercent < 0 || saturationPercent > 100) {
    throw ('Unexpected color format');
  }

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
    const intensityProportion = (maxIntensityFloat - mediumIntensityFloat) / (mediumIntensityFloat - minIntensityFloat);
    newMediumIntensityFloat = (intensityProportion * newMinIntensityFloat + maxIntensityFloat) / (intensityProportion + 1);
  }

  const newRgbIntensityFloat = [];
  const newRgbIntensityFloatSorted = [newMinIntensityFloat, newMediumIntensityFloat, maxIntensityFloat];

  // We've found new intensities, but we have then sorted from min to max.
  // Now we have to restore original order.
  rgbIntensityFloat.forEach((originalRgb) => {
    const rgbSortedIndex = rgbIntensityFloatSorted.indexOf(originalRgb);
    newRgbIntensityFloat.push(newRgbIntensityFloatSorted[rgbSortedIndex]);
  });

  const floatToHex = function (val) { return (`0${Math.round(val * 255).toString(16)}`).substr(-2); };
  const rgb2hex = function (rgb) { return `#${floatToHex(rgb[0])}${floatToHex(rgb[1])}${floatToHex(rgb[2])}`; };

  const newHex = rgb2hex(newRgbIntensityFloat);

  return newHex;
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
                <h4 className="text-xl flex-shrink overflow-hidden overflow-ellipsis whitespace-nowrap font-bold pr-2">{e.title}</h4>
                <div className="flex items-center gap-2">
                  {e.labels.map((t) => {
                    const color = !hex_is_light(t.color) ? applySaturationToHexColor(shadeColor(`#${t.color}`, 100), 80) : `#${t.color}`;
                    return (
                      <>
                        <div className={`text-xs font-bold shadow-md rounded-full px-3 whitespace-nowrap pt-1.5 pb-1 inline dark:hidden ${hex_is_light(t.color) ? 'text-slate-600' : 'text-white'}`} style={{ backgroundColor: `#${t.color}` }}>{t.name}</div>
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

import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function Navbar({ theme, setTheme }) {
  return (
    <nav className="flex items-center justify-between mb-6">
      <Link to="/">
        <svg width="135" height="34" viewBox="0 0 135 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_4_10)">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.9195 0C7.57149 0 0 7.57149 0 16.9195C0 24.4064 4.84322 30.7301 11.5687 32.972C12.4147 33.12 12.732 32.6124 12.732 32.1683C12.732 31.7664 12.7108 30.434 12.7108 29.017C8.45977 29.7995 7.36 27.9807 7.02161 27.029C6.83126 26.5425 6.00644 25.0409 5.28736 24.6391C4.69517 24.3218 3.8492 23.5393 5.26621 23.5182C6.59862 23.497 7.55034 24.7448 7.86759 25.2524C9.39034 27.8115 11.8225 27.0924 12.7954 26.6483C12.9434 25.5485 13.3876 24.8083 13.874 24.3853C10.1094 23.9623 6.17563 22.503 6.17563 16.0313C6.17563 14.1913 6.83126 12.6685 7.90989 11.4841C7.74069 11.0612 7.14851 9.3269 8.07908 7.00046C8.07908 7.00046 9.49609 6.55632 12.732 8.73471C14.0855 8.35402 15.5237 8.16368 16.9618 8.16368C18.4 8.16368 19.8382 8.35402 21.1917 8.73471C24.4276 6.53517 25.8446 7.00046 25.8446 7.00046C26.7752 9.3269 26.183 11.0612 26.0138 11.4841C27.0924 12.6685 27.748 14.1701 27.748 16.0313C27.748 22.5241 23.7931 23.9623 20.0285 24.3853C20.6418 24.914 21.1706 25.9292 21.1706 27.5154C21.1706 29.7784 21.1494 31.5972 21.1494 32.1683C21.1494 32.6124 21.4667 33.1412 22.3126 32.972C25.6714 31.838 28.59 29.6792 30.6577 26.7997C32.7254 23.9201 33.8381 20.4646 33.8391 16.9195C33.8391 7.57149 26.2676 0 16.9195 0Z" className="fill-slate-600 dark:fill-white" />
          </g>
          <path d="M50.754 26.176C49.6247 26.176 48.6273 25.9487 47.762 25.494C46.8967 25.0393 46.222 24.4087 45.738 23.602C45.2687 22.7807 45.034 21.8347 45.034 20.764V15.836C45.034 14.7653 45.2687 13.8193 45.738 12.998C46.222 12.1767 46.8967 11.546 47.762 11.106C48.6273 10.6513 49.6247 10.424 50.754 10.424C51.8687 10.424 52.8513 10.644 53.702 11.084C54.5673 11.524 55.2347 12.1253 55.704 12.888C56.188 13.636 56.43 14.472 56.43 15.396V15.55C56.43 15.6233 56.4007 15.6893 56.342 15.748C56.298 15.792 56.2393 15.814 56.166 15.814H53.592C53.5187 15.814 53.4527 15.792 53.394 15.748C53.35 15.6893 53.328 15.6233 53.328 15.55V15.484C53.328 14.8093 53.0933 14.2447 52.624 13.79C52.1547 13.3207 51.5313 13.086 50.754 13.086C49.962 13.086 49.324 13.3353 48.84 13.834C48.3707 14.318 48.136 14.956 48.136 15.748V20.852C48.136 21.644 48.3927 22.2893 48.906 22.788C49.4193 23.272 50.072 23.514 50.864 23.514C51.6267 23.514 52.2353 23.316 52.69 22.92C53.1447 22.5093 53.372 21.9447 53.372 21.226V20.236C53.372 20.1627 53.3353 20.126 53.262 20.126H50.798C50.7247 20.126 50.6587 20.104 50.6 20.06C50.556 20.0013 50.534 19.9353 50.534 19.862V17.838C50.534 17.7647 50.556 17.706 50.6 17.662C50.6587 17.6033 50.7247 17.574 50.798 17.574H56.166C56.2393 17.574 56.298 17.6033 56.342 17.662C56.4007 17.706 56.43 17.7647 56.43 17.838V20.742C56.43 21.8567 56.1953 22.8247 55.726 23.646C55.2567 24.4673 54.5893 25.098 53.724 25.538C52.8733 25.9633 51.8833 26.176 50.754 26.176ZM59.9567 26C59.8834 26 59.8174 25.978 59.7587 25.934C59.7147 25.8753 59.6927 25.8093 59.6927 25.736V10.864C59.6927 10.7907 59.7147 10.732 59.7587 10.688C59.8174 10.6293 59.8834 10.6 59.9567 10.6H62.5307C62.604 10.6 62.6627 10.6293 62.7067 10.688C62.7654 10.732 62.7947 10.7907 62.7947 10.864V25.736C62.7947 25.8093 62.7654 25.8753 62.7067 25.934C62.6627 25.978 62.604 26 62.5307 26H59.9567ZM76.978 10.6C77.0513 10.6 77.11 10.6293 77.154 10.688C77.2127 10.732 77.242 10.7907 77.242 10.864V13.02C77.242 13.0933 77.2127 13.1593 77.154 13.218C77.11 13.262 77.0513 13.284 76.978 13.284H73.04C72.9667 13.284 72.93 13.3207 72.93 13.394V25.736C72.93 25.8093 72.9007 25.8753 72.842 25.934C72.798 25.978 72.7393 26 72.666 26H70.092C70.0187 26 69.9527 25.978 69.894 25.934C69.85 25.8753 69.828 25.8093 69.828 25.736V13.394C69.828 13.3207 69.7913 13.284 69.718 13.284H65.89C65.8167 13.284 65.7507 13.262 65.692 13.218C65.648 13.1593 65.626 13.0933 65.626 13.02V10.864C65.626 10.7907 65.648 10.732 65.692 10.688C65.7507 10.6293 65.8167 10.6 65.89 10.6H76.978Z" className="fill-slate-600 dark:fill-white" />
          <path d="M85.6494 26C85.5761 26 85.5101 25.978 85.4514 25.934C85.4074 25.8753 85.3854 25.8093 85.3854 25.736V10.864C85.3854 10.7907 85.4074 10.732 85.4514 10.688C85.5101 10.6293 85.5761 10.6 85.6494 10.6H88.2234C88.2968 10.6 88.3554 10.6293 88.3994 10.688C88.4581 10.732 88.4874 10.7907 88.4874 10.864V25.736C88.4874 25.8093 88.4581 25.8753 88.3994 25.934C88.3554 25.978 88.2968 26 88.2234 26H85.6494ZM100.889 10.864C100.889 10.7907 100.911 10.732 100.955 10.688C101.013 10.6293 101.079 10.6 101.153 10.6H103.727C103.8 10.6 103.859 10.6293 103.903 10.688C103.961 10.732 103.991 10.7907 103.991 10.864V25.736C103.991 25.8093 103.961 25.8753 103.903 25.934C103.859 25.978 103.8 26 103.727 26H101.241C101.094 26 100.991 25.9413 100.933 25.824L95.2347 16.408C95.2054 16.364 95.1761 16.3493 95.1467 16.364C95.1174 16.364 95.1027 16.3933 95.1027 16.452L95.1467 25.736C95.1467 25.8093 95.1174 25.8753 95.0587 25.934C95.0147 25.978 94.9561 26 94.8827 26H92.3087C92.2354 26 92.1694 25.978 92.1107 25.934C92.0667 25.8753 92.0447 25.8093 92.0447 25.736V10.864C92.0447 10.7907 92.0667 10.732 92.1107 10.688C92.1694 10.6293 92.2354 10.6 92.3087 10.6H94.7947C94.9414 10.6 95.0441 10.6587 95.1027 10.776L100.779 20.148C100.808 20.192 100.837 20.214 100.867 20.214C100.896 20.1993 100.911 20.1627 100.911 20.104L100.889 10.864ZM118.097 12.998C118.097 13.0713 118.067 13.1373 118.009 13.196C117.965 13.24 117.906 13.262 117.833 13.262H110.639C110.565 13.262 110.529 13.2987 110.529 13.372V16.782C110.529 16.8553 110.565 16.892 110.639 16.892H115.369C115.442 16.892 115.501 16.9213 115.545 16.98C115.603 17.024 115.633 17.0827 115.633 17.156V19.29C115.633 19.3633 115.603 19.4293 115.545 19.488C115.501 19.532 115.442 19.554 115.369 19.554H110.639C110.565 19.554 110.529 19.5907 110.529 19.664V25.736C110.529 25.8093 110.499 25.8753 110.441 25.934C110.397 25.978 110.338 26 110.265 26H107.691C107.617 26 107.551 25.978 107.493 25.934C107.449 25.8753 107.427 25.8093 107.427 25.736V10.864C107.427 10.7907 107.449 10.732 107.493 10.688C107.551 10.6293 107.617 10.6 107.691 10.6H117.833C117.906 10.6 117.965 10.6293 118.009 10.688C118.067 10.732 118.097 10.7907 118.097 10.864V12.998ZM126.074 26.242C124.93 26.242 123.918 26.0073 123.038 25.538C122.172 25.0687 121.498 24.416 121.014 23.58C120.53 22.7293 120.288 21.754 120.288 20.654V15.946C120.288 14.8607 120.53 13.9 121.014 13.064C121.498 12.228 122.172 11.5827 123.038 11.128C123.918 10.6587 124.93 10.424 126.074 10.424C127.232 10.424 128.244 10.6587 129.11 11.128C129.99 11.5827 130.672 12.228 131.156 13.064C131.64 13.9 131.882 14.8607 131.882 15.946V20.654C131.882 21.754 131.64 22.7293 131.156 23.58C130.672 24.4307 129.99 25.0907 129.11 25.56C128.244 26.0147 127.232 26.242 126.074 26.242ZM126.074 23.58C126.88 23.58 127.533 23.3233 128.032 22.81C128.53 22.2967 128.78 21.6147 128.78 20.764V15.924C128.78 15.0733 128.53 14.3913 128.032 13.878C127.548 13.35 126.895 13.086 126.074 13.086C125.267 13.086 124.614 13.35 124.116 13.878C123.632 14.3913 123.39 15.0733 123.39 15.924V20.764C123.39 21.6147 123.632 22.2967 124.116 22.81C124.614 23.3233 125.267 23.58 126.074 23.58Z" className="fill-indigo-500 dark:fill-indigo-400" />
        </svg>
      </Link>
      <button type="button" className="bg-indigo-500 p-3 rounded-md shadow-md" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <Icon icon={`uil:${theme === 'dark' ? 'moon' : 'sun'}`} className="w-6 h-6 text-gray-100" />
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Navbar;

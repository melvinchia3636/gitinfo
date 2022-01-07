/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-children-prop */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import emoji from 'emoji-dictionary';
import '../assets/markdown.css';

function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-').split('-').filter((e) => e)
    .join('-');
  return React.createElement(`h${props.level}`, { id: slug }, props.children);
}

function Readme({ content }) {
  return (
    <div className="markdown-body mt-4 text-slate-600 dark:text-gray-100 !break-words">
      <ReactMarkdown
        children={content.replace(/:\w+:/gi, (name) => emoji.getUnicode(name))}
        plugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: HeadingRenderer,
          h2: HeadingRenderer,
          h3: HeadingRenderer,
          h4: HeadingRenderer,
          h5: HeadingRenderer,
          h6: HeadingRenderer,
          a: (props) => (
            <a
              href={props.href}
              target={!props.href.startsWith('#') ? '_blank' : ''}
              rel="noreferrer"
            >
              {props.children}
            </a>
          ),
          code({
            node, inline, className, children, ...props
          }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={materialLight}
                customStyle={{
                  backgroundColor: 'transparent',
                  padding: '0',
                  margin: '0',
                  fontSize: '100%',
                }}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
}

export default Readme;

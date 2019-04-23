import { connectComment, connectInput } from '@/connect';

import mustache from 'mustache';

const getTemplateById = id => {
  return document.getElementById(id).innerHTML;
};

const HTMLToElement = html => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  return template.content.firstChild;
};

export const renderTweetInput = placeholder => {
  const template = getTemplateById('tweet-input-template');
  const render = mustache.render(template, { placeholder });
  const element = HTMLToElement(render);

  const input = element.querySelector('input');

  connectInput(input);

  return element;
};

export const renderTweet = tweet => {
  const template = getTemplateById('tweet-template');
  const render = mustache.render(template, tweet);
  const element = HTMLToElement(render);

  const commentButton = element.querySelector('.comment-btn');
  const retweetButton = element.querySelector('.retweet-btn');
  const likeButton = element.querySelector('.like-btn');

  connectComment(commentButton, tweet.tweet_id);

  return element;
};

export const renderTimeline = tweets => {
  console.log(tweets);

  const timeline = document.getElementById('timeline');
  while (timeline.firstChild) timeline.removeChild(timeline.firstChild); // empty

  const tweetInput = renderTweetInput('¿Qué estás pensando?');
  timeline.appendChild(tweetInput);

  tweets.forEach(tweet => timeline.appendChild(renderTweet(tweet)));
};

export const render = state => {
  renderTimeline(state.tweets);
};

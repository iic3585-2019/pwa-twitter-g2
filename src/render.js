import { connectComment } from '@/connect';
import mustache from 'mustache';

const getTemplateById = id => {
  return document.getElementById(id).innerHTML;
};

const HTMLToElement = html => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  return template.content.firstChild;
};

export const renderTweet = tweet => {
  const template = getTemplateById('template-1');
  const render = mustache.render(template, tweet);
  const element = HTMLToElement(render);

  const commentButton = element.querySelector('.comment-btn');
  const retweetButton = element.querySelector('.retweet-btn');
  const likeButton = element.querySelector('.like-btn');

  connectComment(commentButton, tweet.tweet_id);

  return element;
};

export const renderTimeline = tweets => {
  const timeline = document.getElementById('timeline');

  tweets.map(renderTweet).forEach(tweet => {
    timeline.appendChild(tweet);
  });
};

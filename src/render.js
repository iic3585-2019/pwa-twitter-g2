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

export const renderInput = placeholder => {
  const template = getTemplateById('template-0');
  const render = mustache.render(template, { placeholder });
  const element = HTMLToElement(render);

  const input = element.querySelector('input');
  connectInput(input);

  return element;
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

  const input = renderInput('Wena men');
  timeline.appendChild(input);

  tweets.map(renderTweet).forEach(tweet => {
    timeline.appendChild(tweet);
  });
};

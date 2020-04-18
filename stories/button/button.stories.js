import FlatButton from './flat-button.story.svelte';
import FilledButton from './filled-button.story.svelte';
import OutlineButton from './outline-button.story.svelte';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import docs from './docs.mdx';

export default {
  title: 'Button',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: docs,
    },
  },
};

const knobs = {
  disabled: boolean('Disabled', false),
  buttonText: text('Button label', 'press me!'),
};

const eventHandlers = {
  click: action('click'),
};

export const flat = () => ({
  Component: FlatButton,
  props: knobs,
  on: eventHandlers,
});

export const filled = () => ({
  Component: FilledButton,
  props: knobs,
  on: eventHandlers,
});

export const outline = () => ({
  Component: OutlineButton,
  props: knobs,
  on: eventHandlers,
});

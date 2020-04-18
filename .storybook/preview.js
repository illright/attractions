import '@storybook/addon-console';
import React from 'react';
import { addParameters } from '@storybook/svelte';


/* Renders a Svelte component into React.
   Source code adapted from react-svelte by Rich Harris
     https://github.com/Rich-Harris/react-svelte */
class SvelteComponent extends React.Component {
	constructor() {
		super();
		this.container = React.createRef();
		this.instance = null;
		this.div = React.createElement('div', { ref: this.container });
	}

	componentDidMount() {
		const { this: Constructor, on, props } = this.props;

		this.instance = new Constructor({
			target: this.container.current,
			props
		});

    if (on != null) {
      for (let event of Object.keys(on)) {
        this.instance.$on(event, on[event]);
      }
    }
	}

	componentDidUpdate() {
		this.instance.$set(this.props.props);
	}

	componentWillUnmount() {
		this.instance.$destroy();
	}

	render() {
		return this.div;
	}
}


const storyOrder = [
	'Intro',
	'Button',
];

addParameters({
	options: {
    storySort: (a, b) => {
			if (a[1].kind === b[1].kind) {
				return 0;
			}
			for (let story of storyOrder) {
				if (story === a[1].kind) {
					return -1;
				}

				if (story === b[1].kind) {
					return 1;
				}
			}
		}
  },
  docs: {
    inlineStories: true,
    prepareForInline: story => {
      const { Component, props, on } = story();
      return React.createElement(
        SvelteComponent,
        { this: Component, props, on },
      );
    }
  } ,
});

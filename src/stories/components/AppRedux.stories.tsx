import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {Meta, Story} from '@storybook/react/types-6-0';
import App from '../../App';
import {ReduxStoreProviderDecorator} from '../decorators/ProviderDecorator';



export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <App {...args} />;

export const AppReduxExample = Template.bind({});
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {Meta, Story} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormType} from '../../component/AddItemForm/AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        }
    },
} as Meta;

const Template: Story<AddItemFormType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button inside form clicked')
}


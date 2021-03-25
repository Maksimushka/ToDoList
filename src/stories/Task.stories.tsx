import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from '../component/Task/Task';

export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskStatusCallback = action('Remove inside Task')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskStatusCallback,
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    taskId: '1',
    title: 'JS',
    isDone: true,
    todoId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    taskId: '1',
    title: 'JS',
    isDone: false,
    todoId: 'todolistId1'
}


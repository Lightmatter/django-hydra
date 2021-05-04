// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Setup Enzyme Adapter

// eslint-disable-next-line import/no-duplicates
import { mount, render, shallow } from 'enzyme';
// eslint-disable-next-line import/no-duplicates
import Enzyme from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.React = require('react');

// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Setup Enzyme Adapter
import { mount, render, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme with React 16 adapter
Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.React = require('react');

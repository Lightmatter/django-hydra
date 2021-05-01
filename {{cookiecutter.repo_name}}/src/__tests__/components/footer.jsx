import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { mount } from 'enzyme';
import Footer from '{{cookiecutter.repo_name}}/src/components/Footer';

describe('Footer', () => {
  it('renders footer unchanged', () => {
    const tree = mount(<footer />);
    expect(tree).toMatchSnapshot();
  });
});

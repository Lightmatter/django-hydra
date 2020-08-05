import React from 'react';
//import { createMount } from '@material-ui/core/test-utils';

import renderer from 'react-test-renderer';
import Link from 'components/router/Link';
import { shallow } from 'enzyme';

describe('Link', () => {
    it('renders Link unchanged', () => {
        const link = mount(<Link href="/signup">link</Link>);
        expect(link).toMatchSnapshot();
    });
    it('opens offsite links in a new tab', () => {
        const link = shallow(<Link href="http://www.google.com">link</Link>);
        expect(link.html()).toMatch('target="_blank"');
    });
    it('doesnt open onsite links in a new tab', () => {
        const link = shallow(<Link href="/home">link</Link>);
        expect(link.html()).not.toMatch('target="_blank"');
    });
    it('attaches the active class to links on the current url', () => {});
});

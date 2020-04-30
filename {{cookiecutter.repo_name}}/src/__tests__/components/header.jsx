import React from 'react';
import { createMount } from '@material-ui/core/test-utils';

import renderer from 'react-test-renderer';
import Header from 'components/header';

describe('Header', () => {
    it('renders header unchanged', () => {
        const renderedValue = createMount()(
            // Code of this component - <BtnIcon /> you can find above
            <Header />
        );

        expect(renderedValue.html()).toMatchSnapshot();
    });
});

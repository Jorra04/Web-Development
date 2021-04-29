import React from 'react';
import {render} from '@testing-library/react';
import {Checkbox} from './Checkbox'

import { fireEvent } from "@testing-library/dom";

test("Selecting Checkbox", ()=> {
    const {getByLabelText} = render(<Checkbox/>);
    const checkbox = getByLabelText(/not checked/);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
})
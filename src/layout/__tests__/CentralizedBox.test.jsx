import CentralizedBox from "layout/CentralizedBox";
import {render, screen} from '@testing-library/react';

describe('CentralizedBox', () => {
    it('Renders children', () => {
        render(
            <CentralizedBox>
                Should it render anything
            </CentralizedBox>
        );
        const child = screen.getByText(/should it render anything/i);
        expect(child).toBeInTheDocument()
    })
})
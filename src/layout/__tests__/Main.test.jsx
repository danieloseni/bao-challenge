import Main from "layout/Main";
import {render, screen} from '@testing-library/react';

describe('Main', () => {
    it('Renders Children', () => {
        render(
            <Main>
                some children
            </Main>
        );
        const child = screen.getByText(/some children/i);
        expect(child).toBeInTheDocument()
    })
})
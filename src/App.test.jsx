import {render, screen} from '@testing-library/react';
import App from 'App';

describe("App", () => {
    it('Renders header', () => {
        render(
            <App />
        );
        const header = screen.getByTestId("header");
        expect(header).toBeInTheDocument();
    })
})
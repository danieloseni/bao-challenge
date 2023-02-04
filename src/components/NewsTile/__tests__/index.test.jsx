import NewsTile from "../";
import {render, screen} from '@testing-library/react';

describe("unit tests for news tile component", () => {
    it('renders accurately', () => {
        render(
            <NewsTile title="A man came forth" source="https://philomena.com" />
        )
        const title = screen.getByText(/a man came forth/i);
        expect(title).toBeInTheDocument()
    })
    it('redirects to source when title is clicked', () => {
        render(
            <NewsTile title="Some test title" source="https://philomena.com" />
        );
        const titleLink = screen.getByRole('link');
        expect(titleLink).toHaveAttribute('href', "https://philomena.com");
    })
})
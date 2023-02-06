import Header from "layout/Header";
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Header', () => {
    it('Renders home and admin nav links', () => {
        render(
            <Router>
                <Header />
            </Router>
        );
        const homeLink = screen.getByRole('link', {name: /home/i});
        const adminLink = screen.getByRole('link', {name: /admin/i});
        expect(homeLink).toBeInTheDocument()
        expect(adminLink).toBeInTheDocument()
    })
})
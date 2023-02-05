import NewsTile from "../";
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store';
import {BrowserRouter as Router} from "react-router-dom";
const mockStore = configureStore([]);

describe("unit tests for news tile component", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            someState: ''
        })
    })
    it('renders accurately', () => {
        render(
            <Provider store={store}>
                <Router>
                    <NewsTile title="A man came forth" source="https://philomena.com" />
                </Router>
            </Provider>
        )
        const title = screen.getByText(/a man came forth/i);
        expect(title).toBeInTheDocument()
    })
})
import {render, screen} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from "react-router-dom";
import Main from 'pages/Main';

const mockStore = configureStore([]);

const EssentialsWrapper = ({store}) => {
    return (
        <Provider store={store}>
          <Router>
            <Main />
          </Router>
        </Provider>
    );
}

describe("Main", () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            news: {
                newsItems: null
            }
        })
    })
    
    it("Shows redirection prompt when there's no news", () => {
        render(
          <EssentialsWrapper store={store} />
        );

        const prompt = screen.getByText(
            /Nothing has been loaded. Head on over to the admin page and load some news/i
        );
        const cta = screen.getByRole('link', {
            name: /Go to admin/i
        });
        expect(prompt).toBeInTheDocument();
        expect(cta).toBeInTheDocument()
    })

    it("Shows news when news is available", () => {
        store = mockStore({
            news: {
                newsItems: [{title: 'A piece of information', id: 22}]
            }
        })
        render(
            <EssentialsWrapper store={store} />
        );
        const storyLink = screen.getByText(/A piece of information/i);
        expect(storyLink).toBeInTheDocument()
    })

    it("Hides redirection prompt when there's  news", () => {
        store = mockStore({
            news: {
                newsItems: [{title: 'A piece of information', id: 22}]
            }
        })
        render(
            <EssentialsWrapper store={store} />
        );

        const prompt = screen.queryByText(
            /Nothing has been loaded. Head on over to the admin page and load some news/i
        );
        const cta = screen.queryByRole('link', {
            name: /Go to admin/i
        });

        expect(prompt).not.toBeInTheDocument();
        expect(cta).not.toBeInTheDocument()
    })
})

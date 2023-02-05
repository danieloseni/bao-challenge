import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from "react-router-dom";
import Admin from 'pages/Admin';
import {render, screen} from "@testing-library/react";
const mockStore = configureStore([]);
 
describe('Admin page', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            news: {
                apiNewsItemsLoaded: false,
                csvNewsItemsLoaded: false                
            }
        })
    });

    it("Shows fetch api news CTA when api news hasn't been loaded", () => {
        render(
          <Provider store={store}>
            <Router>
                <Admin />
            </Router>
          </Provider>
        );
        const apiNewsCta = screen.getByRole('button', {
            name: /fetch from api/i
        })
        expect(apiNewsCta).toBeInTheDocument();
    })
    it("Shows csv news CTA when api news hasn't been loaded", () => {
        render(
          <Provider store={store}>
            <Router>
                <Admin />
            </Router>
          </Provider>
        );
        const csvNewsCta = screen.getByRole('button', {
            name: /fetch from csv/i
        })
        expect(csvNewsCta).toBeInTheDocument();        
    })
    it("Shows api news fetched prompt when news has been fetched", () => {
        store = mockStore({
            news: {
                apiNewsItemsLoaded: true,
                csvNewsItemsLoaded: false                
            }
        })
        render(
          <Provider store={store}>
            <Router>
                <Admin />
            </Router>
          </Provider>
        );
        const apiNewsPrompt = screen.getByText(/api news has been fetched/i)
        expect(apiNewsPrompt).toBeInTheDocument();
    })
    it("Shows csv news fetched prompt when news has been fetched", () => {
        store = mockStore({
            news: {
                apiNewsItemsLoaded: false,
                csvNewsItemsLoaded: true                
            }
        })
        render(
          <Provider store={store}>
            <Router>
                <Admin />
            </Router>
          </Provider>
        );
        const csvNewsPrompt = screen.getByText(/csv has been fetched/i);
        expect(csvNewsPrompt).toBeInTheDocument();
    })
    it("Hides fetch api news CTA when api news has been loaded", () => {
        store = mockStore({
            news: {
                apiNewsItemsLoaded: true,
                csvNewsItemsLoaded: false                
            }
        })
        render(
          <Provider store={store}>
            <Router>
                <Admin />
            </Router>
          </Provider>
        );
        const apiNewsCta = screen.queryByRole('button', {
            name: /fetch from api/i
        })
        expect(apiNewsCta).not.toBeInTheDocument();
    })
    it("Hides csv news CTA when api news has been loaded", () => {
        store = mockStore({
            news: {
                apiNewsItemsLoaded: false,
                csvNewsItemsLoaded: true               
            }
        })
        render(
          <Provider store={store}>
            <Router>
                <Admin />
            </Router>
          </Provider>
        );
        const csvNewsCta = screen.queryByRole('button', {
            name: /fetch from csv/i
        })
        expect(csvNewsCta).not.toBeInTheDocument();
    })
})
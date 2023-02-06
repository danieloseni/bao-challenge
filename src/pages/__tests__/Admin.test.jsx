import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from "react-router-dom";
import Admin from 'pages/Admin';
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {getNewsItem, getNewsList} from 'data/newsApi';
import {Toaster} from 'react-hot-toast';


const EssentialsWrapper = ({store}) => {
    return (
        <Provider store={store}>
            <Router>
                <Admin />
            </Router>
        </Provider>
    );
}
const mockStore = configureStore([]);
jest.mock('data/newsApi', () => ({
    getNewsItem: jest.fn(),
    getNewsList: jest.fn()
}));

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
            <EssentialsWrapper store={store} /> 
        );
       
        const apiNewsCta = screen.getByRole('button', {
            name: /fetch from api/i
        })
        expect(apiNewsCta).toBeInTheDocument();
    })
    it("Shows csv news CTA when api news hasn't been loaded", () => {
        render(
            <EssentialsWrapper store={store} /> 
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
            <EssentialsWrapper store={store} /> 
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
            <EssentialsWrapper store={store} /> 
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
            <EssentialsWrapper store={store} /> 
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
            <EssentialsWrapper store={store} /> 
        );
        const csvNewsCta = screen.queryByRole('button', {
            name: /fetch from csv/i
        })
        expect(csvNewsCta).not.toBeInTheDocument();
    })
    it("Clicking on the api news CTA initiates fetching", async () => {
        
        getNewsList.mockImplementation(() => new Promise((res, rej) => {}));
        render(
            <EssentialsWrapper store={store} /> 
        );
        const apiNewsCta = screen.getByRole('button', {
            name: /fetch from api/i
        });       
        fireEvent(apiNewsCta, new MouseEvent('click', {bubbles: true}));        
        await waitFor(async () => expect(await screen.findByText(/hold on/i)).toBeInTheDocument());
    })
    it('Shows api error prompt upon api news fetch error', async () => {
        getNewsList.mockImplementation(() => new Promise((res, rej) => rej()));
        render(
            <EssentialsWrapper store={store} /> 
        );
        const apiNewsCta = screen.getByRole('button', {
            name: /fetch from api/i
        });
        fireEvent(apiNewsCta, new MouseEvent('click', {bubbles: true}));
        await waitFor(
            async () => expect(
                await screen.findByText(/whoops...something went wrong there/i)
            ).toBeInTheDocument()
        )
    })
    
})
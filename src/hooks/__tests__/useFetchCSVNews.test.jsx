import {useEffect} from "react";
import {render, screen, act} from '@testing-library/react';
import useFetchCSVNews from "hooks/useFetchCSVNews";
import {parseNews} from 'data/newsCSVParser';

jest.mock('data/newsCSVParser', () => ({
    parseNews: jest.fn(),
}));

const wait = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}
const SandBox = ({onData}) => {
    const {loading, fetchCsvNews, error} = useFetchCSVNews({onData});
    useEffect(() => {
        fetchCsvNews();
    //eslint-disable-next-line
    }, [])
    if(error) {
        return <>Error occurred</>
    }
    if(loading){
        return <>Loading...</>
    }    
    return <>Rendered</>
}

describe('useFetchCSVNews', () => {
    it('Returns a loading status when parse request is initiated', () => {
        parseNews.mockImplementation(() => new Promise((res) => {}));
        render(
            <SandBox onData={jest.fn()} />
        );
        const loadingBox = screen.getByText(/loading.../i);
        expect(loadingBox).toBeInTheDocument();   
    })
    
    
    it('Returns loading status as false when parse succeeds', async () => {
        parseNews.mockImplementation(() => new Promise((res) => res([])));
    
        render(
            <SandBox onData={jest.fn()} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(500));
        const loadingBox = screen.queryByText(/loading.../i);
        expect(loadingBox).not.toBeInTheDocument();        
    })
    
    it('Returns loading status as false when parse fails', async () => {
        parseNews.mockImplementation(() => new Promise((_, rej) => rej()));
    
        render(
            <SandBox onData={jest.fn()} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(500));
        const loadingBox = screen.queryByText(/loading.../i);
        expect(loadingBox).not.toBeInTheDocument();        
    })
    it("Returns error status as true when theres an error", async () => {
        parseNews.mockImplementation(() => {throw new Error('Something happened')});
        render(
            <SandBox onData={jest.fn()} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(500));
        const errorBox = screen.getByText(/error occurred/i);
        expect(errorBox).toBeInTheDocument();
    })
    it("Passes csv data down upon success", async () => {
        parseNews.mockImplementation(() => new Promise((res) => res([{title: "here to stay"}])));
        const onData = jest.fn();

        render(
            <SandBox onData={onData} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(500));
        expect(onData).toHaveBeenCalledWith(expect.arrayContaining([{title: 'here to stay'}]));
    })
})
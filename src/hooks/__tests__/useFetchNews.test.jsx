import {useEffect} from "react";
import {render, screen, act} from '@testing-library/react';
import useFetchNews from "hooks/useFetchNews";
import {getNewsItem, getNewsList} from 'data/newsApi';

jest.mock('data/newsApi', () => ({
    getNewsItem: jest.fn(),
    getNewsList: jest.fn()
}));

const wait = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const repeatData = (data, noOfTimes) => {
    const dataList = [];
    for(let i =0; i <  noOfTimes; i++){
        dataList.push(data)
    } 
    return dataList;
}


const SandBox = ({onNewsIds, onNewsItems}) => {
    const {loading, fetchNews, error} = useFetchNews({onNewsIds: onNewsIds, onNewsItems: onNewsItems});
    useEffect(() => {
        fetchNews();
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

describe('useFetchNews', () => {
    beforeEach(() => jest.resetModules());
    it('Returns a loading status when request is initiated', () => {
        getNewsList.mockImplementation(() => new Promise((res) => {}));
        render(
            <SandBox onNewsIds={jest.fn()} onNewsItems={jest.fn()} />
        );
        const loadingBox = screen.getByText(/loading.../i);
        expect(loadingBox).toBeInTheDocument();        
    })
    it('Returns loading status as false when request fails', async () => {
        getNewsList.mockImplementation(() => new Promise((res, rej) => rej()));

        render(
            <SandBox onNewsIds={jest.fn()} onNewsItems={jest.fn()} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(500));
        const loadingBox = screen.queryByText(/loading.../i);
        expect(loadingBox).not.toBeInTheDocument();        
    })
    it('Returns loading status as false when request succeeds', async () => {
        getNewsList.mockImplementation(() => wait(300));
        render(
            <SandBox onNewsIds={jest.fn()} onNewsItems={jest.fn()} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(500));
        const loadingBox = screen.queryByText(/loading.../i);
        expect(loadingBox).not.toBeInTheDocument();        
    })
    it("Returns error status as true when theres an error", async () => {
        getNewsList.mockImplementation(() => {throw new Error('Something happened')});
        render(
            <SandBox onNewsIds={jest.fn()} onNewsItems={jest.fn()} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(500));
        const errorBox = screen.getByText(/error occurred/i);
        expect(errorBox).toBeInTheDocument();
    })
    it("Passes ids down upon success", async () => {
        getNewsList.mockImplementation(() => new Promise((res) => res([1,2,3,4])));
        const onNewsIds = jest.fn();

        render(
            <SandBox onNewsIds={onNewsIds} onNewsItems={jest.fn()} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(500));
        expect(onNewsIds).toHaveBeenCalledWith(expect.arrayContaining([1,2,3,4]));
    })

    it("Passes news down upon success", async () => {
        getNewsList.mockImplementation(() => new Promise((res) => res([1,2,3,4])));
        getNewsItem.mockImplementation(() => new Promise((res) =>  res({title: "fish"})))
        const onNewsItems = jest.fn();

        render(
            <SandBox onNewsIds={jest.fn()} onNewsItems={onNewsItems} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(1000));
        expect(onNewsItems).toHaveBeenCalledWith(repeatData({title: "fish"}, 4));
    })

    it("Passes all news down upon success", async () => {
        getNewsList.mockImplementation(() => new Promise((res) => res(repeatData(1, 30))));
        getNewsItem.mockImplementation(() => new Promise((res) =>  res({title: "fish"})))
        const onNewsItems = jest.fn();

        render(
            <SandBox onNewsIds={jest.fn()} onNewsItems={onNewsItems} />
        );;
        //eslint-disable-next-line
        await act(() =>  wait(1000));
        expect(onNewsItems).toHaveBeenCalledWith(repeatData({title: "fish"}, 30));
    })

})
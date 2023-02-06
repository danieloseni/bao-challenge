import {getNewsItem, getNewsList} from "data/newsApi";
describe('newsApi', () => {
    describe('getNewsItem', () => {
        const successImplementation = () => ({
            json: () => ({title: "a studio element"})
        });
       
        it('return data upon success', async ()  => {
            jest.spyOn(global, 'fetch').mockImplementation(successImplementation);
            const newsItem = await getNewsItem(23);
            expect(newsItem).toEqual(expect.objectContaining({
                title: 'a studio element'
            }))
        })

    })



    describe('getNewsList', () => {
        const successImplementation = () => ({
            json: () => ([1,2,3,4])
        });
       
        it('return data upon success', async ()  => {
            jest.spyOn(global, 'fetch').mockImplementation(successImplementation);
            const newsList = await getNewsList();
            expect(newsList).toEqual(expect.arrayContaining([1,2,3,4]))
        })
    })
})
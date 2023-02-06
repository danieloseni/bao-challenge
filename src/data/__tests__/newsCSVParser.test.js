import Papa from 'papaparse';
import {parseNews} from 'data/newsCSVParser';
jest.mock('papaparse');

const testCSV = [
    ['title', 'score'],
    ['A fish in a book', 256],
    ['The greatest salesman in the world', 10000]
];

const testCSV2 = [
    ['title', 'score'],
    ['A fish in a book', 256],
    ['The greatest salesman in the world', 10000],
    ['']
];

describe('newsCSVParser', () => {
    describe('parseNews', () => {
        beforeEach(() => jest.resetModules());

        it('Returns CSV as JSON', async () => {
            jest.spyOn(Papa, 'parse').mockImplementation(
                (_, options) => {options.complete({data: testCSV});
            });
            const news = await parseNews();
            expect(news).toEqual(expect.arrayContaining([
                {
                    title: "A fish in a book",
                    score: 256
                },
            ]))
        })

        it('Throws out inconsistent data', async () => {
            jest.spyOn(Papa, 'parse').mockImplementation(
                (_, options) => {options.complete({data: testCSV2});
            });
            const news = await parseNews();
            expect(news.length).toBe(2);
            expect(news).toEqual([
                {
                    title: "A fish in a book",
                    score: 256
                },
                {
                    title: "The greatest salesman in the world",
                    score: 10000
                },
            ]);
            expect(news).not.toEqual(expect.arrayContaining([{title: ''}]));
        })
    })
})
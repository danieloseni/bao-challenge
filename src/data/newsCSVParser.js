import Papa from 'papaparse';

export const parseNews = async () => {
  const csv = await new Promise((res, rej) => {
    //No need to parse it via a worker since it's a file of a small size
    Papa.parse(`${process.env.PUBLIC_URL}/news.csv`, {
        download: true,
        complete: (result) => {
            res(result)
        }
    })
  });

  const news = [];
  const data = csv.data;

  for(let i = 1; i < data.length; i++){
    const currentCSV = data[i];
    const headers = data[0];
    const newsItem = {};
    if(currentCSV.length !== headers.length){
        continue;
    }
    for(let j = 0; j < currentCSV.length; j++){
        newsItem[headers[j]] = currentCSV[j]
    }
    news.push(newsItem);
  }
  return news;
}
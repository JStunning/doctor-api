export async function fetchData(url) {
  console.log("before", url);
  const theResults = await fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("returned fetch", data);
      console.log("returned fetch.results", data.results);
      return data.results;
    });

  return theResults;
}

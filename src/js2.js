//Напиши функцию fetchDataInSequence(urls), которая принимает массив URL и загружает их последовательно,
//дожидаясь выполнения каждого запроса перед следующим.
//Результат {url: {error, result}, url: {error, result}}
/* async function fetchDataInSequence(urls) {
    // Твоя реализация
    const res = {}
    urls.map(async url => {
        const response = await fetch(url)
        try {
            const result = await response.json()
            res[url] = {result}
        }
        catch (error) {
            console.log(error)
            res[url] = {error}
        }
    })
    return res
} */

async function fetchDataInSequence(urls) {
  const results = [];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      results.push({ url, data });
    } catch (error) {
      results.push({ url, error: error.message });
    }
  }

  return results;
}




// Пример использования:
fetchDataInSequence([
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3"
]).then(console.log);

//=====================================

// /----
//Напиши функцию executeWithLimit(tasks, limit),
// которая выполняет не более limit асинхронных операций одновременно.

  function executeWithLimit(tasks, limit) {
  // Твоя реализация
}

// Пример:
const tasks = [
  () => new Promise(res => setTimeout(() => res("Task 1"), 1000)),
  () => new Promise(res => setTimeout(() => res("Task 2"), 500)),
  () => new Promise(res => setTimeout(() => res("Task 3"), 2000)),
  () => new Promise(res => setTimeout(() => res("Task 4"), 1000))
];

executeWithLimit(tasks, 2).then(console.log);

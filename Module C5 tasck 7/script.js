const myButton = document.querySelector(".myButton");
const result = document.querySelector(".myResult");


function useRequest(page, limit){
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => {
    	if(!response.ok){ throw new Error() };
      return response.json();
    })
    .catch((error) => { alert('Проблема с выполнением запроса !') });
};


function showDataList(data) {
  let htmlText = '';
  for(let item in data) {
    let divText = '';
    divText = divText + `<p> ID: ${data[item]["id"]} </p>`;
    divText = divText + `<p> Автор: ${data[item]["author"]} </p>`;
    divText = divText + `<p> Размеры: ширина ${data[item]["width"]}px, высота ${data[item]["height"]}px </p>`;
    divText = divText + `<p> URL: <a href='${data[item]["url"]}'>${data[item]["url"]}</a> </p>`;
    divText = divText + `<p> Download URL: <a href='${data[item]["download_url"]}'> ${data[item]["download_url"]}</a> </p>`;
    htmlText = htmlText + `<div class="card">${divText}</div>`;  
  };
  result.innerHTML = htmlText;
};


function showImages(data) {
  let htmlText = '';
  for(let item in data) {
    htmlText = htmlText + `<img src="${data[item]["download_url"]}" width="20%" alt="picsum photos ${data[item]["id"]}">`   
  };
  result.innerHTML = htmlText;
};


document.addEventListener("DOMContentLoaded", () => {
  const myStorage = window.localStorage;
  data = myStorage.getItem("data");
  if (data) {
    showImages(JSON.parse(data));
    //myStorage.removeItem("data");
  };
});


myButton.addEventListener("click", async() => {
  const page = Number(document.querySelector('#myInputPage').value);
  const limit = Number(document.querySelector('#myInputLimit').value);

  try {
    if ((page < 1 || page > 10) && (limit < 1 || limit > 10)) {throw 'Номер страницы и лимит вне диапазона от 1 до 10 !'};
    if (page < 1 || page > 10) {throw 'Номер страницы вне диапазона от 1 до 10 !'};
    if (limit < 1 || limit > 10) {throw 'Лимит вне диапазона от 1 до 10 !'};
    result.innerHTML = `<h3>Ждем данные от серверв ...</h>`;
    let data = await(useRequest(page, limit));
    const myStorage = window.localStorage;
    myStorage.setItem("data", JSON.stringify(data));
    showDataList(data);
  } catch (exception) {
    result.innerHTML = `<h2>${exception}</h2>`;
  };
});
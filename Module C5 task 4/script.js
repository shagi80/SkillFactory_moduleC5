const myButton = document.querySelector(".myButton");
const result = document.querySelector(".myResult");


function useRequest(width, height){
  return fetch(`https://picsum.photos/${width}/${height}`)
    .then((response) => {
    	if(!response.ok){ throw new Error() };
      	return response.blob();
    })
    .then((myBlob) => { 
    	return URL.createObjectURL(myBlob);
    })
    .catch((error) => { alert('Проблема с выполнением запроса !') });
};


myButton.addEventListener("click", async() => {
  const width = Number(document.querySelector('#myInputWidth').value);
  const height = Number(document.querySelector('#myInputHeight').value);

  if (width && height) {
  	if(width >= 100 && width <= 300 && height >= 100 && height <= 300){
  		let src = await(useRequest(width, height));
  		result.innerHTML = `<img src=${src} alt="picsum.photos">`;
  	}else{
  		result.innerHTML = "<h2>Одно из чисел вне диапазона от 100 до 300 !</h2>";
  	}
  }else{
  	alert("Нужно ввести ширину и высоту !")
  };
});

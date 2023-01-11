const myButton = document.querySelector(".myButton");
const result = document.querySelector(".myResult");
const input = document.querySelector('#myInput');
const xhr = new XMLHttpRequest();

xhr.onload = function() {
	if (xhr.status == '200'){
		const objects = JSON.parse(xhr.response);
		let imagesText = '';
		for (item in objects){
			imagesText = imagesText + `<img src="${objects[item]['download_url']}"download_url"]}" width="80%" alt="изображение ${item}">`;
		};
		result.innerHTML = "<div class='images_box'>"+imagesText+"</div>";
	}else{
		result.innerHTML = "<h2>Ошибка запроса !</h2>";	
	};
};

xhr.onerror = function() {
 	result.innerHTML = "<h2>Ошибка запроса !</h2>";
 };


function myRequest(){
  const value = Number(input.value);

  if (value) {
  	if(value >= 1 && value <= 10){
  		xhr.open("get", `https://picsum.photos/v2/list?limit=${value}`, true);
		xhr.send();
  	}else{
  		result.innerHTML = "<h2>Число вне диапазона от 1 до 10</h2>";
  	}
  }else{
  	alert("Нужно ввести число !")
  };
};


myButton.addEventListener("click", myRequest);
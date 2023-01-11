const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`;

const myParser = new DOMParser();
const doc = myParser.parseFromString(xmlString, "application/xml");

let studentsList = [];

let i = 1;
while(doc.querySelector(`list student:nth-of-type(${i})`)){ 
  const xmlStudent = doc.querySelector(`list student:nth-of-type(${i})`);
  const student = {
    name: xmlStudent.querySelector('student name first').textContent +
      ' ' + xmlStudent.querySelector('student name second').textContent,
    age: Number(xmlStudent.querySelector('student age').textContent),
    prof: xmlStudent.querySelector('student prof').textContent,
    lang: xmlStudent.querySelector('student name').getAttribute('lang'),
  };
  studentsList.push(student); 
  i++;
};

const result = {
  list: studentsList,
};
  
console.log(result);
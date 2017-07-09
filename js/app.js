/* jshint esversion: 6*/

const requestButtonContainer = document.getElementById('requestResourceButton');
const inputContainer = document.getElementById('resourceId');
const mainContainer = document.getElementById('contentContainer');
const nameHeader = document.createElement('h2');
const genderContainer = document.createElement('p');
const speciesContainer = document.createElement('p');
mainContainer.appendChild(nameHeader);
mainContainer.appendChild(genderContainer);
mainContainer.appendChild(speciesContainer);

let swapiReq = new XMLHttpRequest();
function getSwapi () {
  let swapiObj = JSON.parse(this.responseText);
  let personLink = swapiObj.people;
  let personReq = new XMLHttpRequest();
  function getPerson () {
    let personObj = JSON.parse(this.responseText);
    requestButtonContainer.addEventListener('click', function(){
      let inputValue = inputContainer.value;
      if (inputValue >= 0 || inputValue <= 9){
        personName = personObj.results[inputValue].name;
        personGender = personObj.results[inputValue].gender;
        speciesLink = personObj.results[inputValue].species[0];
        let speciesReq = new XMLHttpRequest();
        function getSpecies () {
          let speciesObj = JSON.parse(this.responseText);
          console.log(speciesObj);
          nameHeader.innerHTML = personName;
          genderContainer.innerHTML = personGender;
          speciesContainer.innerHTML = speciesObj.name;

        }
        speciesReq.addEventListener('load', getSpecies);
        speciesReq.open('GET', speciesLink, true);
        speciesReq.send();
      }
    });
  }
  personReq.addEventListener('load', getPerson);
  personReq.open('GET', personLink, true);
  personReq.send();
}
swapiReq.addEventListener('load', getSwapi);
swapiReq.open('GET', 'https://swapi.co/api/', true);
swapiReq.send();













/*  requestButtonContainer.addEventListener('click', function(){
  let personId = parseInt(inputContainer.value);
  oReq.addEventListener('load', getPerson);
  oReq.open('GET', `https://swapi.co/api/people/${personId}`, true);
  oReq.send();
});*/

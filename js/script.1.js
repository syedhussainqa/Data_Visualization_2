/*
-------------------------------------------------
    This js is fetching Fifa 2018 data from http://api.football-data.org API.
    Search is triggred by selecting one of the drop down options. Each search will pull data from the API based on group &
    output it in a visulised graph.
-------------------------------------------------
*/

//object to injust data after doing a fetch
let soccerData = {}
//This API requires a header so it is declared in this variable
const options = {
    headers: new Headers({ 'X-Auth-Token': '034e960b7edd4d9ca919fd5ad14046ad' })
}
function displayData() {
    console.log('I am in display function')
    fetch('http://api.football-data.org/v2/competitions/2000/standings', options)
        .then(response => response.json())
        .then(data => {
            //This will pull all the data from standings API object
            soccerData = data.standings
            //console.log(soccerData)
        })

        .catch(error => console.error(error))
        .then(function displayInfo() {
            let element = document.querySelector('#output');
            let resultsUl = document.querySelector('.bar-graph');

            // Clear anything that might be in the div
            element.innerHTML = '';
            resultsUl.innerHTML = '';
            //Get values from the drop down                                                            
            let selectedGroup = document.querySelector('#fifa-groups-list :checked').value;
            console.log('User selcted group--------------', selectedGroup);

            const groupInfo = soccerData.find(function (group) {
                const groupName = group.group
                return group.type === "TOTAL" && groupName === selectedGroup
            })

            for (let team of groupInfo.table) {
                displayDataOnPage(team, element);
                createXAxis(resultsUl);
                displayGraphOnPage(team, resultsUl);
            }
        });
}

function displayDataOnPage(team, element) {
    let countryNames = team.team.name;
    let teamPoints = team.points;
    let teamGoals = team.goalsFor;
    let gamesPlayed = team.playedGames;
    let gamesWon = team.won;
    let gamesLost = team.lost;

    element.innerHTML += `<h3>Country Name: ${countryNames}</h3>`
    element.innerHTML += `<h3>Point : ${teamPoints}</h3>`
    element.innerHTML += `<h3>Team Goals: ${teamGoals}</h3>`
    element.innerHTML += `<h3>Total Games Played: ${gamesPlayed}</h3>`
    element.innerHTML += `<h3>Games Won: ${gamesWon}</h3>`
    element.innerHTML += `<h3>Games Lost: ${gamesLost}</h3>`
}

function displayGraphOnPage(team, resultsUl) {
    let countryNames = team.team.name;
    let teamPoints = team.points;

    let newLi = document.createElement('li');
    newLi.classList.add('bar-one');
    newLi.textContent = countryNames;
    newLi.style.height = teamPoints * 50 + 'px';
    resultsUl.appendChild(newLi);
}

function createXAxis(resultsUl){
    console.log('running')
    let newLi = document.createElement('li');
    newLi.classList.add('bar-graph-x-axis');
    let newDiv = document.createAttribute('div');
    newDiv.classList.add('bar-graph-label');
    let temp;
    for(let i = 0; i < 10; i++){
        newDiv.textContent = i;
        temp = newLi.appendChild(newDiv);
    }
    resultsUl.appendChild(temp)
}
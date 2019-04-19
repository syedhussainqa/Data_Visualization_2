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

            // This loop through the first integer keys under standing tree(array)
            for (let group of soccerData) {
                // verifying that the type needs to be type: TOTAL before entering the loop
                // because group has 3 types total, home , away. I am only interested in 'total'

                const gameType = group.type;  //total
                const groupName = group.group // this will get the group name like 'GROUP_A', 'GROUP_B'... 

                //This step is making sure the group name from the UI dropdown matches with API
                // like if GROUP_A !== GROUP_B {continue}
                if (groupName !== selectedGroup) {
                    continue;
                }


                if (gameType === 'TOTAL') {
                    console.log('-----------------', gameType);
                    console.log('This group is: ', groupName)

                    for (let team of group.table) {

                        switch (selectedGroup) {
                            case 'GROUP_A':
                                displayDataOnPage(team, element);
                                
                                //createXAxis(resultsUl);
                                createGraphOnPage(team, resultsUl);
                                break;
                            case 'GROUP_B':
                                displayDataOnPage(team, element);
                                createGraphOnPage(team, resultsUl);
                                break;
                            case 'GROUP_C':
                                displayDataOnPage(team, element);
                                createGraphOnPage(team, resultsUl);
                                break;
                            case 'GROUP_D':
                                displayDataOnPage(team, element);
                                createGraphOnPage(team, resultsUl);
                                break;
                            case 'GROUP_E':
                                displayDataOnPage(team, element);
                                createGraphOnPage(team, resultsUl);
                                break;
                            case 'GROUP_F':
                                displayDataOnPage(team, element);
                                createGraphOnPage(team, resultsUl);
                                break;
                            case 'GROUP_G':
                                displayDataOnPage(team, element);
                                createGraphOnPage(team, resultsUl);
                                break;
                            case 'GROUP_H':
                                displayDataOnPage(team, element);
                                createGraphOnPage(team, resultsUl);
                                break;
                        }

                    }

                }

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

    element.innerHTML += `<p>Country in this group: <strong> ${countryNames} </strong>. 
                                Point achieved by ${countryNames} : <strong> ${teamPoints}</strong></p>`
    //element.innerHTML += `<p>Point achieved by ${countryNames} : ${teamPoints}</p>`
    // element.innerHTML += `<p>Team Goals: ${teamGoals}</p>`
    // element.innerHTML += `<p>Total Games Played: ${gamesPlayed}</p>`
    // element.innerHTML += `<p>Games Won: ${gamesWon}</p>`
    // element.innerHTML += `<p>Games Lost: ${gamesLost}</p>`
}

function createGraphOnPage(team, resultsUl) {
    let countryNames = team.team.name;
    let teamPoints = team.points;

    let newLi = document.createElement('li');
    newLi.classList.add('bar-one');
    newLi.textContent = countryNames;
    newLi.textContent += ` | Team Points: ${teamPoints}`;
    newLi.style.height = teamPoints * 50 + 'px';
    resultsUl.appendChild(newLi);

    
}

function createXAxis(resultsUl){
    console.log('running')
    
    // let newLi = document.createElement('li');
    // newLi.classList.add('bar-graph-x-axis');
    // let newDiv = document.createAttribute('div');
    // newDiv.classList.add('bar-graph-label');
    // let temp;
    // for(let i = 0; i < 10; i++){
    //     newDiv.textContent = i;
    //     temp = newLi.appendChild(newDiv);
    // }
    // resultsUl.appendChild(temp)
}
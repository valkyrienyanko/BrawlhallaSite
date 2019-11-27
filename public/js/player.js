var parameters = location.search.substring(1).split("&")
var playerId = parameters[0].split('=')[1]

let player = {}

let myRequest = new Request('players/' + playerId)
fetch(myRequest).then(function(response) {
    if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status)
    }
    return response.json()
}).then(function(response) {
    player = response
  
    createElements()
})

function createElements() {
  createElement('p', 'Name: ' + player.name)
  createElement('p', 'Level: ' + player.level)
  createElement('p', 'Wins: ' + player.wins)
  createElement('p', 'XP: ' + player.xp)
  createElement('p', 'Games: ' + player.games)
  createElement('p', 'Clan: ' + player.clan.clan_name)
}
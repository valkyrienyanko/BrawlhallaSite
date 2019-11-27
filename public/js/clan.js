var parameters = location.search.substring(1).split("&")
var clanId = parameters[0].split('=')[1]

const members = []

let myRequest = new Request('clans/' + clanId)
fetch(myRequest).then(function(response) {
    if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status)
    }
    return response.json()
}).then(function(response) {
    const clanName = response.clan_name
    const clanXp = response.clan_xp
    const clanMembers = response.clan
    
    const clanCreateDateRaw = new Date(1000 * response.clan_create_date)
    const options = {year: 'numeric', month: 'short', day: 'numeric'}
    const date = clanCreateDateRaw.toLocaleDateString('en-US', options)
    
    createElement('h1', clanName)
    createElement('p', 'Clan Created: ' + date)
    createElement('p', 'Clan XP: ' + clanXp)

    for (let i = 0; i < clanMembers.length; i++) {
      members.push({
        id: clanMembers[i].brawlhalla_id,
        joinDate: clanMembers[i].join_date,
        name: clanMembers[i].name,
        rank: clanMembers[i].rank,
        xp: clanMembers[i].xp
      })
    }
    
    displayMembers('xp')
})

function displayMembers(sortType) {
  sort(sortType)
  
  const clan = document.getElementById('clan')
  if (clan != null) {
    clan.remove()
  }
  
  const divClan = document.createElement('div')
  divClan.setAttribute('id', 'clan')
  
  const list = document.createElement('ul')
  divClan.appendChild(list)
  
  for (let i = 0; i < members.length; i++){
    const dateRaw = new Date(1000 * members[i].joinDate)
    const options = {year: 'numeric', month: 'short', day: 'numeric'}
    const date = dateRaw.toLocaleDateString('en-US', options)
    const name = members[i].name
    const rank = members[i].rank
    const xp = members[i].xp
    const id = members[i].id
    
    const li = document.createElement('li')
    
    const theElement = document.createElement('a')
    theElement.href = 'player.html?player=' + id
    const theElementText = document.createTextNode(date + ' ' + name + ' ' + rank + ' ' + xp)
    theElement.appendChild(theElementText)
    li.appendChild(theElement)
    list.appendChild(li)
  }
  
  document.body.appendChild(divClan)
}

function sort(type) {
  switch (type) {
    case 'rank':
      sortByRank()
    break
    case 'date':
      sortByDate()
    break
    case 'xp':
      sortByXp()
    break
    case 'name':
      sortByName()
    break
  }
}

function sortByRank() {
  members.sort(function(a,b){
    return rankWeight(b.rank) - rankWeight(a.rank)
  })
}

function rankWeight(rank){
  switch (rank) {
    case 'Leader':
      return 4
    case 'Officer':
      return 3
    case 'Member':
      return 2
    case 'Recruit':
      return 1
  }
}

function sortByName() {
  members.sort(function(a,b){
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
}

function sortByXp() {
  members.sort(function(a,b){
    return b.xp - a.xp
  })
}

function sortByDate() {
  members.sort(function(a,b){
    return new Date(a.joinDate) - new Date(b.joinDate)
  })
}
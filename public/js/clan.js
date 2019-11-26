var parameters = location.search.substring(1).split("&")
var clanId = parameters[0].split('=')[1]

let myRequest = new Request('clans/' + clanId)
fetch(myRequest).then(function(response) {
    if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status)
    }
    return response.json()
}).then(function(response) {
    console.log(response)
  
    const clanName = response.clan_name
    
    if (clanName != null) {
      createElement('h1', clanName)
    }
})

function createElement(type, content) {
    const theElement = document.createElement(type)
    const theElementText = document.createTextNode(content)
    theElement.appendChild(theElementText)
    document.body.appendChild(theElement)
    return theElement;
}

function redirectHome() {
  window.location.href = '/'
}
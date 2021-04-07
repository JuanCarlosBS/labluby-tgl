numbers = []
users = [{
    name: 'admin',
    email: 'admin@admin.com',
    password: '123'
}]

function logIn() {
    const email = document.querySelector('#email').value
    const password = document.querySelect('#password').value

    users.forEach((item) => {
        if (item['email'] === email && item['password'] === password) {
            return true
        }
    });
}

function createUser() {
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    users.forEach((item) => {
        if (item['email'] === email ) {
            return false
        }

        users.put({
            name: name,
            email: email,
            password: password
        })
        
        return true
    });

}

function forgotPassword() {
    const email = document.querySelector('#email').value
    users.forEach(item => {
        if (item['email'] === email ) {
            return true
            const password = document.querySelector('#password').value
            item['password'] = password
        }
    })
}
function completeGame(game) {
    if (game) {
        Math.floor(Math.random() * 61)
    }

    if (game) {
        Math.floor(Math.random() * 81)
    }

    if (game) {
        Math.floor(Math.random() * 26)
    }
}

function clearGame() {
    while (numbers.length > 0) {
        numbers.shift()
    }
}

function addToCard() {
    var removeButton = document.createElement('button')

    removeButton.addEventListener('click', () => {
        deleteCard(removeButton)
    })
}

function deleteCard(removeButton) {
    const deleteCard = removeButton.parentNode
    deleteCard.parentNode.removeChild(deleteCard) 
}
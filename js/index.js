numbers = []

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
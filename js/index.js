

'use strict';
var games = []
var activeGame;
var ajax = new XMLHttpRequest();
ajax.open('GET', '/json/games.json');
ajax.send();
ajax.onreadystatechange = () => {
    if (ajax.status === 200 && ajax.readyState === 4) {
        var data = JSON.parse(ajax.responseText);
        data.types.map((item, index) => {
            games.push(item)
        })
        activeDivGame()
        handleCart()
    }
}

var numbers = [];
var id = 0;
var cart = [];
var activeGame;

function addNumber(number) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === number)
            return
    }
    if (numbers.length < games[activeGame].maxNumber) {
        numbers.push(number)
    } else {
        numbers.shift()
        numbers.push(number)
    }
}

function completeGame() {
    while (numbers.length < games[activeGame].maxNumber) {
        var number = Math.floor(Math.random() * games[activeGame].range) + 1
        addNumber(number)
    }
}

function handleGames(gameindex) {
    const $descriptionGame = document.querySelector('.description-game')
    const $numbers = document.querySelector('.numbers')
    clearLabel($numbers)
    clearLabel($descriptionGame)
    $descriptionGame.innerHTML = '<h4>Fill your bet</h4>'
    $descriptionGame.innerHTML += `<p>${games[gameindex].description}</p>`
    for (let i = 1; i <= games[gameindex].range; i++) {
        let label = i
        if (label < 10)
            label = `0${label}`
        $numbers.innerHTML += `<button class="number" id="${i}" onclick="addNumber(${i})">${label}</button>`
    }
    activeGame = gameindex
    activeDivGame(activeGame)
    clearGame()
}

function activeDivGame(game) {
    let $filters = document.querySelector('.filters')
    clearLabel($filters)
    for (let i = 0; i < games.length; i++) {
        if (i === game) {
            $filters.innerHTML += `<div class="checkbox" style="color: #FFFFFF; background-color: ${games[i].color}; border-color: ${games[i].color};" onclick="handleGames(${i})">${games[i].type}</div>`
        } else {
            $filters.innerHTML += `<div class="checkbox" style="color: ${games[i].color}; background-color: #FFFFFF; border-color: ${games[i].color};" onclick="handleGames(${i})">${games[i].type}</div>`
        }
    }
}

function clearGame() {
    numbers = []
}

function clearLabel(param) {
    return param.innerHTML = ''
}

function handleCart(param, numberRemove) {
    if (param === 'addCart') {
        var cartobject = {
            id: id,
            numbers: numbers,
            game: games[activeGame].type,
            disabled: false,
            color: games[activeGame].color,
            price: games[activeGame].price
        }
        cart.push(cartobject)
        numbers = []
        id += 1
    } else if (param === 'removeCart') {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === numberRemove) {
                cart[i].disabled = true;
            }
        }
    }
    let cartSum = 0;
    var $totalCart = document.querySelector('.total-cart');
    var $items = document.querySelector('.items')
    clearLabel($totalCart)
    clearLabel($items)
    for (let i = 0; i < cart.length; i++) {
        cart[i].numbers.sort(function (a, b) { return a - b })
        if (cart[i].disabled === false) {
            cartSum = cartSum + cart[i].price
            $items.innerHTML += `                        
                <div class="item">
                    <img class="remove" "type="button" onclick="handleCart('removeCart', ${cart[i].id})" src="../../assets/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png"/>
                    <div class="bar" style='background-color:${cart[i].color};' 'border: 2px solid ${cart[i].color};'></div>
                    <div class="item-content">
                        <p>${cart[i].numbers}</p>
                        <div class="game-name-price">
                            <h5 style='color:${cart[i].color};'>${cart[i].game}</h5>
                            <h6>${cart[i].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h6>
                        </div>
                    </div>
                </div>
            `
        }
    }
    console.log($items)
    if ($items.innerHTML == '') {
        $items.innerHTML = `
            <div class="item">
            <div class="item-content">
                <div class="game-name-price">
                    <h6>Void Cart</h6>
                </div>
            </div>
        `
    }

    $totalCart.innerHTML += `<h3><b>CART</b> TOTAL: ${cartSum.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>`

    return cartSum
}
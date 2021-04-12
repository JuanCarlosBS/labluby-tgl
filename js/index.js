

    'use strict';
    var games = []
    var activeGame ;
    var ajax = new XMLHttpRequest();
    ajax.open('GET', '/json/games.json');
    ajax.send();
    ajax.onreadystatechange = () => {
        if(ajax.status === 200 && ajax.readyState === 4) {
            var data = JSON.parse(ajax.responseText);
            data.types.map((item, index) => {
                games.push(item)
            })
        }
    }    
    
    var numbers = [];
    var id = 0;
    var cart = [];
    var activeGame ;
    var $lotofacil = document.getElementById('lotofacil');
    var $megaSena = document.getElementById('mega-sena');
    var $lotomania = document.getElementById('lotomania');
    var $number ;

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
        while (numbers.length < games[activeGame].maxNumber){
            var number = Math.floor(Math.random() * games[activeGame].range) + 1
            addNumber(number)
        }
    }

    function handleGames(gameindex) {
        const $descriptionGame  = document.querySelector('.description-game')
        const $numbers = document.querySelector('.numbers')
        clearLabel($numbers)
        clearLabel($descriptionGame)
        $descriptionGame.innerHTML = '<h4>Fill your bet</h4>'
        $descriptionGame.innerHTML += `<p>${games[gameindex].description}</p>`
        for(let i = 1; i <= games[gameindex].range; i++) {
            let label = i
            if( label < 10 ) 
                label = `0${label}`
            $numbers.innerHTML += `<button class="number" id="${i}" onclick="addNumber(${i})">${label}</button>`
        }
        $number = document.querySelectorAll('.number');
        activeGame = gameindex
        activeDivGame(activeGame)
        clearGame()
    }

    function activeDivGame(game) {
        let $filters = document.querySelector('.filters')
        clearLabel($filters)
        if (game === 0) {
            $filters.innerHTML += '<div class="checkbox" id="lotofacil"  style="color: #fff; background-color: #7f3992;"onclick="handleGames(0)">Lotofácil</div>'
            $filters.innerHTML += '<div class="checkbox" id ="mega-sena" style="color: #01AC66; background-color: #fff;" onclick="handleGames(1)">Mega-Sena</div>'
            $filters.innerHTML += '<div class="checkbox" id="lotomania" style="color:#F79C31; background-color: #fff"onclick="handleGames(2)">Lotomania</div>'
        } else if (game === 1) {
            $filters.innerHTML += '<div class="checkbox" id="lotofacil"  style="color: #7f3992; background-color: #fff;"onclick="handleGames(0)">Lotofácil</div>'
            $filters.innerHTML += '<div class="checkbox" id ="mega-sena" style="color: #fff; background-color: #01AC66;" onclick="handleGames(1)">Mega-Sena</div>'
            $filters.innerHTML += '<div class="checkbox" id="lotomania" style="color:#F79C31; background-color: #fff"onclick="handleGames(2)">Lotomania</div>'
        } else if (game === 2) {
            $filters.innerHTML += '<div class="checkbox" id="lotofacil"  style="color: #7f3992; background-color: #fff;"onclick="handleGames(0)">Lotofácil</div>'
            $filters.innerHTML += '<div class="checkbox" id ="mega-sena" style="color: #01AC66; background-color: #fff;" onclick="handleGames(1)">Mega-Sena</div>'
            $filters.innerHTML += '<div class="checkbox" id="lotomania" style="color:#fff; background-color: #F79C31;"onclick="handleGames(2)">Lotomania</div>'     
        }
    }
    function clearGame() {
        numbers = []
    }

    function clearLabel(param) {
        return param.innerHTML = ''
    }

    function handleCart(param, numberRemove) {
        var cartobject = {
            id: id,
            numbers: numbers,
            game: games[activeGame].type,
            disabled: false,
            color: games[activeGame].color,
            price: games[activeGame].price
        }
        if (param === 'addCart') {
            console.log(cartobject)
            cart.push(cartobject)
            id += 1
        } else {
            console.log(numberRemove)
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === numberRemove) {
                    cart[i].disabled = true;
                }
            }
        }

        var $items = document.querySelector('.items')
        console.log($items)
        clearLabel($items)
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].disabled === false) {
                $items.innerHTML += `                        
                <div class="item">
                    <img class="remove" "type="button" onclick="handleCart('removeCart', ${cart[i].id})" src="../../assets/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png"/>
                    <div class="bar" style='background-color:${cart[i].color};' 'border: 2px solid ${cart[i].color};'></div>
                    <div class="item-content">
                        <p>${cart[i].numbers}</p>
                        <div class="game-name-price">
                            <h5 style='color:${cart[i].color};'>${cart[i].game}</h5>
                            <h6>R$ ${cart[i].price}</h6>
                        </div>
                    </div>
                </div>`
            }
        }
    }
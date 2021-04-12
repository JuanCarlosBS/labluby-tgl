

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
    
    var numbers = []  
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
            var number = Math.floor(Math.random() * games[activeGame].maxNumber) + 1
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
        clearGame()
    }

    function clearGame() {
        numbers = []
    }

    function clearLabel(param) {
        return param.innerHTML = ''
    }


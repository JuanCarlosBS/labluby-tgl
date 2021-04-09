

    'use strict';
    var games = []
    var lotofacil
    var megaSena
    var lotomania
    var ajax = new XMLHttpRequest();
    ajax.open('GET', '/json/games.json');
    ajax.send();
    ajax.onreadystatechange = () => {
        if(ajax.status === 200 && ajax.readyState === 4) {
            var data = JSON.parse(ajax.responseText);

            lotofacil = data.types[0]
            megaSena = data.types[1]
            lotomania = data.types[2]    
            console.log(data.types.length)
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

    function addNumber() {
        console.log($number.value)
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] === $number.value)
                return
        }
        if (numbers.length < 6) {
            numbers.push($number.value)
            console.log(numbers)
        } else {
            numbers.shift()
            numbers.push($number.value)
            console.log(numbers)
        }
    }

    function completeGame() {
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
            $numbers.innerHTML += `<button class="number" id="${i}" value="${i}">${label}</button>`
        }
        $number = document.querySelectorAll('.number');
        console.log(games)
    }

    function clearLabel(param) {
        return param.innerHTML = ''
    }


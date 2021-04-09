(() => {

    'use strict';
    var lotofacil
    var megaSena
    var lotomania
    var ajax = new XMLHttpRequest();
    var $lotofacil = document.getElementById('lotofacil');
    var $megaSena = document.getElementById('mega-sena');
    var $lotomania = document.getElementById('lotomania');
    console.log($megaSena);
    $lotofacil.addEventListener('click', handleLotofacil, false);
    $megaSena.addEventListener('click', handleMegaSena, false);
    $lotomania.addEventListener('click', handleLotomania, false);

    
    ajax.open('GET', '/json/games.json');
    ajax.send();
    ajax.onreadystatechange = () => {
        if(ajax.status === 200) {
            var data = JSON.parse(ajax.responseText);

            lotofacil = data.types[0]
            megaSena = data.types[1]
            lotomania = data.types[2]    
        }
    }    

    function handleMegaSena() {
        const $numbers = document.querySelector('.numbers') 
        clearLabel($numbers)
        for(let i = 1; i <= megaSena.range; i++) {
            let label = i
            if( label < 10 ) 
                label = `0${label}`
            $numbers.innerHTML += `<button>${label}</button>`
        }
    }

    function handleLotofacil() {
        const $numbers = document.querySelector('.numbers') 
        clearLabel($numbers)
        for(let i = 1; i <= lotofacil.range; i++) {
            let label = i
            if( label < 10 ) 
                label = `0${label}`
            $numbers.innerHTML += `<button>${label}</button>`
        }
    }

    function handleLotomania() {
        const $numbers = document.querySelector('.numbers') 
        clearLabel($numbers)
        for(let i = 1; i <= lotomania.range; i++) {
            let label = i
            if( label < 10 ) 
                label = `0${label}`
            $numbers.innerHTML += `<button>${label}</button>`
        }
    }

    function clearLabel(param) {
        return param.innerHTML = ''
    }


})()
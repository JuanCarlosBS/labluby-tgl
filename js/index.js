(() => {

    'use strict';
    var lotofacil
    var megaSena
    var lotomania
    var ajax = new XMLHttpRequest();
    var $megaSena = document.getElementById('mega-sena');
    $megaSena.addEventListener('click', handleMegaSena, false);

    
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
        for(var i = 0; i <= megaSena.range; i++) {
            var $number = document.createElement('div');
            $number.textContent = i
            $number.value = i
            
        }
    }

    function handleLotofacil() {
        console.log(lotofacil)
    }

    function handleLotomania() {
        console.log(lotomania) 
    }

})()
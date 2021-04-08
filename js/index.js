(() => {
    'use strict';

    var $button = document.querySelector('.btnSubmit');

    $button.addEventListener('click', getGames ,false);

    function getGames() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/json/games.json');
        ajax.send();
        ajax.onreadystatechange = () => {
            if(ajax.status === 200) {
                var data = JSON.parse(ajax.responseText);
                for (var i = 0; i < data.types.length; i++) {
                        console.log(data.types[i])
                }
            }
        }
    }

})()
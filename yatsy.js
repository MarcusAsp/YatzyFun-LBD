'use strict';
document.addEventListener("DOMContentLoaded", function(e){
    //Till för att inte js ska köras innan html'en är färdigladdad.

    var nRoundDices;
    var savedDices;
    var diceCatalog;
    var savedDiceCatalog;
    var ones = 0;
    var twos = 0;
    var threes = 0;
    var fours = 0;
    var fives = 0;
    var sixes = 0;
    var nrOfRounds=1;
    var answerExist=false;

    var saveAndRollButton;
    var allIds;

    var playerNr = 1;
        
    function reset(newGame){
        let tarning1;
        let tarning2;
        let tarning3;
        let tarning4;
        let tarning5;

        saveAndRollButton = document.getElementById('saveAndRoll');
        allIds = ['spelare'+playerNr+'-one','spelare'+playerNr+'-two','spelare'+playerNr+'-three','spelare'+playerNr+'-four','spelare'+playerNr+'-five','spelare'+playerNr+'-six'];
    
        tarning1 = Math.floor(Math.random() * 6)+1;
        tarning2 = Math.floor(Math.random() * 6)+1;
        tarning3 = Math.floor(Math.random() * 6)+1;
        tarning4 = Math.floor(Math.random() * 6)+1;
        tarning5 = Math.floor(Math.random() * 6)+1;
        

        var diceValues = [];
        diceValues.push(tarning1,tarning2,tarning3,tarning4,tarning5);
        diceValues.sort();

        var dice1 = document.getElementById('dice1');
        var dice2 = document.getElementById('dice2');
        var dice3 = document.getElementById('dice3');
        var dice4 = document.getElementById('dice4');
        var dice5 = document.getElementById('dice5');

        var savedDice1 = document.getElementById('savedDice1');
        var savedDice2 = document.getElementById('savedDice2');
        var savedDice3 = document.getElementById('savedDice3');
        var savedDice4 = document.getElementById('savedDice4');
        var savedDice5 = document.getElementById('savedDice5');

        savedDice1.innerHTML = "";
        savedDice2.innerHTML = "";
        savedDice3.innerHTML = "";
        savedDice4.innerHTML = "";
        savedDice5.innerHTML = "";

        dice1.innerHTML = diceValues[0];
        dice2.innerHTML = diceValues[1];
        dice3.innerHTML = diceValues[2];
        dice4.innerHTML = diceValues[3];
        dice5.innerHTML = diceValues[4];

        savedDices = "";
        diceCatalog = "";
        savedDiceCatalog = "";

        savedDices = [savedDice1,savedDice2,savedDice3,savedDice4,savedDice5];
        diceCatalog = document.querySelectorAll('[data-man="inte-sparad"]');
        savedDiceCatalog = document.querySelectorAll('[data-man="sparad"]');
        

        for(let i=0;i <= diceCatalog.length;i++){
            if(diceCatalog[i]){
                diceCatalog[i].addEventListener("click", function(e){
                    for(let k=0; k <= savedDiceCatalog.length;k++){
                        if(!savedDiceCatalog[k].innerHTML){
                            savedDices[k].innerHTML = diceCatalog[i].innerHTML;
                            diceCatalog[i].innerHTML = "";
                            break;
                        }
                    }
                });
            }
        }

        for(let i=0;i <= savedDiceCatalog.length;i++){
            if(savedDiceCatalog[i]){
                savedDiceCatalog[i].addEventListener("click", function(e){
                    for(let k=0; k <= diceCatalog.length;k++){
                        if(!diceCatalog[k].innerHTML){
                            diceCatalog[k].innerHTML = savedDices[i].innerHTML;
                            savedDices[i].innerHTML = "";
                            break;
                        }
                    }
                });
            }
        }
        nRoundDices = [];

        savedDices;
        diceCatalog;
        savedDiceCatalog;
        ones = 0;
        twos = 0;
        threes = 0;
        fours = 0;
        fives = 0;
        sixes = 0;
        nrOfRounds=1;
        answerExist=false;

        if(!document.getElementById("buttonDiv").firstElementChild){
            let param = document.createElement("button");
            let noden = document.createTextNode("Spara och kasta igen!");
            param.appendChild(noden);
            let theElem = document.getElementById("buttonDiv");
            theElem.appendChild(param);
            theElem.firstElementChild.setAttribute('id','saveAndRoll');
            theElem.addEventListener('click', function(){
                for(let i=0; i < savedDiceCatalog.length; i++){
                    if(savedDiceCatalog[i].innerHTML){
                    nRoundDices.push(savedDiceCatalog[i].innerHTML);
                    }
                }
                saveNreRoll();
            });
        }

        if(newGame){
            if(playerNr >= 3){
                playerNr = 1;
                console.log("Återstållde turen. Alltså: "+playerNr);
            }else{
            playerNr++;
            console.log("Nästa spelares tur. Alltså: "+playerNr);
            }
            checkDices();
        }
    }
    reset();

    saveAndRollButton.addEventListener('click', function(){
        for(let i=0; i < savedDiceCatalog.length; i++){
            if(savedDiceCatalog[i].innerHTML){
            nRoundDices.push(savedDiceCatalog[i].innerHTML);
            }
        }
        saveNreRoll();
    });
    
    function saveNreRoll(){
        if(nrOfRounds >= 3){
            if(answerExist){
                alert("Gör dina val. Sedan är det nästa spelares tur!");
                nrOfRounds=1;
                if(saveAndRollButton){
                    saveAndRollButton = document.getElementById('saveAndRoll');
                    saveAndRollButton.remove();
                }
            } else{
                alert("Nästa spelares tur!");
                nrOfRounds=1;
                reset(true);
            }
            nRoundDices = [];
            ones = 0;
            twos = 0;
            threes = 0;
            fours = 0;
            fives = 0;
            sixes = 0;
            return;
        }
        let newDicesToRoll=0;
        for(let i=0;i < diceCatalog.length;i++){
            if(diceCatalog[i].innerHTML){
            newDicesToRoll++;
            diceCatalog[i].innerHTML = "";
            }
        }
        for(let i=0;i < newDicesToRoll; i++){
            diceCatalog[i].innerHTML = Math.floor(Math.random() * 6)+1;
        }
        
        for(let i=0;i < nRoundDices.length; i++){
            savedDiceCatalog[i].innerHTML = nRoundDices[i];
        }

        nRoundDices = [];
        checkNumbers();
    }

    

    function checkNumbers()
    {
        if(answerExist){
        allIds.forEach(i => {
            console.log("tar bort");
            console.log(document.getElementById(i).firstElement);
            if(document.getElementById(i).firstElement){
            document.getElementById(i).firstElement.remove();
            }
        });
        console.log("Klar!");
        }
        nrOfRounds++;
        console.log("Antal rundor: "+ nrOfRounds);
        checkDices();
    }

    checkDices();


    function checkDices(){

        ones = 0;
        twos = 0;
        threes = 0;
        fours = 0;
        fives = 0;
        sixes = 0;
        
        for(let i=0;i < diceCatalog.length;i++){
            if(diceCatalog[i].innerHTML)
            {
                if(diceCatalog[i].innerHTML == 1){
                    ones++;
                }
                else if(diceCatalog[i].innerHTML == 2){
                    twos++;
                }
                else if(diceCatalog[i].innerHTML == 3){
                    threes++;
                }
                else if(diceCatalog[i].innerHTML == 4){
                    fours++;
                }
                else if(diceCatalog[i].innerHTML == 5){
                    fives++;
                }
                else if(diceCatalog[i].innerHTML == 6){
                    sixes++;
                }


            }
        }
        
        for(let i=0;i < savedDiceCatalog.length;i++){

            if(savedDiceCatalog[i].innerHTML)
            {
                if(savedDiceCatalog[i].innerHTML == 1){
                    ones++;
                }
                else if(savedDiceCatalog[i].innerHTML == 2){
                    twos++;
                }
                else if(savedDiceCatalog[i].innerHTML == 3){
                    threes++;
                }
                else if(savedDiceCatalog[i].innerHTML == 4){
                    fours++;
                }
                else if(savedDiceCatalog[i].innerHTML == 5){
                    fives++;
                }
                else if(savedDiceCatalog[i].innerHTML == 6){
                    sixes++;
                }

            }
        }

        if(ones >= 3){
            if(ones >= 5){
                setpoints(('spelare'+playerNr+'-yatzy'), true);
                alert("YATZY!");
            }else{
            if(!(document.getElementById('spelare'+playerNr+'-one').contains(document.querySelector('p')) || document.getElementById('spelare'+playerNr+'-one').contains(document.querySelector('button')))){
                setpoints(('spelare'+playerNr+'-one'));
                alert("Du har ettor!");
            }else{
                return;
            }
        }
        }else if(twos >= 3){
            if(twos >= 5){
                setpoints(('spelare'+playerNr+'-yatzy'), true);
                alert("YATZY!");
            }else{
                if(!(document.getElementById('spelare'+playerNr+'-two').contains(document.querySelector('p')) || document.getElementById('spelare1'+playerNr+'-two').contains(document.querySelector('button')))){
                setpoints(('spelare'+playerNr+'-two'));
                alert("Du har tvåor!");
            }else{
                return;
            }
        }
        }else if(threes >= 3){
            if(threes >= 5){
                setpoints(('spelare'+playerNr+'-yatzy'), true);
                alert("YATZY!");
            }else{
                if(!(document.getElementById('spelare'+playerNr+'-three').contains(document.querySelector('p')) || document.getElementById('spelare'+playerNr+'-three').contains(document.querySelector('button')))){
            setpoints(('spelare'+playerNr+'-three'));
            alert("Du har treor!");
            }else{
                return;
            }
        }
        }else if(fours >= 3){
            if(fours >= 5){
                setpoints(('spelare'+playerNr+'-yatzy'), true);
                alert("YATZY!");
            }else{
                if(!(document.getElementById('spelare'+playerNr+'-four').contains(document.querySelector('p')) || document.getElementById('spelare'+playerNr+'-four').contains(document.querySelector('button')))){
            setpoints(('spelare'+playerNr+'-four'));
            alert("Du har fyror!");
            }else{
                return;
            }
        }
        }else if(fives >= 3){
            if(fives >= 5){
                setpoints(('spelare'+playerNr+'-yatzy'), true);
                alert("YATZY!");
            }else{
                if(!(document.getElementById('spelare'+playerNr+'-five').contains(document.querySelector('p')) || document.getElementById('spelare'+playerNr+'-five').contains(document.querySelector('button')))){
            setpoints(('spelare'+playerNr+'-five'));
            alert("Du har femmor!");
            }else{
                return;
            }
        }
        }else if(sixes >= 3){
            if(sixes >= 5){
                setpoints(('spelare'+playerNr+'-yatzy'), true);
                alert("YATZY!");
            }else{
                if(!(document.getElementById('spelare'+playerNr+'-six').contains(document.querySelector('p')) || document.getElementById('spelare'+playerNr+'-six').contains(document.querySelector('button')))){
            setpoints(('spelare'+playerNr+'-six'));
            alert("Du har sexor!");
            }else{
                return;
            }
        }
        }else{
            console.log("Tyvärr ingen som passar");
            ones = 0;
            twos = 0;
            threes = 0;
            fours = 0;
            fives = 0;
            sixes = 0;
            
        }
    }


    function setpoints(elementId, ifYatzy = false){
        if(ifYatzy){
            answerExist = true;
            let para1 = document.createElement("button");
            let node1 = document.createTextNode("50p");
            para1.appendChild(node1);
            let theElem = document.getElementById(elementId);
            theElem.appendChild(para1);
            theElem.firstChild.setAttribute('id','setScore');
            var newElem = document.getElementById('setScore');

            newElem.addEventListener('click', function(){
                newElem.remove();
                let para = document.createElement("p");
                let node = document.createTextNode("50p");
                para.appendChild(node);
                let theElem = document.getElementById(elementId);
                theElem.appendChild(para);
                reset(true);
            });

        }else{
            answerExist = true;
            let para = document.createElement("button");
            let node = document.createTextNode("10p");
            para.appendChild(node);
            let theElem = document.getElementById(elementId);
            theElem.appendChild(para);
            theElem.firstChild.setAttribute('id','setScore');
            var newElem = document.getElementById('setScore');

            newElem.addEventListener('click', function(){
                newElem.remove();
                let para = document.createElement("p");
                let node = document.createTextNode("10p");
                para.appendChild(node);
                let theElem = document.getElementById(elementId);
                theElem.appendChild(para);
                reset(true);
            });
        }

    }
    alert("Spelare1 börjar!");
});




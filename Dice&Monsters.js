

//Monster constructor
function Monster(id, race, weapon, rangeWeapon) {

    this.id = id;
    this.race = race;
    this.weapon = weapon;
    this.rangeWeapon = rangeWeapon

    var rollArray = abilityModifier()



    if (this.race === 'Goblin') {
        this.hp = d(6, 2);
        this.str = rollArray[0] -1;
        this.dex = rollArray[1] +2;
        this.con = rollArray[2];
        this.int = rollArray[3];
        this.wis = rollArray[4] -1;
        this.cha = rollArray[5] -1;
        this.ac = 13 + this.dex;
        this.speed = 30
        this.proficiencyBonus = 2
        
      } else if (this.race === 'Drow') {
        this.hp = d(8, 3);
        this.str = rollArray[0];
        this.dex = rollArray[1] + 2;
        this.con = rollArray[2];
        this.int = rollArray[3];
        this.wis = rollArray[4];
        this.cha = rollArray[5] + 1;
        this.ac = 13 + (this.dex >= 2 ? 2 : this.dex);
        this.speed = 30;
        this.proficiencyBonus = 2

      } else if (this.race === 'Bugbear'){
        this.hp = d(8, 5) + 5;
        this.str = rollArray[0] + 2;
        this.dex = rollArray[1] + 2;
        this.con = rollArray[2] + 1;
        this.int = rollArray[3] - 1;
        this.wis = rollArray[4];
        this.cha = rollArray[5] - 1;
        this.ac = 14 + (this.dex >= 2 ? 2 : this.dex);
        this.speed = 30;
        this.proficiencyBonus = 2
      };


    if (this.weapon.hasOwnProperty('finesse')){
        this.hit = this.dex + this.proficiencyBonus;
        } else{
            this.hit = this.str + this.proficiencyBonus;
      }  
    
    if (this.rangeWeapon.type === 'ranged') {
        this.rangedHit = this.dex + this.proficiencyBonus; 
    } 


    Monster.prototype.meleeeAttack = function() {
        var dmg = d(
            this.weapon.dmgDie) 
            + this.dex;

        document.querySelector('#hit').textContent = 'Rolled ' + (d(20) + this.hit) + ' to hit' 
        
        if (hit === 20 + this.hit) {
            document.querySelector('#dmg').textContent = 'Critical!!!'  + 'It caused ' + (dmg * 2 - this.dex) + ' ' + this.weapon.dmgType + ' damage!';

            } else if (hit === 1 + this.hit) {
                document.querySelector('#dmg').textContent = 'Critical Fail!';

            } else {
                document.querySelector('#dmg').textContent = 'And did ' + dmg + ' ' + this.weapon.dmgType + ' damage!';
        }    
    }

    Monster.prototype.rangeAttack = function() {
        var dmg = d(
            this.rangeWeapon.dmgDie) 
            + this.dex;

        document.querySelector('#hit').textContent = 'Rolled ' + (d(20) + this.rangedHit) + ' to hit' 
        
        if (hit === 20 + this.rangedHit) {
            document.querySelector('#dmg').textContent = 'Critical!!!'  + 'It caused ' + dmg + ' ' + this.rangeWeapon.dmgType + ' damage!';

        } else if (hit === 1 + this.rangedHit) {
            document.querySelector('#dmg').textContent = 'Critical Fail!';

        } else {
            document.querySelector('#dmg').textContent = 'And did ' + dmg + ' ' + this.rangeWeapon.dmgType + ' damage!';
        }
    }
}
//-----------------------------------------------------------------
//Våpen constructor
function Weapon(name, type, dmgDie, howMany, dmgType, properties) {
    this.name = name;
    this.type = type;
    this.dmgDie = dmgDie;
    this.howMany = howMany;
    this.dmgType = dmgType;
    this.properties = properties;
    
}
//Våpen
var scimitar = new Weapon (
    'Scimitar', 'melee', 6, 1,  'slashing', ['finesse', 'light']
);

var shortsword = new Weapon (
    'Shortsword', 'melee', 6, 1, 'piercing', ['finesse', 'light']
);

var shortbow = new Weapon (
'Shortbow', 'ranged', 6, 1, 'piercing', ['two-Handed', 'range']
);

var crossbow = new Weapon (
    'Crossbow', 'ranged', 8, 1, 'piercing', ['loading', 'two-handed', 'range']
);

var morningstar = new Weapon (
    'Morningstar', 'melee', 16, 1, 'piercing', ['loading', 'two-handed', 'range']
);

var javelin = new Weapon (
    'Javelin', 'ranged', 6, 1, 'piercing', ['thrown', 'range']
    );



var data = {
    allMonsters: []
}

//-----------------------------------------------------------------
// Event listeners med funksjon
document.querySelector('.btn-create').addEventListener('click', function() {
    var race = document.querySelector('#race').value;
    console.log(race);

//Create new ID
if (data.allMonsters.length > 0) {
    ID = data.allMonsters[data.allMonsters.length -1].id + 1
    } else {
        ID = 0;
    }

    
    var monster = new Monster(
        ID, race, scimitar, shortbow
    );

    data.allMonsters.push(monster);

    monsterGenerator(monster);
    console.log(monster)
    console.log(data);
});

//Attack knapper
/*
document.querySelector('.monsters').addEventListener('click', function(event){    
    var ID = event.target.parentNode.parentNode.parentNode.parentNode.id; 
    console.log(event.target);
    data.allMonsters[ID].meleeeAttack();
});
*/



document.querySelector('.monsters').addEventListener('click', function(event) {     
    var monsterID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    var set = event.target
    console.log(set);
    if (set === 'button.btn-melee') {
        console.log(data.allMonsters[monsterID].meleeeAttack());
    }else if (set == '<button class="btn-ranged">Ranged Attack</button>') {
        data.allMonsters[monsterID].rangeAttack();
    };

});


//Sletter monstere
document.querySelector('.monsters').addEventListener('click', function(event){
    var ID, set;
    
    set = event.target.parentNode.parentNode.parentNode.parentNode.id;
    ID = parseInt(set);

    //Delete item in data structure
        deleteItem(ID);

    //Delete item form UI
        deleteUIItem(set);
    //


});

//-----------------------------------------------------------------
//Funksjoner:

deleteItem = function(id) {
    var index, ids;

    ids = data.allMonsters.map(function(currentValue) {
        return currentValue.id
    });

    index = ids.indexOf(id)
    console.log(index)

    if (index !== -1) {
        data.allMonsters.splice(index, 1);
    }
};

deleteUIItem = function(selectorID){
    var el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);
}
//Ternings funksjonen
function d(dNr, nDices) {
    if (!nDices) {
      nDices = 1;
    }
  
    var dice = 0;
  
    for (var i = 0; i < nDices; i++) {
      dice += Math.floor(Math.random() * dNr + 1);
    }
  
    return dice;
  }


//Rulle terninger for å determinere ability modifier
var abilityModifier = function() {
    var roll = function() {
        var rolls, rollSum, rollsArray;

        rolls = [d(6), d(6), d(6), d(6)];

        if (rolls[0] < rolls[1] && rolls[2] && rolls[3]){
            rolls.splice(0, 1);
        } else if (rolls[1] < rolls[0] && rolls[2] && rolls[3]) {
            rolls.splice(1, 1);
        } else if (rolls[2] < rolls[0] && rolls[1] && rolls[3]) {
            rolls.splice(2, 1);
        } else if (rolls[3] < rolls[0] && rolls[1] && rolls[2]) {
            rolls.splice(3, 1);
        };

    rollSum = rolls.reduce(function(acc, val) { return acc + val; }, 0)
    return Math.floor((rollSum - 10)/ 2);
    };
    
    return [roll(), roll(), roll(), roll(), roll(), roll()];

};

// Lager monstere i html
function monsterGenerator(monster) {
    var html, newHtml;

    html = '<div class="item clearfix" id="%monster-0%"><div class="monster__description">%monster%</div><div class="right clearfix"><div class="monster__hp">HP: %10%</div><div class="item__ac">AC: %12%</div><div class="item__melee">Melee attack bonus to hit: %2%</div><div class="item__meleeDMG">Melee attack dmg dice: %3%</div><div class="item__range">Range attack to hit: %4%</div><div class="item__rangeDMG">Range attack dmg dice: %5%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div><div class="item__attack"><button class="btn-melee"></i>Melee Attack</button><button class="btn-ranged"></i>Ranged Attack</button><div class="hit" id="hit"></div><div class="dmg" id="dmg"></div></div></div></div>'

    //Replace paceholder text with some actual data
    newHtml = html.replace('%monster%', monster.race);
    newHtml = newHtml.replace('%10%', monster.hp);
    newHtml = newHtml.replace('%12%', monster.ac);
    newHtml = newHtml.replace('%2%', monster.hit);
    newHtml = newHtml.replace('%3%', monster.weapon.dmgDie);
    newHtml = newHtml.replace('%4%', monster.rangedHit);
    newHtml = newHtml.replace('%5%', monster.rangeWeapon.dmgDie);
    newHtml = newHtml.replace('%monster-0%', monster.id);

    

    
    //Insert HTMP to the DOM 
    document.querySelector('.monster__list').insertAdjacentHTML('beforeend', newHtml) 
    return newHtml;
}  


/*
Forsøk på å lage advantage
function d(dNr) {
    var dice = Math.floor(Math.random() * dNr + 1);
    var dice2 = Math.floor(Math.random() * dNr + 1);
    if (document.querySelector('.btn-adv').addEventListener('click',
        dice >= dice2 ? dice = dice : dice = dice2)) {
        return dice;
    } else {
        return dice;
    }
}


Gamle angrepsknapper

document.querySelector('.btn-bugbear').addEventListener('click', function() {
    bugbear.meleeeAttack();
});

document.querySelector('.btn-bugbearRanged').addEventListener('click', function() {
    bugbear.rangeAttack();
});

gamle abilitymodifyer rull

var abilityModifier = function() {
    var roll = function() {
        return Math.floor((d(6, 3) - 10)/ 2);
    };

    return [roll(), roll(), roll(), roll(), roll(), roll()];
};

//GAmle monster creatorere
document.querySelector('.btn-goblin').addEventListener('click', function() {
    var newMonster, ID;
            
    //Create new ID
    if (data.allMonsters.length > 0) {
    ID = data.allMonsters[data.allMonsters.length -1].id + 1
    } else {
        ID = 0;
    }
    
    var newMonster = new Monster(
        ID, 'Goblin', scimitar, shortbow
    );
    console.log(newMonster);

    data.allMonsters.push(newMonster);

    monsterGenerator(newMonster);
});

document.querySelector('.btn-drow').addEventListener('click', function() {
    var newMonster, ID;
            
    //Create new ID
    if (data.allMonsters.length > 0) {
    ID = data.allMonsters[data.allMonsters.length -1].id + 1
    } else {
        ID = 0;
    }
    
    var newMonster = new Monster(
        ID, 'Drow', scimitar, shortbow
    );
    console.log(newMonster);

    data.allMonsters.push(newMonster);

    monsterGenerator(newMonster);
});

document.querySelector('.btn-bugbear').addEventListener('click', function() {
    var newMonster, ID;
            
    //Create new ID
    if (data.allMonsters.length > 0) {
    ID = data.allMonsters[data.allMonsters.length -1].id + 1
    } else {
        ID = 0;
    }
    
    var newMonster = new Monster(
        ID, 'Bugbear', scimitar, shortbow
    );
    console.log(newMonster);

    data.allMonsters.push(newMonster);

    monsterGenerator(newMonster);
});
*/

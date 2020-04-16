

//Monster constructor
function Monster(race, weapon, rangeWeapon) {

    this.race = race;
    this.weapon = weapon;
    this.rangeWeapon = rangeWeapon



    if (this.race === 'Goblin') {
        this.hp = d(6, 2);
        this.str = abilityModifier()[0] -1;
        this.dex = abilityModifier()[1] +2;
        this.con = abilityModifier()[2];
        this.int = abilityModifier()[3];
        this.wis = abilityModifier()[4] -1;
        this.cha = abilityModifier()[5] -1;
        this.ac = 13 + this.dex;
        this.speed = 30
        this.proficiencyBonus = 2
        
      } else if (this.race === 'Drow') {
        this.hp = d(8, 3);
        this.str = abilityModifier()[0];
        this.dex = abilityModifier()[1] +2;
        this.con = abilityModifier()[2];
        this.int = abilityModifier()[3];
        this.wis = abilityModifier()[4];
        this.cha = abilityModifier()[5] +1;
        this.ac = 13 + (this.dex >= 2 ? 2 : this.dex);
        this.speed = 30;
        this.proficiencyBonus = 2

      } else if (this.race === 'Bugbear'){
        this.hp = d(8, 5) + 5;
        this.str = abilityModifier()[0] +2;
        this.dex = abilityModifier()[1] +2;
        this.con = abilityModifier()[2] +1;
        this.int = abilityModifier()[3] -1;
        this.wis = abilityModifier()[4];
        this.cha = abilityModifier()[5] -1;
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





//-----------------------------------------------------------------
// Knapper som lager monstere med monster constructor, og displayer de med monstorGenerator

document.querySelector('.btn-goblin').addEventListener('click', function() {
    var goblin = new Monster(
        'Goblin', scimitar, shortbow
    );
    monsterGenerator(goblin);
});

document.querySelector('.btn-drow').addEventListener('click', function() {
    var drow = new Monster(
        'Drow', shortsword, crossbow
    );
    monsterGenerator(drow);
});

document.querySelector('.btn-bugbear').addEventListener('click', function() {
    var bugbear = new Monster(
        'Bugbear', morningstar, javelin
    );
    monsterGenerator(bugbear);
});




//-----------------------------------------------------------------
//Funksjoner:

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
        return Math.floor((d(6, 3) - 10)/ 2);
    };

    return [roll(), roll(), roll(), roll(), roll(), roll()];
};

// Lager monstere i html
function monsterGenerator(monster) {
    var html, newHtml;

    html = '<div class="item clearfix" id="monster-0"><div class="monster__description">%monster%</div><div class="right clearfix"><div class="monster__hp">HP: %10%</div><div class="item__ac">AC: %12%</div><div class="item__melee">Melee attack bonus to hit: %2%</div><div class="item__meleeDMG">Melee attack dmg dice: %3%</div><div class="item__range">Range attack to hit: %4%</div><div class="item__rangeDMG">Range attack dmg dice: %5%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

    //Replace paceholder text with some actual data
    newHtml = html.replace('%monster%', monster.race);
    newHtml = newHtml.replace('%10%', monster.hp);
    newHtml = newHtml.replace('%12%', monster.ac);
    newHtml = newHtml.replace('%2%', monster.hit);
    newHtml = newHtml.replace('%3%', monster.weapon.dmgDie);
    newHtml = newHtml.replace('%4%', monster.rangedHit);
    newHtml = newHtml.replace('%5%', monster.rangeWeapon.dmgDie);

    
    //Insert HTMP to the DOM 
    document.querySelector('.monster__list').insertAdjacentHTML('beforeend', newHtml) 
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
*/

                    /*** The Monster object and properties ***/

var Monster = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.width = 50;                          /** width and height are used here for collisions **/
    this.height = 60;
    this.sprite = 'images/enemy-bug.png';
}

Monster.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    if (this.x > 600) {                                 /** function that sets the linear speed of the rendered sprite **/
        this.x = 600;                              /** the conditionnal statement prevents the sprite from going off canvas **/
        this.speed = 0;
    };
};

    
Monster.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);           /** function that draws the sprite on screen **/
    this.checkCollisions2();                                                /** and call the collision function **/ 
};

Monster.prototype.reset3 = function(){
    this.x = 0;
    this.y = -20;                                        /** Reset the monster if it collides with **/
    this.sprite = 'images/enemy-bug.png';                 /** the player or the princess objects **/
    this.speed = 30;
};

Monster.prototype.reset4 = function(){                      /** Change the monster position of the monster **/
    var _this = this;
    this.x = 0;                                              /** if it collides with the lure object **/
    this.y = 410;                                            
    this.speed = 65;
    setTimeout(function(){
        _this.speed = 30;
        _this.sprite = 'images/enemy-angry2.png';
        setTimeout(function(){
            _this.speed = 10;
            _this.sprite = 'images/enemy-angry3.png';
            setTimeout(function(){
                _this.speed = 0;
                _this.sprite = 'images/skeleton2.png';
                _this.width = 0;
                _this.height = 0;
            },2000)
        },2500)
    },4000)
   
    
};

Monster.prototype.checkCollisions2 = function(){   /* MDN's Axis-Aligned Bounding Box algorythm */
    if(player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y){
        player.sprite = 'images/skeleton.png';
        setTimeout(function(){
            player.reset();
           
        },2000);
        if(player.sprite = 'images/char-boy-hero.png'){                                /** Collision function **/
            player.sprite = 'images/skeleton.png';                     /** if the monster object collides with an other object **/
            player.reset();                                          /** mentionned in the conditionnals, then changes occure : **/
            player.reset2();                                  /** updates of positions, images,... depending on the collided object**/
            princess.y = -20;
            lure.y = -500;
            this.reset3();
        };
    }
    else if(princess.x < this.x + this.width &&
        princess.x + princess.width > this.x &&
        princess.y < this.y + this.height &&
        princess.height + princess.y > this.y){
        var _this = this;
        princess.sprite = 'images/skeleton.png';
        this.sprite = 'images/enemy-bug-win.png';
        setTimeout(function(){
           player.reset();
           player.reset2();
           _this.reset3();
        },2000);
    }
    else if(lure.x < this.x + this.width &&
        lure.x + lure.width > this.x &&
        lure.y < this.y + this.height &&
        lure.height + lure.y > this.y){
        var _this = this;
        this.sprite = 'images/enemy-bug-angry.png';
        setTimeout(function(){
           _this.reset4(); 
        },2000);
    }
};

var monster = new Monster(0,-20);

                    /** Enemy super-constructor function **/

var Enemy = function(x, y, speed, width, height) {
    this.x = x;
    this.y = y;
    this.speed = randomInt(150, 300);
    this.width = 50;
    this.height = 60;
    this.sprite = 'images/rock0.png';
};

                                                                        /** Update the enemy's position **/
Enemy.prototype.update = function(dt) {                            /** and prevent the sprite to go off canvas **/
    this.x = this.x + (this.speed * dt);                    /** each time the sprite is reset, its speed is randomly set**/
    if( this.x > 610) {
        this.x = 0;
        this.speed = randomInt(100, 200);
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);        /** draws the sprite on screen and call the collision function  **/ 
    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function(){   /* MDN's Axis-Aligned Bounding Box algorythm*/
    if(player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y){                              /** collision function **/
        player.sprite = 'images/skeleton.png';              /** each time the enemy sprite collides with the player **/
                                                                      /** all instances are reset**/
        setTimeout(function(){
            player.reset();
            monster.reset3();
            player.reset2();
        },1500);
    }
};

var allEnemies = [];
var enemyOne = new Enemy(0,300);
var enemyTwo = new Enemy(0,230);
enemyTwo.sprite = 'images/rock1.png';
var enemyThree = new Enemy(0,150);
enemyThree.sprite = 'images/rock2.png';
var enemyFour = new Enemy(0,70);
enemyFour.sprite = 'images/rock3.png';
allEnemies.push(enemyOne, enemyTwo, enemyThree, enemyFour);

                    /** Player super constructor function **/

var Player = function(x ,y){
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 56;
    this.sprite = 'images/char-boy.png';
}


Player.prototype.update = function(dt){
    
    player.offCanvas(); /* player can't go off canvas */
    player.drown();     /* player can't cross the river */                                     
    player.getTheSurf();  /* player can interact with the surf object */
    player.saveThePrincess();  /* update player when he reaches the princess */
    player.onShore();  /* updates the player once on shore */
    player.safe(); /* updates the player when he reaches bacj the camp */ 
    
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keys){
    console.log("Hero coordinates (x:" + this.x + "; y:" + this.y +")");
    switch(keys){
        case 'left' : 
            this.x -= 30;
            break;
        case 'right' :
            this.x += 30;              /** everytime a keybord arrow key is hit **/ 
            break;                             /** the player can move **/
        case 'up' :
            this.y -= 30;
            break;
        case 'down' :
            this.y += 30;
    }
}

Player.prototype.reset = function(){
    this.x = 0;
    this.y = 440;
    this.sprite = 'images/char-boy.png';        /** resets the player position and updates its image **/
    surf.x = 450;                                     /** resets surf and lure positions **/
    surf.y = 420;
    surf.width = 50;
    surf.height = 56;
    lure.y = -500;
}

Player.prototype.reset2 = function(){
    princess.x = 600;
    princess.y = -20;
    lure.y = -500;
}



       /* avoid the sprite to go off canva */
Player.prototype.offCanvas = function(){
    if(this.x < 0){
        this.x = 0;
    }
    else if(this.x > 610){
        this.x = 600;
    }
    else if(this.y < -20){
        this.y = -20;
    }
    else if(this.y > 460){
        this.y = 440;
    }        
}

Player.prototype.saveThePrincess = function(){
    if((this.x === 600 || this.x === 605) && (this.y === -20 || this.y === -10)){
        var __this = this;
        this.sprite = 'images/char-boy-hero.png';
        setTimeout(function(){
            __this.sprite = 'images/heroes.png'
        },800)
        princess.y = -500;                                         /** when the player reaches the princess **/
        setTimeout(function(){                                      /** the sprite image changes two times **/                            
            lure.y = -20;                                            /** and the monster speed is increased**/
        },7500);
        monster.speed = 60;
    }
}

Player.prototype.getTheSurf = function(){
    if ((this.x === 420 || this.x === 450) && (this.y === 410 || this.y === 380) && this.sprite !== 'images/char-boy-hero.png'){
        this.sprite = 'images/char-boy-surfing.png'; 
        surf.y = -500;                                              /** when the player reaches the surf its sprite is updated **/
        surf.width = 0;                                          /** width and height of the surf are set to 0 to avoid collision **/
        surf.height = 0;                                                /** once the player's sprite's image is updated**/                                           
    }
}

Player.prototype.drown = function(){
    if (this.y === 350 && this.sprite === 'images/char-boy.png'){
        var __this = this;
        setTimeout(function(){
            __this.sprite = 'images/char-drown3.png';                    /** when the player reaches a certain position, the sprite's image is updated **/
        },500);                                                                   /** and afeter a certain time the player is reset **/
        setTimeout(function(){                                                
           __this.reset();
        },1500);
    }
}

Player.prototype.onShore = function(){
    if(this.y === 380 && this.sprite === 'images/heroes.png') {              /** this updates the player's sprite's image when he gets back to the shore **/
        this.sprite = 'images/char-boy-hero.png';
        sign.sprite = 'images/sign2.png';
    }
}

Player.prototype.safe = function(){
    if((this.x === 0 || this.x === 60) && (this.sprite === 'images/char-boy-hero.png')){
        this.x = 0;
        this.y = 440;                                                 
        this.sprite = 'images/char-boy2.png';                                    /** updates the player and princess positions when **/
        princess.x = 30;                                                                  /** the player reaches the camp. **/
        princess.y = 440;                                                    /** calls the messagePlayer4() method of the Objects constructor**/
        message4.messagePlayer4();
    }
}

var player = new Player(0, 440);

                    /*constructor function for the princess object */

var Queen = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 56;
}

Queen.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var princess = new Queen(600, -20);
princess.sprite = 'images/char-princess-girl.png';

                    /* The Objects super constructor */

var Objects = function(x, y){
    this.x = x;
    this.y = y;
}


Objects.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Objects.prototype.update = function(){
    message1.messagePlayer();
    message2.messagePlayer2();
    message1.bubbleReset();                                 /** calls the methods below **/
    message2.bubbleReset();
    message3.messagePlayer3();
    message3.bubbleReset2();
    
};

Objects.prototype.messagePlayer = function(){
    var ___this = this;
    setTimeout(function(){
        ___this.x = player.x + 10;                        /** displays the message1's sprite in function of the player's position **/
        ___this.y = player.y - 40;                              /** and updates the message1's sprite after a certain time **/ 
    },2000);                                               
    setTimeout(function(){
        ___this.sprite = 'images/bubble2.png';
    },6000);
}

Objects.prototype.messagePlayer2 = function(){
    var ___this = this;
    setTimeout(function(){
        ___this.x = player.x + 10;                         // see the messagePlayer() method above
        ___this.y = player.y - 40;
    },9500)
}

Objects.prototype.messagePlayer3 = function(){
    if((player.y > 380 && player.x > 450) && (player.sprite === 'images/heroes.png' || player.sprite === 'images/char-boy-hero.png')){
        this.x = player.x + 40;
        this.y = player.y - 40;
        var ___this = this;                                                /** diplays the message3's sprite on the screen  **/
        setTimeout(function(){                                                      /** only if the player is at a certain position **/
            ___this.sprite = 'images/bubble4bis.png';                    /** and if its sprite's image corresponds to what required **/
        },10000)
    }
}

Objects.prototype.messagePlayer4 = function(){
    var ___this = this;
    this.x = princess.x + 30;                            // see the messagePlayer() method above
    this.y = princess.y - 40;
    setTimeout(function(){
        ___this.sprite = 'images/bubble6.png';
    },3000)
}

Objects.prototype.bubbleReset = function(){
    if(player.x > 200 || player.sprite !== 'images/char-boy.png'){              /** sets the message2 and message1 off canvas (to hide it) **/
        this.x = -500;                                                              /** if the player is at a certain position  **/
                                                                              /** or if its sprite's image is different to what mentionned**/
    }
}

Objects.prototype.bubbleReset2 = function(){
    if(player.x < 450 && player.sprite === 'images/char-boy-hero.png'){          // see the bubbleReset above
        this.x = -500;
    }
}

var lure = new Objects(600,-500);
lure.sprite = 'images/lure.png';
lure.width = 50;
lure.height = 56;
var surf = new Objects(450, 420);
surf.sprite = 'images/wood2.png';
var tree1 = new Objects(180, 350);
tree1.sprite = 'images/tree1.png';
var tree2 = new Objects(320,420);
tree2.sprite = 'images/tree2.png';
var tree3 = new Objects(560, 380);
tree3.sprite = 'images/tree1.png';
var fire = new Objects(70, 440);
fire.sprite = 'images/fireplace.png';
var sign = new Objects(400,370);
sign.sprite = 'images/sign1.png';
var message1 = new Objects(-500,390);
message1.sprite = 'images/bubble1.png';
var message2 = new Objects(-500,390);
message2.sprite = 'images/bubble3.png';
var message3 = new Objects(-500,390);
message3.sprite = 'images/bubble4.png';
var message4 = new Objects(-500, 390);
message4.sprite = 'images/bubble5.png';




                                                                /** listens for key presses and sends the keys to the **/
                                                                          /** Player.handleInput() method.**/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;            // sets a random number in a range of selected numbers.
}                                                                        // used to set a random speed for the enemies


document.onmousemove = function(e){
var x = e.pageX;
var y = e.pageY;                                                     //only used to display the coordiantes of the player on the console
e.target.title = "X is "+ x +" and Y is "+ y;
};


    
    
      


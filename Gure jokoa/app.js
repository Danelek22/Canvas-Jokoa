function CanvasHasieratu(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgroundImage = new Image();
    var naveImage   = new Image(); // ontzia
    var enemiespic1  = new Image(); // etsai taldea1
    var enemiespic2 = new Image(); // etsai taldea2
	
    // fondoaren argazkia eta ontziarena
    backgroundImage.src = "images/background-pic.jpg"; //fondoa
    naveImage.src       = "images/NAVE.gif"; //ontzia
    // etsaiak
    enemiespic1.src     = "images/alien.gif";
    enemiespic2.src     = "images/prollectilnave.gif";
    
    // altuera eta zabalera (canvas)
    var cW = ctx.canvas.width; // 700px 
    var cH = ctx.canvas.height;// 600px

    // etsaien irudikatzea
    var etsaiarenTxantiloia = function(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemiespic1
        }
    }




	//Etsaiak agertzeko

    var enemies = [
                   new etsaiarenTxantiloia({id: "etsaia1", x: 100, y: -20, w: 50, h: 30 }),
                   new etsaiarenTxantiloia({id: "etsaia2", x: 225, y: -20, w: 50, h: 30 }),
                   new etsaiarenTxantiloia({id: "etsaia3", x: 350, y: -20, w: 80, h: 30 }),
                   new etsaiarenTxantiloia({id: "etsaia4", x:100,  y:-70,  w:80,  h: 30}),
                   new etsaiarenTxantiloia({id: "etsaia5", x:225,  y:-70,  w:50,  h: 30}),
                   new etsaiarenTxantiloia({id: "etsaia6", x:350,  y:-70,  w:50,  h: 30}),
                   new etsaiarenTxantiloia({id: "etsaia7", x:475,  y:-70,  w:50,  h: 30}),
                   new etsaiarenTxantiloia({id: "etsaia8", x:600,  y:-70,  w:80,  h: 30}),
                   new etsaiarenTxantiloia({id: "etsaia9", x:475,  y:-20,  w:50,  h: 30}),
                   new etsaiarenTxantiloia({id: "etsaia10",x: 600, y: -20, w: 50, h: 30}),

                   // bigarren taldea
                   new etsaiarenTxantiloia({ id: "etsaia11", x: 100, y: -220, w: 50, h: 30, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia12", x: 225, y: -220, w: 50, h: 30, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia13", x: 350, y: -220, w: 80, h: 50, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia14", x: 100, y: -270, w: 80, h: 50, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia15", x: 225, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia16", x: 350, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia17", x: 475, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia18", x: 600, y: -270, w: 80, h: 50, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia19", x: 475, y: -200, w: 50, h: 30, image: enemiespic2 }),
                   new etsaiarenTxantiloia({ id: "etsaia20", x: 600, y: -200, w: 50, h: 30, image: enemiespic2 })
                  ];


	// honek etsaiak renderizatzea baliatzen du etsai bakoitzarako funtzio bat sortu gabe, gainera etsaiak ontzia ukitu duen begiratzen du
    var renderEnemies = function (enemyList) {
        for (var i = 0; i < enemyList.length; i++) {
            console.log(enemyList[i]);
            ctx.drawImage(enemyList[i].image, enemyList[i].x, enemyList[i].y += .5, enemyList[i].w, enemyList[i].h);
            // etsaiak beheko nibela ukitu duten detektatu
            launcher.hitDetectLowerLevel(enemyList[i]);
        }
    }
	
	
	
	
	
	
	
	
	

    function Launcher(){
        // balaren posizioa
        this.y = 500, 
        this.x = cW*.5-25, 
        this.w = 100, 
        this.h = 100,   
        this.direccion, 
        this.bg="white", // balaren kolorea
        this.misiles = [];


         this.gameStatus = {
            over: false, 
            message: "",
            fillStyle: 'red',
            font: 'italic bold 36px Arial, sans-serif',
        }

        this.render = function () {
            if(this.direccion === 'left'){
                this.x-=5;
            } else if(this.direccion === 'right'){
                this.x+=5;   
            }
            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 10, 10); // atzeko argazkia
            ctx.drawImage(naveImage,this.x,this.y, 100, 90); // balak ontziaren leku berdinetik ateratzeko

            for(var i=0; i < this.misiles.length; i++){
                var m = this.misiles[i];
                ctx.fillRect(m.x, m.y-=5, m.w, m.h); // balaren norabidea
                this.hitDetect(this.misiles[i],i);
                if(m.y <= 0){ // bala bat hemendik pasatzean borratzeko
                    this.misiles.splice(i,1); // bala borratu
                }
            }
            // Irabazterakoan
            if (enemies.length === 0) {
                clearInterval(animateInterval); // Gelditu loop-a
                ctx.fillStyle = 'yellow';
                ctx.font = this.gameStatus.font;
                ctx.fillText('Zorionak!', cW * .5 - 80, 50);
				alert("Eman P teklari berriro jolasteko");
            }
        }
        // balak jo duen begiratu (hitbox)
	    var kont = 0;
        this.hitDetect = function (m, mi) {
            console.log('crush');
            for (var i = 0; i < enemies.length; i++) {
                var e = enemies[i];
                if(m.x+m.w >= e.x && 
                   m.x <= e.x+e.w && 
                   m.y >= e.y && 
                   m.y <= e.y+e.h){
			kont +=10;
                    this.misiles.splice(this.misiles[mi],1); // bala borratu
                    enemies.splice(i, 1); // etsaia borratu
                }
            }
		   var score = kont;
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: ",score, 8, 20);
}
        }
	 
	    
	    
	    
	    
        // Etsaiak behera ailegatu edo ontzia ukitu duen begiratu
        this.hitDetectLowerLevel = function(enemy){
			// Etsaien posizioa 550 baino gehiago bada bako limitearekin tope egin du
            if(enemy.y > 550){
                this.gameStatus.over = true;
                this.gameStatus.message = 'Etsaiak pasa dira!';
				alert("Eman P teklari berriro jolasteko");
            }

          
			// a) Etsaiaren y hau baino handiagoa bada.y - 25 => kolisioa
            // b) Etsaiaren x hau baino txikiagoa bada.x + 45 && etsaia x > hau.x - 45 orduan kolisioa egon dela dakigu
            if ((enemy.y < this.y + 25 && enemy.y > this.y - 25) &&
                (enemy.x < this.x + 45 && enemy.x > this.x - 45)) { // begiratu etsaia ezkerretara edo eskubitara dagoen
                    this.gameStatus.over = true;
                    this.gameStatus.message = 'Hil zara'
					alert("Eman P teklari berriro jolasteko");
                }

            if(this.gameStatus.over === true){  
                clearInterval(animateInterval); // gelditu jokoa
                ctx.fillStyle = this.gameStatus.fillStyle; // textuari kolorea aldatu
                ctx.font = this.gameStatus.font;
                // canvasean textua erakusteko
                ctx.fillText(this.gameStatus.message, cW * .5 - 80, 50); // text x , y
            }
        }
    }
    
    var launcher = new Launcher();
    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }
    var animateInterval = setInterval(animate, 6);
	
	
	
	
	// Mugimendua
    
    var left_btn  = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var fire_btn  = document.getElementById('fire_btn'); 

   document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) // ezkerrera mugitu
        {
         launcher.direccion = 'left';  
            if(launcher.x < cW*.2-130){
                launcher.x+=0;
                launcher.direccion = '';
            }
       }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37) // ezkerrera mugiu
        {
         launcher.x+=0;
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39) // eskuinera mugitu
        {
         launcher.direccion = 'right';
         if(launcher.x > cW-110){
            launcher.x-=0;
            launcher.direccion = '';
         }
        
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39) // eskuinera mugitu
        {
         launcher.x-=0;   
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 80) // jokoa berriro hasi
         {
          location.reload();
         }
    });



    // space klikatzerakoan su egin
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
           launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3,h: 10});
        }
    });
}

window.addEventListener('load', function(event) {
    CanvasHasieratu();
});

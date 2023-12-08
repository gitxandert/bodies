let planet5=[];

let sliders=[];

let stars=[];

let focused_on=false;

let return_x;
let return_y;

let moonButton;
let marsButton;

let i1_op=0;
let i2_op=0;
let corner_op_1=0;
let corner_op_2=0;
let corner_inc=1;
let page_op=0;
let about_op=0;

let dragged=false;
let double_clicked=false;
let returned=false;
let corner_clicked=false;

function setup() {
  createCanvas(displayWidth, displayHeight);
  textAlign(CENTER);
  textFont('Manrope');
  for(let i=0; i<11; i++){
    if(i==0){
      planet5[i]=new planet(255, 255, 0, displayWidth/22, displayHeight+500, displayWidth/22, 's u n', '#EB4A19');
      planet5[i].initialize();
    }
    if(i==1){
      planet5[i]=new planet(169, 169, 169, displayWidth*3/22, displayHeight+500, displayWidth/38, 'm e r c u r y', '#595B42');
      planet5[i].initialize();
    }
    if(i==2){
      planet5[i]=new planet(242, 217, 136, displayWidth*5/22, displayHeight+500, displayWidth/34, 'v e n u s', '#EC1ED7');
      planet5[i].initialize();
    }
    if(i==3){
      planet5[i]=new planet(0, 0, 255, displayWidth*7/22, displayHeight+500, displayWidth/32, 'e a r t h', '#00CC00');
      planet5[i].initialize();
    }
    if(i==4){
      planet5[i]=new planet(242, 246, 249, displayWidth*9/22, displayHeight+500, displayWidth/40, 'm o o n', '#A2BFE5');
      planet5[i].initialize();
    }
    if(i==5){
      planet5[i]=new planet(230, 110, 60, displayWidth/2, displayHeight+500, displayWidth/36, 'm a r s', '#914040');
      planet5[i].initialize();
    }
    if(i==6){
      planet5[i]=new planet(250, 210, 140, displayWidth*13/22, displayHeight+500, displayWidth/24, 'j u p i t e r', '#815A86');
      planet5[i].initialize();
    }
    if(i==7){
      planet5[i]=new planet(230, 230, 150, displayWidth*15/22, displayHeight+500, displayWidth/26, 's a t u r n', '#948E5A');
      planet5[i].initialize();
    }
    if(i==8){
      planet5[i]=new planet(214, 252, 252, displayWidth*17/22, displayHeight+500, displayWidth/28, 'u r a n u s', '#5B8BA4');
      planet5[i].initialize();
    }
    if(i==9){
      planet5[i]=new planet(155, 235, 240, displayWidth*19/22, displayHeight+500, displayWidth/30, 'n e p t u n e', '#549A90');
      planet5[i].initialize();
    }
    if(i==10){
      planet5[i]=new planet(246, 240, 212, displayWidth*21/22, displayHeight+500, displayWidth/42, 'p l u t o', 0);
      planet5[i].initialize();
    }
  }
  marsButton = new Button('#974646', 'c h a n g e', 'c h a n g e', 230, 110, 60);
  moonButton = new Button('#A9C7EF', 'r a n d o m  d e l a y', 's e t  d e l a y', 242, 246, 249);
  for(let i=0; i<100; i++){
    stars[i] = new Star(random(displayWidth), random(displayHeight), random(2, 6), random(.01, .05), random(.01, .05));
  }
}

function draw() {
  noStroke();
  displayWidth=displayWidth;
  displayHeight=displayHeight;
  background(0);
  if(drawPlanets){
    if(planet5[3].arrived){
      for(let i=0; i<100; i++){
        stars[i].shine();
      }
    }
    for(let i=0; i<11; i++){
      if(i==0){
        if(sun_visible){
          planet5[i].chooseFunction(sun_alt.value);
        }
      }
      if(i==1){
        if(mercury_visible){
          planet5[i].chooseFunction(mercury_alt.value);
        }
      }
      if(i==2){
        if(venus_visible){
          planet5[i].chooseFunction(venus_alt.value);
        }
      }
      if(i==3){
        if(earth_visible){
          planet5[i].chooseFunction(earth_gain.value*90);
        }
      }
      if(i==4){
        if(moon_visible){
          planet5[i].chooseFunction(moon_alt.value);
        }
      }
      if(i==5){
        if(mars_visible){
          planet5[i].chooseFunction(mars_alt.value);
        }
      }
      if(i==6){
        if(jupiter_visible){
          planet5[i].chooseFunction(jupiter_alt.value);
        }
      }
      if(i==7){
        if(saturn_visible){
          planet5[i].chooseFunction(saturn_alt.value);
        }
      }
      if(i==8){
        if(uranus_visible){
          planet5[i].chooseFunction(uranus_alt.value);
        }
      }
      if(i==9){
        if(neptune_visible){
          planet5[i].chooseFunction(neptune_alt.value);
        }
      }
      if(i==10){
        if(pluto_visible){
          planet5[i].chooseFunction(pluto_alt.value);
        }
      }
    }
  }
  if(planet5[3].arrived){
    if(!returned){
      chooseInstructions();
    }else{
      about_text();
    }
    console.log(corner_clicked);
  }
}

class planet{
  constructor(r, g, b, x, y, w, name, sp_f){
    this.r=r;
    this.g=g;
    this.b=b;

    this.text_op=0;
    
    this.x=x;
    this.y=y;
    this.w=w;

    this.origin_x=x;
    this.origin_y=y;
    this.origin_w=w;
    
    this.name=name;

    this.sp_f=sp_f;

    this.arrived=false;

    this.pressed=false;

    this.double=0;

    this.focused=false;

    this.withdrawn=false;

    this.returning=false;
  }
  
  initialize(){
    noStroke();
    fill(this.r,this.g,this.b);
    ellipse(this.x, this.y, this.w, this.w);
  }

  chooseFunction(altitude){
    if(!this.returning){
      if(!this.focused){
        if(!this.withdrawn){
          if(!this.arrived){
            this.visible(altitude);
          }else{
            this.hover();
          }
        }else{
          this.withdraw();
        }
      }else{
        this.focus();
      }
    }else{
      this.return();
    }
  }
  
  visible(altitude){
    let destination=normalize(altitude, 0, 90, displayHeight, 0);
    this.y=lerp(this.y, destination, 0.03);
    fill(this.r,this.g,this.b);
    ellipse(this.x, this.y, this.w, this.w);
    if(this.y<destination+0.1){
      this.arrived=true;
    }
    this.origin_w=this.w;
    this.origin_x=this.x;
    this.origin_y=this.y;
  }

  hover(){
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.w, this.w);
    fill(255, this.text_op);
    textSize(20);
    textAlign(CENTER);
    text(this.name, this.x, this.y+this.w);
    this.origin_w=this.w;
    this.origin_x=this.x;
    this.origin_y=this.y;
    if(!corner_clicked){
      this.text_op+=5;
    }
    if(this.text_op>255){
      this.text_op=255;
    }
    this.controlGain(this.y);
  }

  focus(){
    let dest_x=displayWidth/2;
    let dest_y=displayHeight/2;
    let dest_w=this.origin_w*10;
    this.x=lerp(this.x, dest_x, .05);
    this.y=lerp(this.y, dest_y, .05);
    this.w=lerp(this.w, dest_w, .05);
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.w, this.w);
    if(this.w>dest_w-0.1){
      fill(255, this.text_op);
      textSize(30);
      textAlign(CENTER);
      text('r e t u r n', displayWidth/11, displayHeight/11);
      let sp=color(this.sp_f);
      let op=this.text_op;
      sp.setAlpha(op);
      fill(sp);
      text(this.name, this.x, this.y-this.w/3);
      return_x=displayWidth/11;
      return_y=displayHeight/11;
      this.text_op+=5;
      for(let i=0; i<sliders.length; i++){
        sliders[i].set();
        this.setVariables();
      }
      if(this.name=='m o o n'){
        moonButton.set();
      }
      if(this.name=='m a r s'){
        marsButton.set();
      }
    }
  }

  withdraw(){
    let dest_y=displayHeight+500;
    this.y=lerp(this.y, dest_y, .01);
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.w, this.w);
    fill(255);
    this.controlGain(this.y);
  }

  return(){
    let dest_x=this.origin_x;
    let dest_y=this.origin_y;
    let dest_w=this.origin_w;
    this.x=lerp(this.x, dest_x, .04);
    this.y=lerp(this.y, dest_y, .04);
    this.w=lerp(this.w, dest_w, .04);
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, this.w, this.w);
    if(this.focused){
      for(let i=0; i<sliders.length; i++){
        sliders[i].fade();
      }
      if(this.name=='m o o n'){
        moonButton.fade();
      }
      if(this.name=='m a r s'){
        marsButton.fade();
      }
    }
    if(this.withdrawn){
      this.controlGain(this.y);
    }
    if(abs(this.x-dest_x)<0.1 && abs(this.y-dest_y)<0.1 && abs(this.w-dest_w)<0.1){
      this.returning=false;
      this.focused=false;
      this.withdrawn=false;
      focused_on=false;
      this.text_op=0;
      if(!returned){
        returned=true;
      }
    }
  }

  controlGain(y){
    y=normalize(y, 0, displayHeight, 90, 0);
    if(this.name=='s u n'){
      sun_alt.value=y;
    }
    if(this.name=='m e r c u r y'){
      mercury_alt.value=y;
    }
    if(this.name=='v e n u s'){
      venus_alt.value=y;
    }
    if(this.name=='e a r t h'){
      earth_gain.value=y/90;
    }
    if(this.name=='m o o n'){
      moon_alt.value=y;
    }
    if(this.name=='m a r s'){
      mars_alt.value=y;
    }
    if(this.name=='j u p i t e r'){
      jupiter_alt.value=y;
    }
    if(this.name=='s a t u r n'){
      saturn_alt.value=y;
    }
    if(this.name=='u r a n u s'){
      uranus_alt.value=y;
    }
    if(this.name=='n e p t u n e'){
      neptune_alt.value=y;
    }
    if(this.name=='p l u t o'){
      pluto_alt.value=y;
    }
  }

  setVariables(){
    if(this.name=='s u n'){
      for(let i=0; i<sliders.length;i++){
        if(i==0){
          sun_offset_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 500, 8000);
        }
        if(i==1){
          sun_flange_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 300, 5000);
        }
        if(i==2){
          sun_attack.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 50, 5000);
        }
        if(i==3){
          sun_release.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 400, 6000);
        } 
      }
    }
    if(this.name=='m e r c u r y'){
      for(let i=0; i<sliders.length;i++){
        if(i==0){
          mercury_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 100, 2000);
        }
        if(i==1){
          mercury_del_time.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 20, 2000);
        }
        if(i==2){
          mercury_fb.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0., .9);
        }
        if(i==3){
          mercury_cutoff.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 100, 5000);
        } 
        if(i==4){
          mercury_q.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0., .9);
        } 
      }
    }
    if(this.name=='v e n u s'){
      for(let i=0; i<sliders.length;i++){
        if(i==0){
          venus_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 500, 2500);
        }
        if(i==1){
          venus_brightness.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, -2.98, -4.92);
        }
        if(i==2){
          venus_cutoff.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 100, 5000);
        }
        if(i==3){
          venus_q.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0., 0.7);
        } 
      }
    }
    if(this.name=='e a r t h'){
      for(let i=0; i<sliders.length; i++){
        if(i==0){
          earth_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 100, 4000);
        }
        if(i==1){
          earth_env.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, .1, .9);
        }
      }
    }
    if(this.name=='m o o n'){
      for(let i=0; i<sliders.length;i++){
        if(i==0){
          moon_l_del.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 20, 1200);
        }
        if(i==1){
          moon_l_fb.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0., 0.9);
        }
        if(i==2){
          moon_r_del.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 20, 1200);
        }
        if(i==3){
          moon_r_fb.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0., 0.9);
        } 
      }
    }
    if(this.name=='m a r s'){
      for(let i=0; i<sliders.length;i++){
        if(i==0){
          mars_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 100, 1500);
        }
        if(i==1){
          mars_brightness.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 1.86, -2.94);
        }
        if(i==2){
          mars_decay.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0, 180);
        }
      }
    }
    if(this.name=='j u p i t e r'){
      for(let i=0; i<sliders.length;i++){
        if(i==0){
          jupiter_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 1000, 4000);
        }
        if(i==1){
          jupiter_attack.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 100, 1000);
        }
        if(i==2){
          jupiter_release.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0.1, 1.);
        }
        if(i==3){
          jupiter_q.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0., 0.8);
        } 
      }
    }
    if(this.name=='s a t u r n'){
      for(let i=0; i<sliders.length;i++){
        if(i==0){
          saturn_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 100, 2000);
        }
        if(i==1){
          saturn_attack.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0, 100);
        }
        if(i==2){
          saturn_cutoff.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 160, 1600);
        }
        if(i==3){
          saturn_q.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0., 1.);
        } 
      }
    }
    if(this.name=='u r a n u s'){
      for(let i=0; i<sliders.length; i++){
        if(i==0){
          uranus_size.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0, 180);
        }
        if(i==1){
          uranus_decay.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 67, 127);
        }
      }
    }
    if(this.name=='n e p t u n e'){
      for(let i=0; i<sliders.length;i++){
        if(i==0){
          neptune_tempo.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 100, 2000);
        }
        if(i==1){
          neptune_q.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 0., 1.);
        }
        if(i==2){
          neptune_noise_q.value=normalize(sliders[i].value, sliders[i].min, sliders[i].max, 8, 7.67);
        }
      }
    }
  }
}

function normalize(val, valLo, valHi, outLo, outHi){
   if (val < valLo){
      val = valLo;
   } else if (val > valHi){
      val = valHi;
   }
   let valDiff = valHi - valLo;
   let outDiff = outHi - outLo;
   let percent = (val - valLo) / valDiff;
   return outLo + (percent * outDiff);
}

let prev_x;
let prev_y;

function mousePressed(){
  if(drawPlanets){
    if(!focused_on){
      for(let i=0; i<11; i++){
        if(mouseX<planet5[i].x+planet5[i].w && mouseX>planet5[i].x-planet5[i].w && mouseY<planet5[i].y+planet5[i].w && mouseY>planet5[i].y-planet5[i].w){
          prev_x=mouseX;
          prev_y=mouseY;
          planet5[i].y=mouseY;
          planet5[i].pressed=true;
        }
      }
    }else{
      for(let i=0; i<sliders.length; i++){
        if(mouseX>sliders[i].value-20 && mouseX<sliders[i].value+20 && mouseY>sliders[i].position-20 && mouseY<sliders[i].position+20){
          sliders[i].pressed = true;
          sliders[i].value=mouseX;
          if(mouseX<sliders[i].min){
            sliders[i].value=sliders[i].min;
          }
          if(mouseX>sliders[i].max){
            sliders[i].value=sliders[i].max;
          }
        }
      }
      if(mouseY>marsButton.position-20 && mouseY<marsButton.position+20 && mouseX>displayWidth/2-50 && mouseX<displayWidth/2+50){
        marsButton.pressed=true;
      }
      if(mouseY>moonButton.position-20 && mouseY<moonButton.position+20 && mouseX>displayWidth/2-50 && mouseX<displayWidth/2+50){
        moonButton.pressed=true;
      }
    }
  }
  return false;
}

function mouseDragged(){
  if(drawPlanets){
    if(!dragged){
      dragged=true;
    }
    if(!focused_on){
      for(let i=0; i<11; i++){
        if(planet5[i].pressed){
          planet5[i].y=mouseY;
        }
      }
    }else{
      for(let i=0; i<sliders.length; i++){
        if(sliders[i].pressed){
          sliders[i].value=mouseX;
          if(mouseX<sliders[i].min){
            sliders[i].value=sliders[i].min;
          }
          if(mouseX>sliders[i].max){
            sliders[i].value=sliders[i].max;
          }
        }
      }
    }
  }else{
    const lat=document.getElementById('latitude');
    const long=document.getElementById('longitude');
    lat.addEventListener('click', ()=> {
      lat.focus();
    })
    long.addEventListener('click', ()=>{
      long.focus();
    })
  }
  return false;
}

function mouseReleased(){
  if(drawPlanets){
    if(!focused_on){
      for(let i=0; i<11; i++){
        if(planet5[i].pressed){
          planet5[i].pressed=false;
        }
      }
    }else{
      for(let i=0; i<sliders.length; i++){
        if(sliders[i].pressed){
          sliders[i].pressed = false;
        }
      }
    }
    marsButton.pressed=false;
    moonButton.pressed=false;
  }
  return false;
}

function mouseClicked(){
  if(drawPlanets){
    if(!focused_on){
      for(let i=0; i<11; i++){
        if(mouseX<planet5[i].x+planet5[i].w && mouseX>planet5[i].x-planet5[i].w && mouseY<planet5[i].y+planet5[i].w && mouseY>planet5[i].y-planet5[i].w){
          if(mouseX<prev_x+planet5[i].w && mouseX>prev_x-planet5[i].w && mouseY<prev_y+planet5[i].w && mouseY>prev_y-planet5[i].w){
            planet5[i].double+=1;
          }
          if(planet5[i].double==2){
            if(!double_clicked){
              double_clicked=true;
            }
            planet5[i].focused = true;
            focused_on=true;
            planet5[i].text_op = 0;
            let focus=i;
            for(let j=0; j<11; j++){
              if(j!=focus){
                planet5[j].withdrawn = true;
              }
            }
            planet5[i].double=0;
            sliders=[];
            if(planet5[i].name=='s u n'){
              for(let k=0; k<4; k++){
                if(k==0){
                  sliders[k]= new Slider('o f f s e t  t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(sun_offset_tempo.value, 500, 8000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==1){
                  sliders[k]= new Slider('f l a n g e  t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(sun_flange_tempo.value, 300, 5000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==2){
                  sliders[k]= new Slider('a t t a c k', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(sun_attack.value, 50, 5000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==3){
                  sliders[k]= new Slider('r e l e a s e', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(sun_release.value, 400, 6000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
              }
            }
            if(planet5[i].name=='m e r c u r y'){
              for(let k=0; k<5; k++){
                if(k==0){
                  sliders[k]= new Slider('t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(mercury_tempo.value, 100, 2000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==1){
                  sliders[k]= new Slider('d e l a y  t i m e', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(mercury_del_time.value, 20, 2000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==2){
                  sliders[k]= new Slider('f e e d b a c k', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(mercury_fb.value, 0., .9, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==3){
                  sliders[k]= new Slider('c u t o f f', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(mercury_cutoff.value, 100, 5000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==4){
                  sliders[k]= new Slider('q', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(mercury_q.value, 0., .9, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
              }
            }
            if(planet5[i].name=='v e n u s'){
              for(let k=0; k<4; k++){
                if(k==0){
                  sliders[k]= new Slider('t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(venus_tempo.value, 500, 2500, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==1){
                  sliders[k]= new Slider('b r i g h t n e s s', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(venus_brightness.value, -2.98, -4.92, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==2){
                  sliders[k]= new Slider('c u t o f f', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(venus_cutoff.value, 100, 5000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==3){
                  sliders[k]= new Slider('q', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(venus_q.value, 0., 0.7, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
              }
            }
            if(planet5[i].name == 'e a r t h'){
              for(let k=0; k<2; k++){
                if(k==0){
                  sliders[k]= new Slider('t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(earth_tempo.value, 100, 4000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
                if(k==1){
                  sliders[k]= new Slider('e n v e l o p e', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(earth_env.value, .1, .9, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
                }
              }
            }
          }
          if(planet5[i].name=='m o o n'){
            for(let k=0; k<5; k++){
              if(k==0){
                sliders[k]= new Slider('l e f t  d e l a y  t i m e', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(moon_l_del.value, 20, 1200, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==1){
                sliders[k]= new Slider('l e f t  f e e d b a c k', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(moon_l_fb.value, 0., 0.9, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==2){
                sliders[k]= new Slider('r i g h t  d e l a y  t i m e', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(moon_r_del.value, 20, 1200, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==3){
                sliders[k]= new Slider('r i g h t  f e e d b a c k', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(moon_r_fb.value, 0., 0.9, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==4){
                moonButton.position=displayHeight/2-planet5[i].w*10/6+k*planet5[i].w;
              }
            }
          }
          if(planet5[i].name=='m a r s'){
            for(let k=0; k<4; k++){
              if(k==0){
                sliders[k]= new Slider('t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(mars_tempo.value, 100, 1500, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==1){
                sliders[k]= new Slider('b r i g h t n e s s', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(mars_brightness.value, 1.86, -2.94, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==2){
                sliders[k]= new Slider('d e c a y', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(mars_decay.value, 0, 180, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==3){
                marsButton.position=displayHeight/2-planet5[i].w*10/6+k*planet5[i].w;
              }
            }
          }
          if(planet5[i].name=='j u p i t e r'){
            for(let k=0; k<4; k++){
              if(k==0){
                sliders[k]= new Slider('t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(jupiter_tempo.value, 1000, 4000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==1){
                sliders[k]= new Slider('a t t a c k', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(jupiter_attack.value, 100, 1000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==2){
                sliders[k]= new Slider('r e l e a s e', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(jupiter_release.value, 0.1, 1.0, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==3){
                sliders[k]= new Slider('q', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(jupiter_q.value, 0., .8, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
            }
          }
          if(planet5[i].name=='s a t u r n'){
            for(let k=0; k<4; k++){
              if(k==0){
                sliders[k]= new Slider('t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(saturn_tempo.value, 100, 2000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==1){
                sliders[k]= new Slider('a t t a c k', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(saturn_attack.value, 0, 100, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==2){
                sliders[k]= new Slider('c u t o f f', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(saturn_cutoff.value, 160, 1600, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==3){
                sliders[k]= new Slider('q', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(saturn_q.value, 0., 1., displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
            }
          }
          if(planet5[i].name == 'u r a n u s'){
            for(let k=0; k<2; k++){
              if(k==0){
                sliders[k]= new Slider('r e v e r b  s i z e', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(uranus_size.value, 0, 180, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==1){
                sliders[k]= new Slider('r e v e r b  d e c a y', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(uranus_decay.value, 67, 127, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
            }
          }
          if(planet5[i].name=='n e p t u n e'){
            for(let k=0; k<3; k++){
              if(k==0){
                sliders[k]= new Slider('t e m p o', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(neptune_tempo.value, 100, 2000, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==1){
                sliders[k]= new Slider('q', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(neptune_q.value, 0., 1., displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
              if(k==2){
                sliders[k]= new Slider('n o i s e  q', displayHeight/2-planet5[i].w*10/6+k*planet5[i].w*10/12, displayWidth/2+25, displayWidth/2+125, normalize(neptune_noise_q.value, 8., 7.67, displayWidth/2+25, displayWidth/2+125), planet5[i].sp_f);
              }
            }
          }
        }else{
          planet5[i].double=0;
        }
        if(mouseX>displayWidth*10/11-50 && mouseX<displayWidth*10/11+50 && mouseY>displayHeight/11-50 && mouseY<displayHeight/11+50){
          if(!corner_clicked){
            corner_clicked=true;
          }else{
            corner_clicked=false;
          }
        }
      }
    }else{
      if(mouseX>return_x-200 && mouseX<return_x+200 && mouseY>return_y-50 && mouseY<return_y+50){
        for(let i=0; i<11; i++){
          planet5[i].returning = true;
        }
      }
      if(marsButton.clickable){
        if(mouseY>marsButton.position-20 && mouseY<marsButton.position+20 && mouseX>displayWidth/2-50 && mouseX<displayWidth/2+50){
          marsButton.clicked();
        }
      }
      if(moonButton.clickable){
        if(mouseY>moonButton.position-20 && mouseY<moonButton.position+20 && mouseX>displayWidth/2-50 && mouseX<displayWidth/2+50){
          moonButton.clicked();
        }
      }
    }
  }
  return false;
}

class Slider{
  constructor(name, position, min, max, value, sp_f){
    this.name=name;
    this.position=position;
    this.min=min;
    this.max=max;
    this.value=value;
    this.sp_f=sp_f;
    
    this.pressed=false;

    this.op=0;
  }
  
  set(){
    let sp=color(this.sp_f);
    let opa=this.op;
    sp.setAlpha(opa);
    fill(sp);
    stroke(sp);
    textSize(20);
    textAlign(RIGHT);
    text(this.name, displayWidth/2-25, this.position+5);
    line(this.min, this.position, this.max, this.position);
    ellipse(this.value, this.position, 20, 20);
    this.op+=5;
    if(this.op>255){
      this.op=255;
    }
  }

  fade(){
    let sp=color(this.sp_f);
    let opa=this.op;
    sp.setAlpha(opa);
    fill(sp);
    stroke(sp);
    textSize(20);
    textAlign(RIGHT);
    text(this.name, displayWidth/2-25, this.position+5);
    line(this.min, this.position, this.max, this.position);
    ellipse(this.value, this.position, 20, 20);
    this.op-=40;
  }
}

class Button{
  constructor(sp_f, text1, text2, r, g, b){
    this.position=-5000;

    this.sp_f=sp_f;
    this.text1=text1;
    this.text2=text2;
    this.r=r;
    this.g=g;
    this.b=b;

    this.op=0;

    this.text=text1;

    this.pressed=false;

    this.clickable=false;
  }

  set(){
    if(!this.pressed){
      let sp=color(this.sp_f);
      let opa=this.op;
      sp.setAlpha(opa);
      fill(sp);
      stroke(sp);
      rectMode(CENTER);
      rect(displayWidth/2, this.position, textWidth(this.text)+20, 40);
      textSize(20);
      textAlign(CENTER);
      fill(this.r-25, this.g-25, this.b-25, opa);
      text(this.text, displayWidth/2, this.position+5);
    }else{
      let sp=color(this.sp_f);
      let opa=this.op;
      fill(this.r-25, this.g-25, this.b-25, opa);
      stroke(this.r-25, this.g-25, this.b-25, opa);
      rectMode(CENTER);
      rect(displayWidth/2, this.position, textWidth(this.text)+20, 40);
      sp.setAlpha(opa);
      fill(sp);
      textSize(20);
      textAlign(CENTER);
      text(this.text, displayWidth/2, this.position+5);
    }
    this.op+=5;
    if(this.op>255){
      this.op=255;
    }
    this.clickable=true;
  }

  fade(){
    let sp=color(this.sp_f);
    let opa=this.op;
    sp.setAlpha(opa);
    fill(sp);
    stroke(sp);
    rectMode(CENTER);
    rect(displayWidth/2, this.position, textWidth(this.text)+20, 40);
    textSize(20);
    textAlign(CENTER);
    fill(this.r-25, this.g-25, this.b-25, opa);
    text(this.text, displayWidth/2, this.position+5);
    this.op+=5;
    this.op-=40;
    this.clickable=false;
  }

  clicked(){
    if(this.text==this.text1){
      this.text=this.text2;
    }else{
      this.text=this.text1;
    }
    if(planet5[4].focused){
      if(moon_rand.value==0){
        moon_rand.value==1;
      }else{
        moon_rand.value==0;
      }
    }
    if(planet5[5].focused){
      mars_change.value='change';
    }
  }
}

class Star{
  constructor(x, y, w, speed, b_r){
    this.x=x;
    this.y=y;
    this.w=w;
    this.speed=speed;
    this.b_r=b_r;

    this.op=0;
  }

  shine(){
    fill(255, this.op);
    ellipse(this.x, this.y, this.w, this.w)
    this.x-=this.speed;
    this.op+=this.b_r;
    if(this.op>255){
      this.b_r=-this.b_r;
    }
    if(this.op<0){
      this.b_r=random(.01, .05);
    }
    if(this.x<0){
      this.x=displayWidth;
      this.y=random(displayHeight);
      this.speed=random(.01, .05);
    }
  }
}

function chooseInstructions(){
  if(i1_op>=0){
    instruction1();
  }else{
    instruction2();
  }
}

function instruction1(){
  noStroke();
  textAlign(CENTER);
  fill(255, i1_op);
  textSize(30);
  text('c l i c k  o n  a n d  d r a g  a  p l a n e t  t o  c h a n g e  i t s  v o l u m e', displayWidth/2, 100);
  if(!dragged){
    i1_op+=1;
    if(i1_op>255){
      i1_op=255;
    }
  }else{
    i1_op-=5;
  }
}

function instruction2(){
  noStroke();
  textAlign(CENTER);
  fill(255, i2_op);
  textSize(30);
  text('d o u b l e - c l i c k  o n  a  p l a n e t  t o  a d j u s t  i t s  s e t t i n g s', displayWidth/2, 100);
  if(!double_clicked){
    i2_op+=1;
    if(i2_op>255){
      i2_op=255;
    }
  }else{
    i2_op-=5;
  }
}

function about_text(){
  noStroke();
  rectMode(CENTER);
  fill(255, page_op);
  rect(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  fill(0, about_op);
  textSize(20);
  textAlign(CENTER);
  textWrap(WORD);
  text("This website is a thesis presented in partial fulfillment of a Master's in Computer Music Composition Degree at the Indiana University Jacobs School of Music. It utilizes Max MSP's RNBO package to generate audio within a web browser. When a geographic location is provided, this site requests astronomical data from Astronomy API based on the time of day and provided geographical coordinates. This data is sent into a RNBO patch that turns on and sets the state of custom instruments according to which planets are currently visible at the provided location. Some of this data varies by location, some by time of day, month, or year, and some even by much longer celestial cycles and distances, such as a planet's distance from Earth. Although this data is technically immutable, most of it is only used to initalize the RNBO instruments. Users are at perfect liberty to modify these intial settings by double-clicking on a planet and experimenting with the provided parameters of its corresponding instrument. Moving a planet up and down changes the volume of its RNBO companion, so that users can isolate and mix collections of instruments according to their tastes. However, despite being subject to the heavens' machinations and users' whims, these instruments run through their own idiosyncratic pitch and rhythmic content independently, so that, once initialized or set, they generate new musical content freely, wandering through permutations and into patterns without any external guidance whatsoever. With so much flexibility and determinism, there are yet parameters and aspects of the instruments that can only be revealed through repeated visits to this site, which will (hopefully) entice users to check back in every once in a while and hear how the planets have changed. In addition to basic HTML, CSS, and Javascript methods, this website also uses p5, a JavaScript library, to generate its graphics and user interface. The source code for all of this website's material, including a Max patch for testing and perusing the RNBO instruments, is available at https://github.com/gitxandert/bodies.", displayWidth/2, displayHeight*2/11, displayWidth-100);
  text("-Alexander Toth, December 2023", displayWidth*10/11, displayHeight*10/11);
  if(!corner_clicked){
    if(corner_op_2>0){
      fill(0, corner_op_2);
      textSize(30);
      textAlign(CENTER);
      text('c l o s e', displayWidth*10/11, displayHeight/11);
      corner_op_2-=corner_inc*5;
    }else{
      fill(255, corner_op_1);
      textSize(30);
      textAlign(CENTER);
      text('a b o u t', displayWidth*10/11, displayHeight/11);
      if(!focused_on){
        corner_op_1+=corner_inc*2;
        if(corner_op_1>255){
          corner_op_1=255;
        }
      }else{
        corner_op_1-=corner_inc*5;
        if(corner_op_1<0){
          corner_op_1=0;
        }
      }
    }
    page_op-=3;
    about_op-=3;
  }else{
    if(corner_op_1>0){
      fill(255, corner_op_1);
      textSize(30);
      textAlign(CENTER);
      text('a b o u t', displayWidth*10/11, displayHeight/11, displayWidth, displayHeight);
      corner_op_1-=corner_inc*5;
      for(let i=0; i<11; i++){
        planet5[i].text_op-=5;
      }
    }else{
      fill(0, corner_op_2);
      textSize(30);
      textAlign(CENTER);
      text('c l o s e', displayWidth*10/11, displayHeight/11);
      corner_op_2+=corner_inc*2;
      if(corner_op_2>255){
        corner_op_2=255;
      }
    }
    page_op+=1;
    about_op+=1;
  }
  if(page_op>150){
    page_op=150;
  }
  if(page_op<0){
    page_op=0;
  }
  if(about_op>255){
    about_op=255;
  }
  if(about_op<0){
    about_op=0;
  }
}
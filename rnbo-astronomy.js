let device;

let drawPlanets=false;

let constellations = [
  'and', 'ant', 'aps', 'aqr', 'aql', 'ara', 'ari', 'aur', 'boo', 'cae', 'cam', 'cnc', 'cvn', 'cma', 'cmi', 'cap', 'car',
  'cas', 'cen', 'cep', 'cet', 'cha', 'cir', 'col', 'com', 'cra', 'crb', 'crv', 'crt', 'cru', 'cyg', 'del', 'dor', 'dra',
  'equ', 'eri', 'for', 'gem', 'gru', 'her', 'hor', 'hya', 'hyi', 'ind', 'lac', 'leo', 'lmi', 'lep', 'lib', 'lup', 'lyn',
  'lyr', 'men', 'mic', 'mon', 'mus', 'nor', 'oct', 'oph', 'ori', 'pav', 'peg', 'per', 'phe', 'pic', 'psc', 'psa', 'pup',
  'pyx', 'ret', 'sge', 'sgr', 'sco', 'scl', 'sct', 'ser', 'sex', 'tau', 'tel', 'tri', 'tra', 'tuc', 'uma', 'umi', 'vel',
  'vir', 'vol', 'vul'
]

let sun_visible=false;
let mercury_visible=false;
let venus_visible=false;
let earth_visible=false;
let moon_visible=false;
let mars_visible=false;
let jupiter_visible=false;
let saturn_visible=false;
let uranus_visible=false;
let neptune_visible=false;
let pluto_visible=false;

let sun_alt={};
let mercury_alt={};
let venus_alt={};
let earth_gain={};
let moon_alt={};
let mars_alt={};
let jupiter_alt={};
let saturn_alt={};
let uranus_alt={};
let neptune_alt={};
let pluto_alt={};

let sun_offset_tempo={};
let sun_flange_tempo={};
let sun_attack={};
let sun_release={};

let mercury_tempo={};
let mercury_del_time={};
let mercury_fb={};
let mercury_cutoff={};
let mercury_q={};

let venus_tempo={};
let venus_brightness={};
let venus_cutoff={};
let venus_q={};

let earth_tempo={};
let earth_env={};

let moon_rand={};
let moon_l_del={};
let moon_l_fb={};
let moon_r_del={};
let moon_r_fb={};

let mars_change={};
let mars_tempo={};
let mars_brightness={};
let mars_decay={};

let jupiter_tempo={};
let jupiter_q={};
let jupiter_attack={};
let jupiter_release={};

let saturn_tempo={};
let saturn_attack={};
let saturn_cutoff={};
let saturn_q={};

let uranus_size={};
let uranus_decay={};

let neptune_tempo={};
let neptune_noise_q={};
let neptune_q={};

async function setup() {
  const patchExportURL = "maxstuff/planets.export.json";

  // Create AudioContext
  const WAContext = window.AudioContext || window.webkitAudioContext;
  const context = new WAContext();

  // Create gain node and connect it to audio output
  const outputNode = context.createGain();
  outputNode.connect(context.destination);

  // Fetch the exported patcher
  let response, patcher;
  try {
    response = await fetch(patchExportURL);
    patcher = await response.json();

    if (!window.RNBO) {
      // Load RNBO script dynamically
      // Note that you can skip this by knowing the RNBO version of your patch
      // beforehand and just include it using a <script> tag
      await loadRNBOScript(patcher.desc.meta.rnboversion);
    }
  } catch (err) {
    const errorContext = {
      error: err
    };
    if (response && (response.status >= 300 || response.status < 200)) {
      (errorContext.header = `Couldn't load patcher export bundle`),
        (errorContext.description =
          `Check app.js to see what file it's trying to load. Currently it's` +
          ` trying to load "${patchExportURL}". If that doesn't` +
          ` match the name of the file you exported from RNBO, modify` +
          ` patchExportURL in app.js.`);
    }
    if (typeof guardrails === "function") {
      guardrails(errorContext);
    } else {
      throw err;
    }
    return;
  }

  try {
    device = await RNBO.createDevice({ context, patcher });
  } catch (err) {
    if (typeof guardrails === "function") {
      guardrails({ error: err });
    } else {
      throw err;
    }
    return;
  }

  device.node.connect(outputNode);
  
  context.suspend();

  const start=document.querySelector('#start');
  start.addEventListener('click', ()=>{
    if(!drawPlanets){
      const lat=document.getElementById('latitude');
      const long=document.getElementById('longitude');
      latitude=lat.value;
      longitude=long.value;
      console.log(latitude, longitude);
      latitude=latitude.toString();
      longitude=longitude.toString();
      context.resume();
      sonify(device);
      drawPlanets=true;
      let container=document.getElementById('container');
      container.setAttribute('id', 'fade');
    }
  })

}

async function sonify(device){
  await getPlanets();

  console.log(planets);

  const date=new Date();
  
  const tuning = device.parametersById.get('constellations/constellation');
  const constell_gate = device.parametersById.get('constellations/constell_gate');

  earth_gain=device.parametersById.get('earth/gain');

  earth_tempo=device.parametersById.get('earth/tempo');
  earth_tempo.value=Math.random()*1900+100;
  console.log("earth tempo: " + earth_tempo.value);

  earth_env=device.parametersById.get('earth/env');
  earth_env.value=Math.random()*.8+.1;

  const earth_on=device.parametersById.get('earth/onoff');
  earth_on.value=1;
  earth_visible=true;

  console.log('earth on');

  const moon_phase=device.parametersById.get('moon/phase');
  moon_phase.value=planets['moon']['extraInfo']['phase']['angel'];
  console.log('moon phase (angle): ' + moon_phase.value);

  const moon_mag=device.parametersById.get('moon/magnitude');
  moon_mag.value=planets['moon']['extraInfo']['magnitude'];
  console.log("moon magnitude: " + moon_mag.value);

  const moon_elong=device.parametersById.get('moon/elongation');
  moon_elong.value=planets['moon']['extraInfo']['elongation'];
  console.log("moon elongation: " + moon_elong.value);

  moon_alt=device.parametersById.get('moon/altitude');
  moon_alt.value=planets['moon']['position']['horizontal']['altitude']['degrees'];
  console.log("moon altitude: " + moon_alt.value);

  const moon_az=device.parametersById.get('moon/azimuth');
  moon_az.value=planets['moon']['position']['horizontal']['azimuth']['degrees'];
  console.log("moon azimuth: " + moon_az.value);

  const moon_temp=device.parametersById.get('moon/maxtemp');
  moon_temp.value=2000+ Math.random()*10000;
  console.log("moon tempo: " + moon_temp.value);

  moon_rand=device.parametersById.get('moon/rand_del');
  moon_rand.value=Math.floor(Math.random());

  moon_l_del=device.parametersById.get('moon/l_deltime');
  moon_l_del.value=20 + Math.random()*1180;

  moon_l_fb=device.parametersById.get('moon/l_fb');
  moon_l_fb.value=Math.random()*0.9;

  moon_r_del=device.parametersById.get('moon/r_deltime');
  moon_r_del.value=20 + Math.random()*1180;

  moon_r_fb=device.parametersById.get('moon/r_fb');
  moon_r_fb.value=Math.random()*0.9;

  constell_gate.value=10;
  tune=planets['moon']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("moon constellation: " + tune);
    }
  }

  const moon_onoff=device.parametersById.get('moon/onoff');
  if(moon_alt.value>0){
      moon_onoff.value=1;
      console.log('moon on');
      moon_visible=true;
  }else{
      moon_onoff.value=0;
      console.log('moon off');
  }

  const mercury_mag=device.parametersById.get('mercury/magnitude');
  mercury_mag.value=planets['mercury']['extraInfo']['magnitude'];
  console.log("mercury magnitude: " + mercury_mag.value);

  const mercury_elong=device.parametersById.get('mercury/elongation');
  mercury_elong.value=planets['mercury']['extraInfo']['elongation'];
  console.log("mercury elongation: " + mercury_elong.value);

  mercury_alt=device.parametersById.get('mercury/altitude');
  mercury_alt.value=planets['mercury']['position']['horizontal']['altitude']['degrees'];
  console.log("mercury altitude: " + mercury_alt.value);

  const mercury_az=device.parametersById.get('mercury/azimuth');
  mercury_az.value=planets['mercury']['position']['horizontal']['azimuth']['degrees'];
  console.log("mercury azimuth: " + mercury_az.value);

  mercury_tempo=device.parametersById.get('mercury/tempo');
  mercury_tempo.value=100 + Math.random()*400;
  console.log("mercury tempo: " + mercury_tempo.value);

  mercury_del_time=device.parametersById.get('mercury/del_time');
  mercury_del_time.value=20 + Math.random()*1980;

  mercury_fb=device.parametersById.get('mercury/fb');
  mercury_fb.value=0.4 + Math.random()*0.4;

  mercury_cutoff=device.parametersById.get('mercury/cut');
  mercury_cutoff.value=100 + Math.random()*4900;

  mercury_q=device.parametersById.get('mercury/q');
  mercury_q.value=0.1 + Math.random()*0.8;

  constell_gate.value=8;
  tune=planets['mercury']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("mercury constellation: " + tune);
    }
  }

  const mercury_onoff=device.parametersById.get('mercury/onoff');
  if(mercury_alt.value>0){
      mercury_onoff.value=1;
      console.log('mercury on');
      mercury_visible=true;
  }else{
      mercury_onoff.value=0;
      console.log('mercury off');
  }

  venus_brightness=device.parametersById.get('venus/magnitude');
  venus_brightness.value=planets['venus']['extraInfo']['magnitude'];
  console.log("venus magnitude: " + venus_brightness.value);

  venus_cutoff=device.parametersById.get('venus/rescut');
  venus_cutoff.value=400 + Math.random()*1200;

  venus_q=device.parametersById.get('venus/elongation');
  venus_q.value=planets['venus']['extraInfo']['elongation'];
  console.log("venus elongation: " + venus_q.value);

  venus_alt=device.parametersById.get('venus/altitude');
  venus_alt.value=planets['venus']['position']['horizontal']['altitude']['degrees'];
  console.log("venus altitude: " + venus_alt.value);

  const venus_az=device.parametersById.get('venus/azimuth');
  venus_az.value=planets['venus']['position']['horizontal']['azimuth']['degrees'];
  console.log("venus azimuth: " + venus_az.value);

  venus_tempo=device.parametersById.get('venus/tempo');
  venus_tempo.value=500 + Math.random()*2500;
  console.log("venus tempo: " + venus_tempo.value);

  constell_gate.value=9;
  tune=planets['venus']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("venus constellation: " + tune);
    }
  }

  const venus_onoff=device.parametersById.get('venus/onoff');
  if(venus_alt.value>0){
      venus_onoff.value=1;
      console.log('venus on')
      venus_visible=true;
  }else{
      venus_onoff.value=0;
      console.log('venus off')
  }

  const sun_month=device.parametersById.get('sun/month');
  sun_month.value=date.getMonth() + 1;
  console.log(sun_month.value);

  sun_alt=device.parametersById.get('sun/altitude');
  sun_alt.value=planets['sun']['position']['horizontal']['altitude']['degrees'];
  console.log("sun altitude: " + sun_alt.value);

  const sun_az=device.parametersById.get('sun/azimuth');
  sun_az.value=planets['sun']['position']['horizontal']['azimuth']['degrees'];
  console.log("sun azimuth: " + sun_az.value);

  sun_offset_tempo=device.parametersById.get('sun/addtemp');
  sun_offset_tempo.value=500 + Math.random()*7500;

  sun_flange_tempo=device.parametersById.get('sun/cuttemp');
  sun_flange_tempo.value=300 + Math.random()*2500;

  sun_attack=device.parametersById.get('sun/attack');
  sun_attack.value=50 + Math.random()*4900;
  console.log("sun attack: " + sun_attack.value);

  sun_release=device.parametersById.get('sun/decay');
  sun_release.value=400 + Math.random()*5600;
  console.log("sun release: " + sun_release.value);

  constell_gate.value=7;
  tune=planets['sun']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("sun constellation: " + tune);
    }
  }

  const sun_onoff=device.parametersById.get('sun/onoff');
  if(sun_alt.value>0){
      sun_onoff.value=1;
      console.log('sun on');
      sun_visible=true;
  }else{
      sun_onoff.value=0;
      console.log('sun off')
  }

  mars_change=device.parametersById.get('mars/change_inst');

  mars_brightness=device.parametersById.get('mars/magnitude');
  mars_brightness.value=planets['mars']['extraInfo']['magnitude'];
  console.log("mars magnitude: " + mars_brightness.value);

  mars_decay=device.parametersById.get('mars/elongation');
  mars_decay.value=planets['mars']['extraInfo']['elongation'];
  console.log("mars elongation: " + mars_decay.value);

  mars_alt=device.parametersById.get('mars/altitude');
  mars_alt.value=planets['mars']['position']['horizontal']['altitude']['degrees'];
  console.log("mars altitude: " + mars_alt.value);

  const mars_az=device.parametersById.get('mars/azimuth');
  mars_az.value=planets['mars']['position']['horizontal']['azimuth']['degrees'];
  console.log("mars azimuth: " + mars_az.value);

  mars_tempo=device.parametersById.get('mars/tempo');
  mars_tempo.value=100 + Math.random()*400;
  console.log("mars tempo: " + mars_tempo.value);

  constell_gate.value=5;
  tune=planets['mars']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("mars constellation: " + tune);
    }
  }

  const mars_onoff=device.parametersById.get('mars/onoff');
  if(mars_alt.value>0){
      mars_onoff.value=1;
      console.log('mars on');
      mars_visible=true;
  }else{
      mars_onoff.value=0;
      console.log('mars off');
  }

  const jupiter_mag=device.parametersById.get('jupiter/magnitude');
  jupiter_mag.value=planets['jupiter']['extraInfo']['magnitude'];
  console.log("jupiter magnitude: " + jupiter_mag.value);

  jupiter_q=device.parametersById.get('jupiter/q');
  jupiter_q.value=Math.random()*0.8;

  jupiter_attack=device.parametersById.get('jupiter/attack');
  jupiter_attack.value=100 + Math.random()*900;

  jupiter_release=device.parametersById.get('jupiter/elongation');
  jupiter_release.value=planets['jupiter']['extraInfo']['elongation'];
  console.log("jupiter elongation: " + jupiter_release.value);

  jupiter_alt=device.parametersById.get('jupiter/altitude');
  jupiter_alt.value=planets['jupiter']['position']['horizontal']['altitude']['degrees'];
  console.log("jupiter alt: " + jupiter_alt.value);

  const jupiter_az=device.parametersById.get('jupiter/azimuth');
  jupiter_az.value=planets['jupiter']['position']['horizontal']['azimuth']['degrees'];
  console.log("jupiter azimuth: " + jupiter_az.value);

  jupiter_tempo=device.parametersById.get('jupiter/tempo');
  jupiter_tempo.value=1000 + Math.random()*3000;
  console.log("jupiter tempo: " + jupiter_tempo.value);

  constell_gate.value=6;
  tune=planets['jupiter']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("jupiter constellation: " + tune);
    }
  }

  const jupiter_onoff=device.parametersById.get('jupiter/onoff');
  if(jupiter_alt.value>0){
      jupiter_onoff.value=1;
      console.log('jupiter on');
      jupiter_visible=true;
  }else{
      jupiter_onoff.value=0;
      console.log('jupiter off')
  }

  const saturn_mag=device.parametersById.get('saturn/magnitude');
  saturn_mag.value=planets['saturn']['extraInfo']['magnitude'];
  console.log("saturn magnitude: " + saturn_mag.value);

  const saturn_elong=device.parametersById.get('saturn/elongation');
  saturn_elong.value=planets['saturn']['extraInfo']['elongation'];
  console.log("saturn elongation: " + saturn_elong.value);

  saturn_alt=device.parametersById.get('saturn/altitude');
  saturn_alt.value=planets['saturn']['position']['horizontal']['altitude']['degrees'];
  console.log("saturn altitude: " + saturn_alt.value);

  const saturn_az=device.parametersById.get('saturn/azimuth');
  saturn_az.value=planets['saturn']['position']['horizontal']['azimuth']['degrees'];
  console.log("saturn azimuth: " + saturn_az.value);

  saturn_cutoff=device.parametersById.get('saturn/cut');
  saturn_cutoff.value=160 + Math.random()*1440;

  saturn_q=device.parametersById.get('saturn/q');
  saturn_q.value=0.1 + Math.random()*0.8;

  saturn_attack=device.parametersById.get('saturn/attack');
  saturn_attack.value=Math.random()*100;

  saturn_tempo=device.parametersById.get('saturn/tempo');
  saturn_tempo.value=100 + Math.random()*1900;
  console.log("saturn tempo: " + saturn_tempo.value);

  constell_gate.value=3;
  tune=planets['saturn']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("saturn constellation: " + tune);
    }
  }

  const saturn_onoff=device.parametersById.get('saturn/onoff');
  if(saturn_alt.value>0){
      saturn_onoff.value=1;
      console.log('saturn on');
      saturn_visible=true;
  }else{
      saturn_onoff.value=0;
      console.log('saturn off')
  }

  const uranus_mag=device.parametersById.get('uranus/magnitude');
  uranus_mag.value=planets['uranus']['extraInfo']['magnitude'];
  console.log("uranus magnitude: " + uranus_mag.value);

  uranus_size=device.parametersById.get('uranus/elongation');
  uranus_size.value=planets['uranus']['extraInfo']['elongation'];
  console.log("uranus elongation: " + uranus_size.value);

  uranus_decay=device.parametersById.get('uranus/decay');
  uranus_decay.value=67 + Math.random()*60;

  uranus_alt=device.parametersById.get('uranus/altitude');
  uranus_alt.value=planets['uranus']['position']['horizontal']['altitude']['degrees'];
  console.log("uranus altitude: " + uranus_alt.value);

  const uranus_az=device.parametersById.get('uranus/azimuth');
  uranus_az.value=planets['uranus']['position']['horizontal']['azimuth']['degrees'];
  console.log("uranus azimuth: " + uranus_az.value);

  constell_gate.value=4;
  tune=planets['uranus']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("uranus constellation: " + tune);
    }
  }

  const uranus_onoff=device.parametersById.get('uranus/onoff');
  if(uranus_alt.value>0){
      uranus_onoff.value=1;
      console.log('uranus on');
      uranus_visible=true;
  }else{
      uranus_onoff.value=0;
      console.log('uranus off')
  }

  neptune_q=device.parametersById.get('neptune/q');
  neptune_q.value=Math.random()*0.9;
  console.log("neptune q: " + neptune_q.value);

  neptune_noise_q=device.parametersById.get('neptune/magnitude');
  neptune_noise_q.value=planets['neptune']['extraInfo']['magnitude'];
  console.log("neptune magnitude: " + neptune_noise_q.value);

  const neptune_elong=device.parametersById.get('neptune/elongation');
  neptune_elong.value=planets['neptune']['extraInfo']['elongation'];
  console.log("neptune elongation: " + neptune_elong.value);

  neptune_alt=device.parametersById.get('neptune/altitude');
  neptune_alt.value=planets['neptune']['position']['horizontal']['altitude']['degrees'];
  console.log("neptune altitude: " + neptune_alt.value);

  const neptune_az=device.parametersById.get('neptune/azimuth');
  neptune_az.value=planets['neptune']['position']['horizontal']['azimuth']['degrees'];
  console.log("neptune azimuth: " + neptune_az.value);

  neptune_tempo=device.parametersById.get('neptune/tempo');
  neptune_tempo.value=100 + Math.random()*1900;
  console.log("neptune tempo: " + neptune_tempo.value);

  constell_gate.value=2;
  tune=planets['neptune']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("neptune constellation: " + tune);
    }
  }

  const neptune_onoff=device.parametersById.get('neptune/onoff');
  if(neptune_alt.value>0){
      neptune_onoff.value=1;
      console.log('neptune on');
      neptune_visible=true;
  }else{
      neptune_onoff.value=0;
      console.log('neptune off');
  }

  const pluto_au=device.parametersById.get('pluto/au');
  pluto_au.value=planets['pluto']['distance']['fromEarth']['au'];
  console.log("pluto distance (au): " + pluto_au.value);

  const pluto_elong=device.parametersById.get('pluto/elongation');
  pluto_elong.value=planets['pluto']['extraInfo']['elongation'];
  console.log("pluto elongation: " + pluto_elong.value);

  pluto_alt=device.parametersById.get('pluto/altitude');
  pluto_alt.value=planets['pluto']['position']['horizontal']['altitude']['degrees'];
  console.log("pluto altitude: " + pluto_alt.value);

  const pluto_az=device.parametersById.get('pluto/azimuth');
  pluto_az.value=planets['pluto']['position']['horizontal']['azimuth']['degrees'];
  console.log("pluto azimuth: " + pluto_az.value);

  constell_gate.value=1;
  tune=planets['pluto']['position']['constellation']['id'];
  for(let i=0;i<constellations.length;i++){
    if(constellations[i]==tune){
      tuning.value=i;
      console.log("pluto constellation: " + tune);
    }
  }

  const pluto_onoff=device.parametersById.get('pluto/onoff');
  if(pluto_alt.value>0){
      pluto_onoff.value=1;
      console.log('pluto on');
      pluto_visible=true;
  }else{
      pluto_onoff.value=0;
      console.log('pluto off')
  }

}

setup();
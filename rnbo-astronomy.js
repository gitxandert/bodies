let device;

let constellations = [
  'and', 'ant', 'aps', 'aqr', 'aql', 'ara', 'ari', 'aur', 'boo', 'cae', 'cam', 'cnc', 'cvn', 'cma', 'cmi', 'cap', 'car',
  'cas', 'cen', 'cep', 'cet', 'cha', 'cir', 'col', 'com', 'cra', 'crb', 'crv', 'crt', 'cru', 'cyg', 'del', 'dor', 'dra',
  'equ', 'eri', 'for', 'gem', 'gru', 'her', 'hor', 'hya', 'hyi', 'ind', 'lac', 'leo', 'lmi', 'lep', 'lib', 'lup', 'lyn',
  'lyr', 'men', 'mic', 'mon', 'mus', 'nor', 'oct', 'oph', 'ori', 'pav', 'peg', 'per', 'phe', 'pic', 'psc', 'psa', 'pup',
  'pyx', 'ret', 'sge', 'sgr', 'sco', 'scl', 'sct', 'ser', 'sex', 'tau', 'tel', 'tri', 'tra', 'tuc', 'uma', 'umi', 'vel',
  'vir', 'vol', 'vul'
]

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
  document.addEventListener('click', ()=>{
      context.resume();
      sonify(device);
  })

}

async function sonify(device){
  await getPlanets();

  console.log(planets);
  
  const tuning = device.parametersById.get('constellations/constellation');
  const constell_gate = device.parametersById.get('constellations/constell_gate');

  const earth_temp=device.parametersById.get('earth/tempo');
  earth_temp.value=Math.random()*1900+100;
  console.log("earth tempo: " + earth_temp.value);

  const earth_on=device.parametersById.get('earth/onoff');
  earth_on.value=1;
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

  const moon_alt=device.parametersById.get('moon/altitude');
  moon_alt.value=planets['moon']['position']['horizontal']['altitude']['degrees'];
  console.log("moon altitude: " + moon_alt.value);

  const moon_az=device.parametersById.get('moon/azimuth');
  moon_az.value=planets['moon']['position']['horizontal']['azimuth']['degrees'];
  console.log("moon azimuth: " + moon_az.value);

  const moon_temp=device.parametersById.get('moon/maxtemp');
  moon_temp.value=2000+ Math.random()*10000;
  console.log("moon tempo: " + moon_temp.value);

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

  const mercury_alt=device.parametersById.get('mercury/altitude');
  mercury_alt.value=planets['mercury']['position']['horizontal']['altitude']['degrees'];
  console.log("mercury altitude: " + mercury_alt.value);

  const mercury_az=device.parametersById.get('mercury/azimuth');
  mercury_az.value=planets['mercury']['position']['horizontal']['azimuth']['degrees'];
  console.log("mercury azimuth: " + mercury_az.value);

  const mercury_temp=device.parametersById.get('mercury/tempo');
  mercury_temp.value=100 + Math.random()*400;
  console.log("mercury tempo: " + mercury_temp.value);

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
  }else{
      mercury_onoff.value=0;
      console.log('mercury off');
  }

  const venus_mag=device.parametersById.get('venus/magnitude');
  venus_mag.value=planets['venus']['extraInfo']['magnitude'];
  console.log("venus magnitude: " + venus_mag.value);

  const venus_elong=device.parametersById.get('venus/elongation');
  venus_elong.value=planets['venus']['extraInfo']['elongation'];
  console.log("venus elongation: " + venus_elong.value);

  const venus_alt=device.parametersById.get('venus/altitude');
  venus_alt.value=planets['venus']['position']['horizontal']['altitude']['degrees'];
  console.log("venus altitude: " + venus_alt.value);

  const venus_az=device.parametersById.get('venus/azimuth');
  venus_az.value=planets['venus']['position']['horizontal']['azimuth']['degrees'];
  console.log("venus azimuth: " + venus_az.value);

  const venus_temp=device.parametersById.get('venus/tempo');
  venus_temp.value=500 + Math.random()*2500;
  console.log("venus tempo: " + venus_temp.value);

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
  }else{
      venus_onoff.value=0;
      console.log('venus off')
  }

  const date=new Date();
  const sun_month=device.parametersById.get('sun/month');
  sun_month.value=date.getMonth() + 1;
  console.log(sun_month.value);

  const sun_alt=device.parametersById.get('sun/altitude');
  sun_alt.value=planets['sun']['position']['horizontal']['altitude']['degrees'];
  console.log("sun altitude: " + sun_alt.value);

  const sun_az=device.parametersById.get('sun/azimuth');
  sun_az.value=planets['sun']['position']['horizontal']['azimuth']['degrees'];
  console.log("sun azimuth: " + sun_az.value);

  const sun_attack=device.parametersById.get('sun/attack');
  sun_attack.value=50 + Math.random()*4900;
  console.log("sun attack: " + sun_attack.value);

  const sun_decay=device.parametersById.get('sun/decay');
  sun_decay.value=400 + Math.random()*5600;
  console.log("sun decay: " + sun_decay.value);

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
      console.log('sun on')
  }else{
      sun_onoff.value=0;
      console.log('sun off')
  }

  const mars_mag=device.parametersById.get('mars/magnitude');
  mars_mag.value=planets['mars']['extraInfo']['magnitude'];
  console.log("mars magnitude: " + mars_mag.value);

  const mars_elong=device.parametersById.get('mars/elongation');
  mars_elong.value=planets['mars']['extraInfo']['elongation'];
  console.log("mars elongation: " + mars_elong.value);

  const mars_alt=device.parametersById.get('mars/altitude');
  mars_alt.value=planets['mars']['position']['horizontal']['altitude']['degrees'];
  console.log("mars altitude: " + mars_alt.value);

  const mars_az=device.parametersById.get('mars/azimuth');
  mars_az.value=planets['mars']['position']['horizontal']['azimuth']['degrees'];
  console.log("mars azimuth: " + mars_az.value);

  const mars_temp=device.parametersById.get('mars/tempo');
  mars_temp.value=100 + Math.random()*400;
  console.log("mars tempo: " + mars_temp.value);

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
      console.log('mars on')
  }else{
      mars_onoff.value=0;
      console.log('mars off')
  }

  const jupiter_mag=device.parametersById.get('jupiter/magnitude');
  jupiter_mag.value=planets['jupiter']['extraInfo']['magnitude'];
  console.log("jupiter magnitude: " + jupiter_mag.value);

  const jupiter_elong=device.parametersById.get('jupiter/elongation');
  jupiter_elong.value=planets['jupiter']['extraInfo']['elongation'];
  console.log("jupiter elongation: " + jupiter_elong.value);

  const jupiter_alt=device.parametersById.get('jupiter/altitude');
  jupiter_alt.value=planets['jupiter']['position']['horizontal']['altitude']['degrees'];
  console.log("jupiter alt: " + jupiter_alt.value);

  const jupiter_az=device.parametersById.get('jupiter/azimuth');
  jupiter_az.value=planets['jupiter']['position']['horizontal']['azimuth']['degrees'];
  console.log("jupiter azimuth: " + jupiter_az.value);

  const jupiter_temp=device.parametersById.get('jupiter/tempo');
  jupiter_temp.value=1000 + Math.random()*3000;
  console.log("jupiter tempo: " + jupiter_temp.value);

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
      console.log('jupiter on')
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

  const saturn_alt=device.parametersById.get('saturn/altitude');
  saturn_alt.value=planets['saturn']['position']['horizontal']['altitude']['degrees'];
  console.log("saturn altitude: " + saturn_alt.value);

  const saturn_az=device.parametersById.get('saturn/azimuth');
  saturn_az.value=planets['saturn']['position']['horizontal']['azimuth']['degrees'];
  console.log("saturn azimuth: " + saturn_az.value);

  const saturn_temp=device.parametersById.get('saturn/tempo');
  saturn_temp.value=100 + Math.random()*1900;
  console.log("saturn tempo: " + saturn_temp.value);

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
      console.log('saturn on')
  }else{
      saturn_onoff.value=0;
      console.log('saturn off')
  }

  const uranus_mag=device.parametersById.get('uranus/magnitude');
  uranus_mag.value=planets['uranus']['extraInfo']['magnitude'];
  console.log("uranus magnitude: " + uranus_mag.value);

  const uranus_elong=device.parametersById.get('uranus/elongation');
  uranus_elong.value=planets['uranus']['extraInfo']['elongation'];
  console.log("uranus elongation: " + uranus_elong.value);

  const uranus_alt=device.parametersById.get('uranus/altitude');
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
      console.log('uranus on')
  }else{
      uranus_onoff.value=0;
      console.log('uranus off')
  }

  const neptune_mag=device.parametersById.get('neptune/magnitude');
  neptune_mag.value=planets['neptune']['extraInfo']['magnitude'];
  console.log("neptune magnitude: " + neptune_mag.value);

  const neptune_elong=device.parametersById.get('neptune/elongation');
  neptune_elong.value=planets['neptune']['extraInfo']['elongation'];
  console.log("neptune elongation: " + neptune_elong.value);

  const neptune_alt=device.parametersById.get('neptune/altitude');
  neptune_alt.value=planets['neptune']['position']['horizontal']['altitude']['degrees'];
  console.log("neptune altitude: " + neptune_alt.value);

  const neptune_az=device.parametersById.get('neptune/azimuth');
  neptune_az.value=planets['neptune']['position']['horizontal']['azimuth']['degrees'];
  console.log("neptune azimuth: " + neptune_az.value);

  const neptune_temp=device.parametersById.get('neptune/tempo');
  neptune_temp.value=100 + Math.random()*1900;
  console.log("neptune tempo: " + neptune_temp.value);

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
      console.log('neptune on')
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

  const pluto_alt=device.parametersById.get('pluto/altitude');
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
      console.log('pluto on')
  }else{
      pluto_onoff.value=0;
      console.log('pluto off')
  }

}

setup();
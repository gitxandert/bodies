let obj;

let planets={
  sun:{},moon:{},mercury:{},venus:{},earth:{},mars:{},jupiter:{},saturn:{},uranus:{},neptune:{},pluto:{},
};

const authString = btoa(`503cdb54-f704-4fae-95d6-172e39e08c82:2cb502c8fb6d3ed668fc3636bb6927f99ec4d08d90260bfc1528cd512104cdb23634b3eec5651c7deff6f2bf9a3a2b8b5a23e731251a14002bbae52f75e90182a5c42e4e14f34b8376433d43077959cb2de68b3ffe767e8ece0301ea42ee0414a268489223afde73dde172cc3ea9c270`);
async function getPlanets(){

  const date = new Date();
  let month= date.getMonth()+1;
  if(month<10){
    month=`0${month}`;
  }
  let day= date.getDate();
  if(day<10){
    day=`0${day}`;
  }
  let year=date.getFullYear();
  let todays_date=`${year}-${month}-${day}`;
  console.log(todays_date);
  
  let hour=date.getHours();
  if(hour<10){
    hour=`0${hour}`;
  }
  let minute=date.getMinutes();
  if(minute<10){
    minute=`0${minute}`;
  }
  let the_hour=`${hour}:${minute}:00`;
  console.log(the_hour);

  const res = await fetch("https://api.astronomyapi.com/api/v2/bodies/positions?" + new URLSearchParams({
    "latitude": '39.163587',
    "longitude": '-86.499374',
    "elevation": '0',
    "from_date": todays_date,
    "to_date": todays_date,
    "time": the_hour
  }).toString()
    , {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authString}`,
      }
    });

  obj = await res.json();

  //altitude = -90 (invisible) to 90 (visible)
  //azimuth = 0-180 (rising) 180-360 (setting)
  //88 constellations!!! make list, figure out what to do with them :P
  //planets can be melodies or something; 88 constellations can be particular tunings (if RNBO doesn't flip out...)
  
  let i=0;

  for(let key in planets){
    planets[key]=obj.data.table.rows[i].cells[0];
    i++;
  }

  return planets;
}
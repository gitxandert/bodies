# bodies

This website is a thesis presented in partial fulfillment of a Master's in Computer Music Degree at Indiana University's Jacobs School of Music. It utilizes Max MSP's RNBO package to generate audio within a web browser. When a geographic location is provided, this site requests astronomical data from Astronomy API based on the time of day and provided geographical coordinates. This data is sent into a RNBO patch that turns on and sets the state of custom instruments according to which planets are currently visible at the provided location. Some of this data varies by location, some by time of day, month, or year, and some even by much longer celestial cycles and distances, such as a planet's distance from Earth. Although this data is technically immutable, most of it is only used to initalize the RNBO instruments. Users are at perfect liberty to modify these intial settings by double-clicking on a planet and experimenting with the provided parameters of its corresponding instrument. Moving a planet up and down changes the volume of its RNBO companion, so that users can isolate and mix collections of instruments according to their tastes. However, despite being subject to the heavens' machinations and users' whims, these instruments run through their own idiosyncratic pitch and rhythmic content independently, so that, once initialized or set, they generate new musical content freely, wandering through permutations and into patterns without any external guidance whatsoever. With so much flexibility and determinism, there are yet parameters and aspects of the instruments that can only be revealed through repeated visits to this site, which will (hopefully) entice users to check back in every once in a while and hear how the planets have changed. In addition to basic HTML, CSS, and Javascript methods, this website also uses p5, a JavaScript library, to generate its graphics and user interface. The source code for all of this website's material, including a Max patch for testing and perusing the RNBO instruments, is available at https://github.com/gitxandert/bodies.

-Alexander Toth, December 2023
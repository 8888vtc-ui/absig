
const fs = require('fs');

const text = `
N."
1 Utilisez-vous les médias (ournaux, radios, TV) comme canaux
d'informations réguliers ?
2 Acceptez-vous facilement I'autorité d'un supérieur ?
3 Vous arrive-t-il de faire des erreurs ?
4 Avez-vous des doutes concernant votre avenir professionnel ?
5 Vivez-vous au dessus de vos moyens ?
6 Etes-vous irrité par le bruit que peuvent faire des enfants, des
voitures, des rires.., ?
... (lots of questions) ...
P-5/+10/+5 c +10/0/-5 A +10/+5/-10
...
`; // I will use the actual text from the user's message here

// Logic to extract N, Dimension, and values
// triplets: OUI / PM / NON

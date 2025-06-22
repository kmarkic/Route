index.js


//Ovdje pišemo jednostavni backend
import express from "express";

const app = express(); //
const port = 3000; // port se isto tako neće mijenjati
//imaplementiramo jednostavnu rutu i kada god dode na home rutu
// ono sto zelimo je da se pokrene u ovom drugom parametru zelimo napisat javascript funkciju
// koja ce primati 2 parametra

app.get("/", (req, res) => {
  //tijelo funkcije
  //res ima nekoliko metoda 2 metode, najvaznije su send i json

  //da bi pristupili parametrima mozemo se koristiti requestom objektom
  //na nacin da req obj. u sebi sadrze nekakve dodatne info
  console.log(req.query); //to je objekt koji sadrzi sve parametre
  res.send("Hello world u browser"); //send koristimo kada hocemo poslati nekakav string
  console.log("Hello world"); //console.log ce ispisati u konzolu
});

//Nakon sto smo definirali sto se ima dogoditi kada browser uputi get request
//a to su ove dvije linije koda
//Nakon toga mozemo pokrenuti nasu aplikaciju na portu
app.listen(port, () => console.log(`Slušam na portu ${port}!`));

//intepolacija stringa -> $ {port}
//To znači da određenu varijablu, poput port omotati s $ i {}
// i da se one automatski zaljepe u ovaj string
//međutim da bi to funkcioniralo moramo staviti back tick navodnike
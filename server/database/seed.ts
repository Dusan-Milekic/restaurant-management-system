import {prisma} from "../lib/prisma"


async function main() {
  // Kategorije
  await prisma.kategorijaMeni.createMany({
    data: [
      { nazivKategorije: "Predjela" },
      { nazivKategorije: "Supe i čorbe" },
      { nazivKategorije: "Salate" },
      { nazivKategorije: "Testa i rižota" },
      { nazivKategorije: "Riba i morski plodovi" },
      { nazivKategorije: "Roštilj" },
      { nazivKategorije: "Glavna jela" },
      { nazivKategorije: "Deserti" },
      { nazivKategorije: "Bezalkoholna pića" },
      { nazivKategorije: "Alkoholna pića" },
    ],
  })

  const kategorije = await prisma.kategorijaMeni.findMany()
  const k = Object.fromEntries(kategorije.map(k => [k.nazivKategorije, k.id]))

  await prisma.meni.createMany({
    data: [
      // Predjela (15)
      { naziv: "Bruschetta sa paradajzom", cena: 550, kategorijaId: k["Predjela"] },
      { naziv: "Carpaccio od govedine", cena: 950, kategorijaId: k["Predjela"] },
      { naziv: "Pršuta sa dinjom", cena: 850, kategorijaId: k["Predjela"] },
      { naziv: "Gambori na žaru", cena: 1200, kategorijaId: k["Predjela"] },
      { naziv: "Tatarski biftek", cena: 1100, kategorijaId: k["Predjela"] },
      { naziv: "Pate od pačje jetre", cena: 750, kategorijaId: k["Predjela"] },
      { naziv: "Lignje na žaru", cena: 900, kategorijaId: k["Predjela"] },
      { naziv: "Dimljeni losos", cena: 1050, kategorijaId: k["Predjela"] },
      { naziv: "Punjene paprike (hladno)", cena: 650, kategorijaId: k["Predjela"] },
      { naziv: "Kozji sir sa medom", cena: 700, kategorijaId: k["Predjela"] },
      { naziv: "Tabule salata", cena: 550, kategorijaId: k["Predjela"] },
      { naziv: "Hummus sa pitom", cena: 500, kategorijaId: k["Predjela"] },
      { naziv: "Burrata sa paradajzom", cena: 900, kategorijaId: k["Predjela"] },
      { naziv: "Školjke na buzari", cena: 1150, kategorijaId: k["Predjela"] },
      { naziv: "Mini kroketi od sira", cena: 600, kategorijaId: k["Predjela"] },

      // Supe i čorbe (10)
      { naziv: "Čorba dana", cena: 450, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Riblja čorba", cena: 650, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Krem čorba od pečuraka", cena: 550, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Krem čorba od paradajza", cena: 500, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Teleća čorba", cena: 600, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Minestrone", cena: 550, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Krem čorba od bundeve", cena: 520, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Francuska luk supa", cena: 650, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Gazpacho", cena: 580, kategorijaId: k["Supe i čorbe"] },
      { naziv: "Krem čorba od špargle", cena: 620, kategorijaId: k["Supe i čorbe"] },

      // Salate (10)
      { naziv: "Cezar salata", cena: 850, kategorijaId: k["Salate"] },
      { naziv: "Grčka salata", cena: 750, kategorijaId: k["Salate"] },
      { naziv: "Rukola sa parmezanom", cena: 700, kategorijaId: k["Salate"] },
      { naziv: "Niçoise salata", cena: 900, kategorijaId: k["Salate"] },
      { naziv: "Kaprese", cena: 800, kategorijaId: k["Salate"] },
      { naziv: "Zelena mešana salata", cena: 550, kategorijaId: k["Salate"] },
      { naziv: "Salata sa kozjim sirom", cena: 850, kategorijaId: k["Salate"] },
      { naziv: "Salata od cvekle i oraha", cena: 700, kategorijaId: k["Salate"] },
      { naziv: "Waldorf salata", cena: 780, kategorijaId: k["Salate"] },
      { naziv: "Salata od hobotnice", cena: 1100, kategorijaId: k["Salate"] },

      // Testa i rižota (15)
      { naziv: "Tagliatelle sa tartufima", cena: 1650, kategorijaId: k["Testa i rižota"] },
      { naziv: "Spaghetti Carbonara", cena: 1200, kategorijaId: k["Testa i rižota"] },
      { naziv: "Penne Arrabbiata", cena: 1050, kategorijaId: k["Testa i rižota"] },
      { naziv: "Linguine sa školjkama", cena: 1450, kategorijaId: k["Testa i rižota"] },
      { naziv: "Ravioli sa ricottom", cena: 1300, kategorijaId: k["Testa i rižota"] },
      { naziv: "Gnocchi sa gorgonzolom", cena: 1250, kategorijaId: k["Testa i rižota"] },
      { naziv: "Rižoto sa pečurkama", cena: 1350, kategorijaId: k["Testa i rižota"] },
      { naziv: "Rižoto sa škampima", cena: 1600, kategorijaId: k["Testa i rižota"] },
      { naziv: "Rižoto sa šparglom", cena: 1400, kategorijaId: k["Testa i rižota"] },
      { naziv: "Lasagne Bolognese", cena: 1300, kategorijaId: k["Testa i rižota"] },
      { naziv: "Fettuccine Alfredo", cena: 1100, kategorijaId: k["Testa i rižota"] },
      { naziv: "Pappardelle sa divljači", cena: 1700, kategorijaId: k["Testa i rižota"] },
      { naziv: "Tortelini u supi", cena: 1150, kategorijaId: k["Testa i rižota"] },
      { naziv: "Crni rižoto", cena: 1500, kategorijaId: k["Testa i rižota"] },
      { naziv: "Spaghetti Aglio e Olio", cena: 950, kategorijaId: k["Testa i rižota"] },

      // Riba i morski plodovi (15)
      { naziv: "Filet od lososa", cena: 1850, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Brancin na žaru", cena: 2100, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Orada u soli", cena: 2200, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Tuna odrezak", cena: 2400, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Škampi na buzari", cena: 1900, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Hobotnica sa krumpirom", cena: 1750, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Lignje punjene sirom", cena: 1600, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Školjke sa belim vinom", cena: 1400, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Bakalar na bijelo", cena: 1650, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Gambori u umaku od belog luka", cena: 1800, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Riblja plata (za 2)", cena: 4500, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Filet od soma", cena: 1550, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Pastrmka na žaru", cena: 1700, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Jastog na žaru", cena: 5500, kategorijaId: k["Riba i morski plodovi"] },
      { naziv: "Smuđ u rerni", cena: 1800, kategorijaId: k["Riba i morski plodovi"] },

      // Roštilj (15)
      { naziv: "Biftek sa roštilja 300g", cena: 2400, kategorijaId: k["Roštilj"] },
      { naziv: "Ribeye odrezak 350g", cena: 3200, kategorijaId: k["Roštilj"] },
      { naziv: "T-bone steak 400g", cena: 3800, kategorijaId: k["Roštilj"] },
      { naziv: "Jagnjećа kotleta", cena: 2200, kategorijaId: k["Roštilj"] },
      { naziv: "Pileći file na žaru", cena: 1400, kategorijaId: k["Roštilj"] },
      { naziv: "Ćevapi (10 kom)", cena: 1100, kategorijaId: k["Roštilj"] },
      { naziv: "Pljeskavica specijalitet", cena: 1200, kategorijaId: k["Roštilj"] },
      { naziv: "Mešano meso sa žara", cena: 1800, kategorijaId: k["Roštilj"] },
      { naziv: "Svinjski vrat na žaru", cena: 1350, kategorijaId: k["Roštilj"] },
      { naziv: "Roštilj plata (za 2)", cena: 4200, kategorijaId: k["Roštilj"] },
      { naziv: "Kobasice domaće", cena: 1050, kategorijaId: k["Roštilj"] },
      { naziv: "Teleći medaljoni", cena: 2600, kategorijaId: k["Roštilj"] },
      { naziv: "Pačja prsa na žaru", cena: 2100, kategorijaId: k["Roštilj"] },
      { naziv: "Šiš ćevap", cena: 1500, kategorijaId: k["Roštilj"] },
      { naziv: "Burger specijalitet", cena: 1300, kategorijaId: k["Roštilj"] },

      // Glavna jela (20)
      { naziv: "Piletina u sosu od pečuraka", cena: 1450, kategorijaId: k["Glavna jela"] },
      { naziv: "Teleći medaljoni u sosu", cena: 2200, kategorijaId: k["Glavna jela"] },
      { naziv: "Pačja prsa sa narandžom", cena: 2100, kategorijaId: k["Glavna jela"] },
      { naziv: "Jagnjeći but u rerni", cena: 2400, kategorijaId: k["Glavna jela"] },
      { naziv: "Svinjska rebra u BBQ sosu", cena: 1700, kategorijaId: k["Glavna jela"] },
      { naziv: "Punjene tikvice", cena: 1200, kategorijaId: k["Glavna jela"] },
      { naziv: "Musaka", cena: 1300, kategorijaId: k["Glavna jela"] },
      { naziv: "Sarma domaća", cena: 1100, kategorijaId: k["Glavna jela"] },
      { naziv: "Punjeni šampinjoni", cena: 1150, kategorijaId: k["Glavna jela"] },
      { naziv: "Bečka šnicla", cena: 1600, kategorijaId: k["Glavna jela"] },
      { naziv: "Cordon Bleu", cena: 1550, kategorijaId: k["Glavna jela"] },
      { naziv: "Piletina Marsala", cena: 1500, kategorijaId: k["Glavna jela"] },
      { naziv: "Osso Buco", cena: 2300, kategorijaId: k["Glavna jela"] },
      { naziv: "Svinjski medaljoni sa suvim šljivama", cena: 1650, kategorijaId: k["Glavna jela"] },
      { naziv: "Gulaš teleći", cena: 1400, kategorijaId: k["Glavna jela"] },
      { naziv: "Coq au Vin", cena: 1750, kategorijaId: k["Glavna jela"] },
      { naziv: "Punjeni pileći file sa sirom", cena: 1450, kategorijaId: k["Glavna jela"] },
      { naziv: "Đuveč sa mesom", cena: 1300, kategorijaId: k["Glavna jela"] },
      { naziv: "Pileći paprikaš", cena: 1250, kategorijaId: k["Glavna jela"] },
      { naziv: "Svinjska koljenica", cena: 1900, kategorijaId: k["Glavna jela"] },

      // Deserti (15)
      { naziv: "Crème brûlée", cena: 650, kategorijaId: k["Deserti"] },
      { naziv: "Fondant od čokolade", cena: 700, kategorijaId: k["Deserti"] },
      { naziv: "Tiramisu", cena: 680, kategorijaId: k["Deserti"] },
      { naziv: "Panna cotta sa jagodama", cena: 620, kategorijaId: k["Deserti"] },
      { naziv: "Cheesecake", cena: 650, kategorijaId: k["Deserti"] },
      { naziv: "Sladoled (3 kugле)", cena: 450, kategorijaId: k["Deserti"] },
      { naziv: "Profiterole", cena: 600, kategorijaId: k["Deserti"] },
      { naziv: "Mousse od čokolade", cena: 580, kategorijaId: k["Deserti"] },
      { naziv: "Baklava", cena: 500, kategorijaId: k["Deserti"] },
      { naziv: "Voćna salata", cena: 550, kategorijaId: k["Deserti"] },
      { naziv: "Palačinke sa nutellom", cena: 580, kategorijaId: k["Deserti"] },
      { naziv: "Opera torta", cena: 720, kategorijaId: k["Deserti"] },
      { naziv: "Sufle od limuna", cena: 680, kategorijaId: k["Deserti"] },
      { naziv: "Brownie sa sladoledom", cena: 650, kategorijaId: k["Deserti"] },
      { naziv: "Tartuf kolač", cena: 700, kategorijaId: k["Deserti"] },

      // Bezalkoholna pića (20)
      { naziv: "Voda 0.25l", cena: 120, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Voda 0.5l", cena: 180, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Voda 1l", cena: 280, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Gazirana voda 0.25l", cena: 130, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Gazirana voda 0.5l", cena: 200, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Coca Cola 0.33l", cena: 220, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Coca Cola 0.5l", cena: 300, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Fanta 0.33l", cena: 220, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Sprite 0.33l", cena: 220, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Sok od narandže svež", cena: 350, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Limonada domaća", cena: 320, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Ledeni čaj", cena: 250, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Espresso", cena: 180, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Cappuccino", cena: 220, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Latte macchiato", cena: 250, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Čaj (selekcija)", cena: 200, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Sok od jabuke", cena: 230, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Sok od višnje", cena: 230, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Energy drink", cena: 350, kategorijaId: k["Bezalkoholna pića"] },
      { naziv: "Smoothie dana", cena: 380, kategorijaId: k["Bezalkoholna pića"] },

      // Alkoholna pića (15)
      { naziv: "Pivo domaće 0.5l", cena: 300, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Pivo uvozno 0.33l", cena: 350, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Belo vino čaša", cena: 350, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Crveno vino čaša", cena: 380, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Roze vino čaša", cena: 350, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Vino belo 0.75l (flaša)", cena: 1800, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Vino crveno 0.75l (flaša)", cena: 2000, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Prosecco čaša", cena: 450, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Rakija šljivovica", cena: 300, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Rakija lozovača", cena: 280, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Viski 4cl", cena: 550, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Gin tonic", cena: 650, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Aperol spritz", cena: 600, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Mojito", cena: 700, kategorijaId: k["Alkoholna pića"] },
      { naziv: "Champagne čaša", cena: 900, kategorijaId: k["Alkoholna pića"] },
    ],
  })

  console.log("Seeder završen — 150 proizvoda dodato!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
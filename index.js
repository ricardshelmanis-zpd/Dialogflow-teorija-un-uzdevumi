const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

 function geo() {
  var temas = agent.parameters.geometrija;
  let linija1 ="";
  let linija2 ="";
  let linija3 ="";
   switch(temas){
     case 'punkts':
       linija1 = "Matemātikas jēdzienu PUNKTS var iztēloties kā vissīkāko puteklīti. Ja pie papīra lapas pieskaras ar noasinātu zīmuli, iegūst PUNKTU (to var apzīmēt arī ar mazu krustiņu).";
       linija2 = "Punkts no punkta atšķiras tikai ar to atrašanās vietām. Punktus apzīmē ar alfabēta lielajiem burtiem, piemēram, punkts A, punkts B.";
       linija3 = "Vai tu vēlies izpildīt uzdevumu par šo tēmu? Ja jā, tad atbildē raksti 'jā, punkts'.";
       break;
     case 'taisne':
       linija1 = "TAISNE ir bezgalīga, tai nav galapunktu. TAISNE līdzinās tievam, ļoti stingri nostieptam diegam.";
       linija2 = "Taisni apzīmē ar diviem lielajiem burtiem vai ar vienu mazo burtu. Piemēram, taisne CD vai taisne a.";
       linija3 = "Vai tu vēlies izpildīt uzdevumu par šo tēmu? Ja jā, tad atbildē raksti 'jā, taisne'.";
       break;
     case 'nogrieznis':
       linija1 = "NOGRIEZNIM ir divi galapunkti. NOGRIEZNIS ir taisnes daļa starp diviem taisnes punktiem.";
       linija2 = "To apzīmē ar diviem lielajiem burtiem nogriežņa galapunktos vai ar vienu mazo burtu. Piemēram, nogrieznis PR vai nogrieznis b.";
       linija3 = "Vai tu vēlies izpildīt uzdevumu par šo tēmu? Ja jā, tad atbildē raksti 'jā, nogrieznis'.";
       break;
     case 'stars':
       linija1 = "STARAM ir sākumpunkts, bet nav galapunkta. STARS ir no vienas puses ierobežota taisnes daļa.";
       linija2 = "Staru apzīmē ar diviem lielajiem burtiem, no kuriem pimais apzīmē sākumpunktu un otrais burts atrodas jebkur uz stara, vai ar vienu mazo burtu. Piemēram, stars ST vai stars b.";
       linija3 = "Vai tu vēlies izpildīt uzdevumu par šo tēmu? Ja jā, tad atbildē raksti 'jā, stars'.";
       break;
     case 'lauzta līnija':
       linija1 = "LAUZTU LĪNIJU veido divi vai vairāki ar galapunktiem savienoti nogriežņi (lauztās līnijas posmi). Piemēram, lauzta līnija CDEFG.";
       linija2 = "Ja lauztas līnijas galapunkti sakrīt, tad veidojas SLĒGTA LAUZTA LĪNIJA. Piemēram, slēgta lauzta līnija ABCDEFA.";
       linija3 = "Vai tu vēlies izpildīt uzdevumu par šo tēmu? Ja jā, tad atbildē raksti 'jā, lauzta līnija'.";
       break;
     case 'leņķis':
       linija1 = "Lai labāk iztēlotos, kas ir leņķis paņem zīmuli, lineālu un papīra lapu. Jebkur uz lapas atliec punktu O, tad no šī punkta O novelc divus starus OA un OB, lai tie nekrustotos. To daļu, kas atrodas starp abiem stariem sauc par LEŅĶI. Punkts O ir leņķa virsotne un stari OA un OB ir leņķa malas. Izveidotā leņķa nosaukums ir leņķis AOB.";
       linija2 = "Mūsu apkārtnē visbiežāk ir vērojami tādi leņķi kā burtnīcas lapas stūris, galda stūris vai tāfeles stūris. Šādus leņķus sauc par TAISNIEM LEŅĶIEM. No tiem atšķirīgi leņķi ir vai nu ŠAURI leņķi, vai PLATI leņķi.";
       linija3 = "Vai tu vēlies izpildīt uzdevumu par šo tēmu? Ja jā, tad atbildē raksti 'jā, leņķis'.";
       break;
     case 'daudzstūris':
       linija1 = "Plaknes daļu, ko ierobežo slēgta lauzta līnija, sauc par DAUDZSTŪRI. Dažiem daudzstūriem piešķir arī īpašus nosaukumus.";
       linija2 = "TAISNSTŪRIS - četrstūris, kuram visi leņķi ir taisni. KVADRĀTS - taisnstūris, kuram visas malas ir vienāda garuma. TAISNLEŅĶA TRIJSTŪRIS - trijstūris, kuram viens leņķis ir taisns. Daudzstūra visu malu garumu summu sauc par PERIMETRU (apkārtmēru).";
       linija3 = "Vai tu vēlies izpildīt uzdevumu par šo tēmu? Ja jā, tad atbildē raksti 'jā, daudzstūris'.";
       break;
     case 'laukums':
       linija1 = "Figūru laukumus var mērīt dažādās mērvienībās. Tas var būt kvadrātmilimetros (mm2), kvadrātcentimetros (cm2), kvadrātdecimetros, kvadrātmetros (m2) un kvadrātkilometros (km2). 1cm2 = 100mm2, 1dm2 = 100cm2, 1m2 = 100dm2, 1m2 = 10000cm2.";
       linija2 = "TAISNSTŪRA LAUKUMU aprēķina, sareizinot tā garumu un platumu. Laukumu ir pieņemts apzīmēt ar burtu S. Piemēram, ja taisnstūra garums ir 9 cm un platums ir 5 cm, tad taisnstūra laukums: S = 9*5 = 45 (cm2).";
       linija3 = "Vai tu vēlies izpildīt uzdevumu par šo tēmu? Ja jā, tad atbildē raksti 'jā, laukums'.";
       break;
     case 'riņķa līnija':
       linija1 = "Lai izprastu, kā riņķa līnija atšķiras no riņķa, palūgšu tevi paņemt zīmuli, cirkuli un papīra lapu. Uz papīra lapas atzīmē punktu O - riņķa līnijas centru, liec cirkuļa aso kājiņu punktā un novelc riņķa līniju.";
       linija2 = "Uzzīme otru riņķa līniju ar citu punktu un šoreiz tās iekšpusi izkrāso, tagad esi ieguvis riņķi.";
       linija3 = "Šai tēmai es nevaru piedāvāt uzdevumus. Ja tu vēlies atkārtot kādu citu tēmu, tad uzraksti tās nosaukumu, ja tu to nevēlies darīt atbildi man ar 'nē'.";
       break;
     case 'simetriskas figūras':
       linija1 = "Ja figūru var pārlocīt (īstenībā vai iztēlē) tā, lai tās abas puses sakrīt, tad tādu figūru sauc par SIMETRISKU figūru.";
       linija2 = "Locījuma līniju (taisni) sauc par SIMETRIJAS ASI.";
       linija3 = "Šai tēmai es nevaru piedāvāt uzdevumus. Ja tu vēlies atkārtot kādu citu tēmu, tad uzraksti tās nosaukumu, ja tu to nevēlies darīt atbildi man ar 'nē'.";
       break;
   }
agent.add(linija1);
agent.add(linija2);
agent.add(linija3);
   }
  
  function uzd() {
  var temas = agent.parameters.geometrija;
  let p = "";
    switch(temas){
     case 'punkts':
       p = "Atliec uz lapas divus punktus nosauc tos pareizi. Kad esi to izdarījis, atbildi 'pabeidzu'.";
       break;
     case 'taisne':
       p = "Novelc trīs taisnes, kas krustojas viena ar otru un nosauc tās pareizi. Kad esi to izdarījis, atbildi 'pabeidzu'.";
       break;
     case 'nogrieznis':
       p = "Novelc 5 cm garu nogriezni ar galapunktiem N un M. Kad esi to izdarījis, atbildi 'pabeidzu'.";
       break;
     case 'stars':
       p = "Atliec uz lapas vienu punktu U. No šī punkta novelc trīs starus, lai tie ir dažāda garuma un katrs iet citā virzienā. Pareizi nosauc starus . Kad esi to izdarījis, atbildi 'pabeidzu'.";
       break;
     case 'lauzta līnija':
       p = "Novelc lauztu līniju, kurai ir seši punkti. Nosauc punktus A, B, C, D, E, un F. Kad esi to izdarījis, atbildi 'pabeidzu'.";
       break;
     case 'leņķis':
       p = "Pamēģini savā rūtiņu kladē novilkt taisnu leņķi. Pareizi nosauc to. Kad esi to izdarījis, atbildi 'pabeidzu'.";
       break;
     case 'daudzstūris':
       p = "Uzzīmē kvadrātu, kura malas garums ir 4 cm. Aprēķini tā perimetru (atceries, lai izrēķinātu perimetru, ir jāsaskaita visi malu garumi kopā). Kad esi aprēķinājis perimetru, tad atbildē raksti 'P=?cm', jautājuma zīmes vietā ierakstot skaitli.";
       break;
     case 'laukums':
       p = "Uzzīmē taisnstūri, kura garums ir 10 cm un platums ir 2 cm. Aprēķini tā laukumu (sareizinot garumu un platumu). Kad esi aprēķinājis laukumu, tad atbildē raksti 'S=?cm2', jautājuma zīmes vietā ierakstot skaitli.";
       break;
     case 'riņķa līnija':
       p = "";
       break;
     case 'simetriskas figūras':
       p = "";
       break;
   }
agent.add(p);
  }
  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('izvele', geo);
  intentMap.set('uzdevums',uzd);
  agent.handleRequest(intentMap);
});

# Branching strategi

## Trunk based development 
I projektet er der anvendt en branching strategi der tager udgangspunkt i principperne fra trunk-based development. 

Hver udvikler har haft sin egen branch at arbejde ud fra, hvor features og komponenter er blevet uddelt internt i gruppen. Der er blevet merget til main ofte, for at undgå konflikter og for at sikre at kodebasen altid er stabil. 
Når en udvikler har merget til main, merger de main tilbage i deres egen branch, for at sikre at alle udviklere arbejder på den nyeste version af kodebasen. 

Denne strategi adskiller sig fra andre branching modeller, såsom GitHub Flow, ved at features ikke nødvendigvis først færdiggøres fuldt i en isoleret branch, før de merges. I stedet prioriteres hyppige merges til main, hvilket understøtter en mere kontinuerlig integration og reducerer risikoen for merge-konflikter. 

---

## Ideel trunk based development
Hvis projektet skulle have fulgt en helt korrekt implementering af trunk-based branching strategi, ville main branching være den eneste langt levende branch i udviklingen. 
Al udvikling ville ske i kortlivede branches, typisk kaldet feature branches, og ikke vores navne som i det nuværende projekt. 
Disse kortlevende branches ville indeholde små inkrementelle ændringer, frem for flere features og større funktioner. 
Ændringer ville merges til main gennem meget hyppige merges, og derefter ville branching blive slettet og erstattet af en ny til den næste mindre feature eller ændring.
Så helt overordnet ville vi have haft mange flere branches, navngivet efter features og slette dem løbende, og oftere merge ind i main. 

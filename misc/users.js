users = [
    {
      fname: "Kermit",
      lname: "the Frog",
      languages: ["Python", "JavaScript", "C#", "HTML", "CSS", "SQL"],
      interests: {
        music: ["guitar", "flute"],
        dance: ["tap", "salsa"],
        television: ["Black Mirror", "Stranger Things"]
      }
    },
    {
      fname: "Winnie",
      lname: "the Pooh",
      languages: ["Python", "Swift", "Java"],
      interests: {
        food: ["honey", "honeycomb"],
        flowers: ["honeysuckle"],
        mysteries: ["Heffalumps"]
      }
    },
    {
      fname: "Arthur",
      lname: "Dent",
      languages: ["JavaScript", "HTML", "Go"],
      interests: {
        space: ["stars", "planets", "improbability"],
        home: ["tea", "yellow bulldozers"]
      }
    }
  ]
  
  function printusers(users) { 
    for (var obj in users) {
        var sout1 = users[obj]['fname'] + " " + users[obj]['lname'] + " knows ";        
        for (lang in users[obj]['languages']) {
            if (lang==users[obj]['languages'].length-1) {
                sout1 += "and ";
                sout1 += users[obj]['languages'][lang]
                sout1 += ".";
            }
            else{
                sout1 += users[obj]['languages'][lang]
                sout1 += ", ";
            }
        }
        console.log(sout1);

        var inta = []
        var sout3 = users[obj]['fname'] + " is also interested in ";
        for (intr in users[obj]['interests']) {
            for (intx in users[obj]['interests'][intr]) {
                inta.push(users[obj]['interests'][intr][intx]);
            }
        }
        for (var str in inta) {
            if (str==inta.length-1) {
                sout3 += "and ";
                sout3 += inta[str]
                sout3 += ".";
            }
            else{
                sout3 += inta[str]
                sout3 += ", ";
            }
            
        }
        console.log(sout3);

    }
  }
  printusers(users);
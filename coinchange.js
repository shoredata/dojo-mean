function coinchange(change){
    var reg = [
        [0, 10000, 'Benjamins'], 
        [0, 5000, 'Grants'], 
        [0, 2000, 'Jacksons'], 
        [0, 1000, 'Someguys'], 
        [0, 500, 'Fiverr'], 
        [0, 100, 'Washingtons'], 
        [0, 25, 'Quarters'], 
        [0, 10, 'Dimes'], 
        [0, 5, 'Nickels'], 
        [0, 1, 'Pennies'] 
    ];
    var cents = change;
    // console.log("Starting with " + cents.toString());
    while(cents>0)
    {
        // console.log(cents);
        for (coin in reg){
            if (cents > 0){
                if (cents >= reg[coin][1]) {
                    reg[coin][0] = Math.floor(cents / reg[coin][1]);
                    cents -= reg[coin][0] * reg[coin][1];
                    // console.log("Used " +  reg[coin][0].toString() + " " + reg[coin][2] + " --> " + cents.toString() + " cents remaining");
                }
                else {
                    // console.log("cents too too small for coin: ", reg[coin][1])
                }
            }
        }
        cents = 0;
    }
    var amount = 0;
    for (coin in reg){
        if (reg[coin][0] > 0) {                
            console.log(reg[coin][0], reg[coin][1]/100, reg[coin][2]);
            amount += reg[coin][0] * reg[coin][1];
        }
    }
    var myvalue = amount/100;
    // console.log("Coins = " + change.toString())
    console.log("Starting with " + change.toString(), "Coins = " + myvalue.toString(), "\n\n");
}

for (var irand = 0; irand<10; irand++) {
    var amt = Math.floor(Math.random() * 20000) + 1;
    coinchange(amt);
}
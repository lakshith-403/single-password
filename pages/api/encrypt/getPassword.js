import CryptoJS from "crypto-js";

export default function handler(req, res) {

    function ascii (a) {
        return a.charCodeAt(0);
    }

    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }

    if(req.method !== "POST") {
        res.status(405).send("Method not allowed");
        return;
    }

    var hash = CryptoJS.SHA256(req.body.superPassword + req.body.increment + req.body.site).toString();

    var seedRandom = require('seedrandom');

    //turn some lowercase letters to uppercase letters
    for(var i = 0; i < hash.length; i++){
        var rng = seedRandom(hash[i]);
        if(ascii(hash[i]) >= 97 && ascii(hash[i]) <= 122){
            if(rng() > 0.5){
                hash = setCharAt(hash, i, hash[i].toUpperCase());
            }
        }
    }
    
    //turn some numbers into symbols
    const Symbols = "!@#$%^&*()_+{}[]|:;<>?,./!@#$%^&*()_+{}[]|:;<>?,./";
    for(var i=0; i < hash.length; i++){
        var rng = seedRandom(hash[i]);
        if(ascii(hash[i]) >= 48 && ascii(hash[i]) <= 57){
            if(rng() < 0.5){
                hash = setCharAt(hash, i, Symbols[Math.floor(rng() * Symbols.length)]);
            }
        }
    }

    // remove lower case letters
    if(!req.body.az){
        var temp = "";
        for(const c of hash){
            if(ascii(c) < 97 || ascii(c) > 122)
                temp += c;
        }  
        hash = temp;
    }

    //remove upper case letters
    if(!req.body.AZ){
        var temp = "";
        for(const c of hash)
            if(ascii(c) < 65 || ascii(c) > 90)
                temp += c;
        hash = temp;
    }

    //remove numbers
    if(!req.body.num){
        var temp = "";
        for(const c of hash)
            if(ascii(c) < 48 || ascii(c) > 57)
                temp += c;
        hash = temp;
    }

    //remove symbols
    if(!req.body.symbol){
        var temp = "";
        for(const c of hash)
            if((ascii(c) >= 48 && ascii(c) <= 57) || (ascii(c) >= 65 && ascii(c) <= 90) || (ascii(c) >= 97 && ascii(c) <= 122))
                temp += c;
        hash = temp;
    }

    var trimLength = req.body.length;
    var excess = ""

    //add a symbol if there isnt any
    if(req.body.symbol){
        var flag = false;
        for(const c of hash)
            if(!((ascii(c) >= 48 && ascii(c) <= 57) || (ascii(c) >= 65 && ascii(c) <= 90) || (ascii(c) >= 97 && ascii(c) <= 122)))
                flag = true;
        if(!flag){
            trimLength = trimLength - 1;
            excess += "!";
        }
    }

    //add a number if there isnt any
    if(req.body.num){
        var flag = false;
        for(const c of hash)
            if(!((ascii(c) < 48 || ascii(c) > 57)))
                flag = true;
        if(!flag){
            trimLength = trimLength - 1;
            excess += "1";
        }
    }

    //add a lowercase letter if there isnt any
    if(req.body.az){
        var flag = false;
        for(const c of hash)
            if(!(ascii(c) < 97 || ascii(c) > 122))
                flag = true;
        if(!flag){
            trimLength = trimLength - 1;
            excess += "i";
        }
    }

    //add a uppercase letter if there isnt any
    if(req.body.AZ){
        var flag = false;
        for(const c of hash)
            if(!(ascii(c) < 65 || ascii(c) > 90))
                flag = true;
        if(!flag){
            trimLength = trimLength - 1;
            excess += "I";
        }
    }
    

    //trim to the reuqired length
    var password = hash.toString().substring(0, trimLength);
    password += excess;

    console.log(password);

    res.status(200).json({ password: password});
}
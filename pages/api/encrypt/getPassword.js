import CryptoJS from "crypto-js";

export default function handler(req, res) {

    function ascii (a) {
        return a.charCodeAt(0);
    }

    function addUpperCase(a,seed){

    }

    function addSymbol(a,seed){

    }

    if(req.method !== "POST") {
        res.status(405).send("Method not allowed");
        return;
    }
    var hash = CryptoJS.SHA256(req.body.superPassword + req.body.increment).toString();
    
    const Symbols = "!@#$%^&*()_+{}[]|:;<>?,./";
    
    // console.log(hash);
    if(!req.body.az){
        var temp = "";
        for(const c of hash){
            if(ascii(c) < 97 || ascii(c) > 122)
                temp += c;
        }  
        hash = temp;
    }

    if(!req.body.Az){
        var temp = "";
        for(const c of hash)
            if(ascii(c) < 65 || ascii(c) > 90)
                temp += c;
        hash = temp;
    }

    if(!req.body.num){
        var temp = "";
        for(const c of hash)
            if(ascii(c) < 48 || ascii(c) > 57)
                temp += c;
        hash = temp;
    }

    if(!req.body.symbol){
        var temp = "";
        for(const c of hash)
            if((ascii(c) >= 48 && ascii(c) <= 57) || (ascii(c) >= 65 && ascii(c) <= 90) || (ascii(c) >= 97 && ascii(c) <= 122))
                temp += c;
        hash = temp;
    }
    var password = hash.toString().substring(0, req.body.length-3);
    
    console.log(password);
    console.log(password.length);
    res.status(200).json({ password: password});
}
import CryptoJS from "crypto-js";

export default function handler(req, res) {

    if(req.method !== "POST") {
        res.status(405).send("Method not allowed");
        return;
    }
    console.log(req.body.customLength);
    
    res.status(200).json({});
    // var hash = CryptoJS.SHA256(param);
    
    // res.status(200).json({ password: hash.toString()});
}
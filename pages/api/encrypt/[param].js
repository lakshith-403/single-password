import CryptoJS from "crypto-js";

export default function handler(req, res) {
    const {param} = req.query;
    
    var hash = CryptoJS.SHA256(param);
    
    res.status(200).json({ password: hash.toString()});
}
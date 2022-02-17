export default function handler(req, res) {
    const {site} = req.query;
    console.log(site);
    res.status(200).json({ password: site });
}
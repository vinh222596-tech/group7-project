import jwt from 'jsonwebtoken';
export const checkJWT = async (req, res, next) => { 
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, "group7");
        
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
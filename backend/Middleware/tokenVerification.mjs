import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenVerification = (req, res, next) => {
    try {

        if (req.headers?.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                req.user = decoded; // Attach decoded user data (e.g., email) to the request object
                next();
            } else {
                res.status(401).send({ status: 401, message: "Unauthorized Token" });
            }
        } else {
            res.status(401).send({ status: 401, message: "Unauthorized Access" });
        }
    } catch (err) {
        res.status(401).send({ err: err, status: 401, message: "Unauthorized Token" });
    }
};
export default tokenVerification;

// fetch("url",{
//     headers:{
//         "Authorization":"Barear token"
//     }
// })

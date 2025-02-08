
const checkAdminRoutes = (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).json("Access Denied, no user found");
        }
        if (req.user.role !== "Admin") {
            return res.status(403).json("Access Denied, Admin only");
        }
        next();
        
    } catch (error) {
        console.log("error in checkAdminRoutes middleware", error.message);
        return res.status(500).json(error.message);
        
    }
};

module.exports = checkAdminRoutes;
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); 
        next(); 
    } catch (error) {
        
        return res.status(400).json({
            status: "error",
            message: "Datos inválidos",
            details: error.errors.map(err => ({ campo: err.path[0], problema: err.message }))
        });
    }
};
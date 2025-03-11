export const roleAuth = (roles) => {  // Ahora acepta un array de roles
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userRoleUpperCase = req.user.role.toUpperCase();
        const rolesUpperCase = roles.map(r => r.toUpperCase()); // Convertimos todos los roles a mayúsculas

        if (!rolesUpperCase.includes(userRoleUpperCase)) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next(); // Si el rol está en la lista, pasa al siguiente middleware
    };
};

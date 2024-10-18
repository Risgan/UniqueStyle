const db = require('../config/firebaseConfig');

class UserRepository {
    // Crear un usuario
    async createUser(user) {
        const userRef = db.collection('users').doc(); // Genera un ID único para el usuario
        await userRef.set(user);
        return { id: userRef.id, ...user };
    }

    // Obtener todos los usuarios
    async getAllUsers() {
        const usersSnapshot = await db.collection('users').get();
        const users = [];
        usersSnapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return users;
    }

    // Obtener un usuario por ID
    async getUserById(id) {
        const userDoc = await db.collection('users').doc(id).get();
        if (!userDoc.exists) {
            throw new Error('User not found');
        }
        return { id: userDoc.id, ...userDoc.data() };
    }

    // Actualizar un usuario por ID
    async updateUser(id, updatedData) {
        const userRef = db.collection('users').doc(id);
        await userRef.update(updatedData);
        return { id, ...updatedData };
    }

    // Eliminar un usuario por ID
    async deleteUser(id) {
        const userRef = db.collection('users').doc(id);
        await userRef.delete();
        return { message: 'User deleted successfully' };
    }
}

module.exports = new UserRepository();

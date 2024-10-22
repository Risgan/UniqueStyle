// src/services/userService.js
const userRepository = require('../repositories/userRepository');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
const createUser = async ({ username, email, password }) => {
  // Crear una instancia del modelo con los datos proporcionados
  const saltRounds = 10;
  const passwordEncri = await bcrypt.hash(password, saltRounds);

  const user = new UserModel({ username, email, password: passwordEncri });
  
  // Llamar al repositorio para guardar el usuario en Firebase
  return await userRepository.createUser(user);
};

// Obtener todos los usuarios
const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  return await userRepository.getUserById(id);
};

// Actualizar un usuario
const updateUser = async (id, updatedData) => {
  return await userRepository.updateUserInFirebase(id, updatedData);
};

// Eliminar un usuario
const deleteUser = async (id) => {
  return await userRepository.deleteUserInFirebase(id);
};

module.exports = { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
};

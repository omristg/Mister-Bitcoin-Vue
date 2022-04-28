'use strict';

import { dbService } from './db.service.js';

const KEY = 'user';

export const userService = {
    query,
    getById,
    remove,
    save,
    getUser,
    getLoggedinUser,
    login,
    signup,
    logout,
    addMove
}

async function getUser() {
    return {
        name: 'David Shauli',
        coin: 100,
        moves: []
    }
}

async function query() {
    var users = await dbService.query(KEY)
    return users;
}

async function getById(id) {
    const user = await dbService.getById(KEY, id)
    if (!user) throw new Error('Unknown User')
    return user;
}

function remove(id) {
    return dbService.delete(KEY, id)
}

function save(user) {
    if (user._id) return dbService.put(KEY, user)
    else return dbService.post(KEY, user)
}

async function addMove(move, userId) {
    const user = await dbService.getById(KEY, userId)
    user.moves.push(move)
    user.coins -= move.amount
    const savedUser = await save(user)
    delete savedUser.password
    return savedUser

}


// AUTH

async function login(credentials) {
    try {
        const user = await _getByUsername(credentials.username)
        if (_matchCredentials(user, credentials)) {
            delete user.password
            _setLoggedinUser(user)
            return user
        }
        else throw new Error('Incorrect username or password')

    } catch (err) {
        throw err
    }
}


async function signup(user) {
    user = {
        ...user,
        coins: 100,
        moves: []
    }
    const signedupUser = await dbService.post(KEY, user)
    delete signedupUser.password
    _setLoggedinUser(signedupUser)
    return signedupUser
}

function getLoggedinUser() {
    const user = sessionStorage.getItem('loggedinUser')
    return JSON.parse(user)
}


function logout() {
    _setLoggedinUser(null)
}

// PRIVATE


async function _getByUsername(username) {
    const user = await dbService.getByUsername(KEY, username)
    if (!user) throw new Error('Incorrect username or password')
    return user;
}

function _setLoggedinUser(user) {
    const userJson = JSON.stringify(user)
    sessionStorage.setItem('loggedinUser', userJson)
}


function _matchCredentials(user, credentials) {
    if (user.username === credentials.username &&
        user.password === credentials.password) {
        return true
    } else return false
}



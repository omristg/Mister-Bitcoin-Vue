'use strict';

export const utils = {
    storeToStorage,
    loadFromStorage,
    getRandomInt,
    getRandomId,
    getFullDate
};

function storeToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null);
}
function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}


function getRandomId() {
    var pt1 = Date.now().toString(16);
    var pt2 = getRandomInt(1000, 9999).toString(16);
    var pt3 = getRandomInt(1000, 9999).toString(16);
    return `${pt3}-${pt1}-${pt2}`.toUpperCase();
}

function getRandomInt(num1, num2) {
    var max = (num1 >= num2) ? num1 + 1 : num2 + 1;
    var min = (num1 <= num2) ? num1 : num2;
    return (Math.floor(Math.random() * (max - min)) + min);
}

function getFullDate(timestamp) {
    const time = new Date(timestamp).toLocaleTimeString('he-IL')
    const date = new Date(timestamp).toLocaleDateString('he-IL', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    })
    return `${time} ${date}`
}
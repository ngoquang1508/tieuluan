// userName và password của Admin

export const accountAdmin = {
    gmail: 'contact@tuthien.com',
    userName: 'giamdoc',
    password: 'giamdoc',
}

export const accountAdminister = {
    userName: 'admin',
    password: 'admin',
}

export function createStorage(key) {
    const store = JSON.parse(localStorage.getItem(key)) || {};

    const save = () => {
        localStorage.setItem(key, JSON.stringify(store));
    };

    return {
        get(key) {
            return store[key];
        },
        set(key, value) {
            store[key] = value;
            save();
        },
        remove(key) {
            delete store[key];
            save();
        },
    };
}

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

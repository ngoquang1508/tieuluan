import { createStorage } from '../authJS/storage.js';

export async function getRegisterData() {
    const registerData = {
        gmail: null,
        account: null,
        password: null,
    };

    const getInputData = (selector) => {
        return new Promise((resolve) => {
            document.querySelector(selector).addEventListener('change', (e) => {
                resolve(e.target.value.trim());
            });
        });
    };

    const gmailStorage = createStorage('gmail_setting');
    const accountStorage = createStorage('account_setting');
    const passwordStorage = createStorage('password_setting');

    // Lấy Gmail
    registerData.gmail = await getInputData('#gmailRegister');
    gmailStorage.set('gmail', registerData.gmail);

    // Lấy tài khoản
    registerData.account = await getInputData('#usernameRegister');
    accountStorage.set('account', registerData.account);

    // Lấy mật khẩu
    registerData.password = await getInputData('#passwordRegister');
    passwordStorage.set('password', registerData.password);

    return registerData;
}

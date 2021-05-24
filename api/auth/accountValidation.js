module.exports = {
    accountValidation,
};

function accountValidation(account) {
    return Boolean(account.username && account.password && typeof account.password === "string")
}
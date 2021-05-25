// handles the import and the declaration in one line!
const router = require('express').Router();
const Account = require('../../database/accounts/Account');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');

const { accountValidation } = require('./accountValidation');


router.get('/', (req, res) => {
    res.json({
        param1: "/login requires a username and password",
        param2: "/register requires a username and password"
    })
})

router.post('/register', (req, res) => {
    const account = new Account({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    if(accountValidation(account)){
        const rounds = process.env.BCRYPT_ROUNDS || 10;
        const hash = bcrypt.hashSync(account.password, rounds);
        const hashemail = bcrypt.hashSync(account.email, rounds);
        account.password = hash;
        account.email = hashemail;
    }

    account.save()
        .then(data => {
            console.log('happy')
            res.json(data)
        })
        .catch(err => {
            console.log('sad')
            res.json({message: err})
        })
});

router.post('/login', async (req, res) => {
    const account = req.body;

    try {
        if(accountValidation(account)){
            const [query] = await Account.find({ username: account.username})
            if(query.username && bcrypt.compareSync(account.password, query.password)){
                const token = generateToken(account);
                res.json({message: "you did it!", token})
            } else {
                res.status(401).json({ message: "Invalid Credentials!"})
            }
        }
    } catch (err) {
        res.json({ message: err})
    }
})

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
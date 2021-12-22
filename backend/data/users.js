import bcrypt from 'bcryptjs';

const users = [
    {
        name : 'Admin user',
        email : 'admin@example.com',
        password : bcrypt.hashSync( "1234", 10),
        isAdmin : true
    },
    {
        name : 'Depa user',
        email : 'depa@example.com',
        password : bcrypt.hashSync( "1234", 10) ,
        isAdmin : false
    },
    {
        name : 'thakur user',
        email : 'thakur@example.com',
        password : bcrypt.hashSync( "1234", 10) ,
        isAdmin : false
    },

]

export default users;
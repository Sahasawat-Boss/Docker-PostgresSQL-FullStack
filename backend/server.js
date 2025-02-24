const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//test api
app.get('/testAPI', (req, res) => {
    try {
        res.status(200).json({ message: 'API is working' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany(); //Prisma fetch multiple records (SELECT * FROM "User";)
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get user by id
app.get('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//create user
app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update user
app.put('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                email: req.body.email
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// New Endpoint: Get all posts with associated author data
app.get('/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true },
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// New Endpoint: Get all users along with their posts
app.get('/userPosts', async (req, res) => {
    try {
        const userPosts = await prisma.user.findMany({
            include: { posts: true },
        });
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


console.log("Server is running on http://localhost:4001");

//**---------------------------start server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server Port ${PORT}`));

//http://localhost:4000
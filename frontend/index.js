const express = require('express');
const path = require('path')

require('dotenv').config()

// auth
const verifyRoute = require('./routes/auth/verify');
const logoutRoute = require('./routes/auth/logout');
const meRoute = require('./routes/auth/me');
const loginRoute = require('./routes/auth/login');
const registerRoute = require('./routes/auth/register')

// search
const peopleRoute = require('./routes/search/people');
const totalRoute = require('./routes/search/total');

// profile
const editProfileRoute = require('./routes/profile/editProfile');
const getProfileRoute = require('./routes/profile/getProfile');
const meProfileRoute = require('./routes/profile/meProfile');
const createProfileRoute = require('./routes/profile/createProfile');

// task
const deleteTaskRoute = require('./routes/task/deleteTask');
const editTaskRoute = require('./routes/task/editTask');
const getTaskRoute = require('./routes/task/getTask');
const createTaskRoute = require('./routes/task/createTask');

// workspace
const archivedWorkspaceRoute = require('./routes/workspace/archivedWorkspaces');
const editWorkspaceRoute = require('./routes/workspace/editWorkspace');
const getWorkspaceRoute = require('./routes/workspace/getWorkspace');
const addPeopleRoute = require('./routes/workspace/AddPeople');
const createWorkspaceRoute = require('./routes/workspace/createWorkspace');

const app = express();

app.use(express.json());

// auth
app.use(verifyRoute);
app.use(logoutRoute);
app.use(meRoute);
app.use(loginRoute);
app.use(registerRoute);

// search
app.use(peopleRoute);
app.use(totalRoute);

// profile
app.use(editProfileRoute);
app.use(getProfileRoute);
app.use(meProfileRoute);
app.use(createProfileRoute);

// task
app.use(deleteTaskRoute);
app.use(editTaskRoute);
app.use(getTaskRoute);
app.use(createTaskRoute);

// workspace
app.use(archivedWorkspaceRoute);
app.use(editWorkspaceRoute);
app.use(getWorkspaceRoute);
app.use(addPeopleRoute);
app.use(createWorkspaceRoute);


app.use(express.static('clientside/build'));
app.get('*', (req, res) => {
    const myPath = path.resolve(__dirname, 'clientside', 'build', 'index.html');
    console.log('my path: ', myPath);
    return res.sendFile(myPath);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

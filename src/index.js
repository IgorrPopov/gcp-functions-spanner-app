const { v4: uuidv4 } = require('uuid');
const CloudSpannerClient = require('./utils/cloudSpannerClient');
const { projectId, instanceId, databaseId } = require('./config/config');
const { 
  POST, 
  GET, 
  getAllUsersQuery, 
  allowedProperties, 
  defaultUserStatus, 
  usersTableName 
} = require('./constants/const');

module.exports.cloudSpanner = async ({ method, body }, res) => {

  if (method !== POST && method !== GET) {
    return res.status(400).send(); 
  }
  
  const cloudSpannerClient = new CloudSpannerClient(projectId, instanceId, databaseId);
  
  // get all users logic
  if (method === GET) {
    try {
      const [ rows ] = await cloudSpannerClient.queryData(getAllUsersQuery);
      return res.send({ users: rows });
    } catch (error) {
      return res.status(500).send();
    }
  }

  // create user logic
  const isValidUser = 
    Object.keys(body).every(prop => allowedProperties.includes(prop));

  if (JSON.stringify(body) === '{}' || !isValidUser) {
    return res.status(400).send();
  }

  const user = Object.assign({ UserId: uuidv4(), Status: defaultUserStatus }, body); 

  try {
    await cloudSpannerClient.insertData(usersTableName, user);
    res.status(201).send();
  } catch (error) {
    return res.status(500).send();
  }
};
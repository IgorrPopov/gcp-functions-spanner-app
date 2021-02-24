const POST = 'POST';
const GET = 'GET';

const getAllUsersQuery = { sql: 'SELECT * FROM Users' };

const allowedProperties = ['FirstName', 'LastName', 'Gender', 'Status'];

const defaultUserStatus = 'user';

const usersTableName = 'Users';

module.exports = { POST, GET, getAllUsersQuery, allowedProperties, defaultUserStatus, usersTableName };
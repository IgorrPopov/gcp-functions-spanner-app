**URL:** https://us-central1-nestjs-cloud-function-app.cloudfunctions.net/cloudSpanner

**GET** request returns all users from the cloud spanner
**POST** request will add a new user to the cloud spanner

**POST request body example**

{
  "FirstName": "Inna",
  "LastName": "Ivanova",
  "Gender": "female",
  "Status": "admin"
}
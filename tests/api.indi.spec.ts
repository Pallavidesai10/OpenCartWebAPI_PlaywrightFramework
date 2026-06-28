

import{ApiHelper}from '../src/utils/apiHelper'
import{expect, test}from'../src/fixtures/pageFixtures'
import process from 'node:process'


const Token= process.env.API_TOKEN!;

let AuthHeader= {
    Authorization:`Bearer ${Token}`,
};

//helper - generic function - create a fresh user

async function createUser(apiHelper:any){
    let userData={
        name: 'Testautomation',
        email: `test1${Date.now()}@tom.com`,
        gender: 'male',
        status: 'active'
    }

    let response= await apiHelper.post('/public/v2/users', userData, AuthHeader);
    expect (response.status()).toBe(201);
    return response.body;


}

//Test 1: Create a user test + verify: AAA
//POST ---> userId --> GET /userId -- verify

// test.skip('PUT--Update user data', async({apiHelper})=>{
//     let userResponse= await createUser(apiHelper);

//     let updatedUserData={
//         name: 'Testautomation1',
//         email: `test1${Date.now()}@tom.com`,
//         gender: 'male',
//         status: 'inactive'
//     }

//     //update the user
//     let response= await apiHelper.put(`/public/v2/users/${userResponse.id}`, updatedUserData, AuthHeader);
//     expect(response.status()).toBe(200);
//     expect(response.body.name).toBe(updatedUserData.name);
//     expect(response.body.status).toBe(updatedUserData.status);


//     //Get user
//     let getresponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AuthHeader);
//     expect(getresponse.status()).toBe(200);
//     expect(getresponse.body.name).toBe(updatedUserData.name);
// });


// //Test 3: Delete a user test + verify: AAA
// //POST ---> userId --> DELETE(204) --> GET /userId -- verify(404)

// test.skip('Delete-- user data', async({apiHelper})=>{
//     let userResponse= await createUser(apiHelper);

//     //delete the user
//     let response= await apiHelper.delete(`/public/v2/users${userResponse.id}`, AuthHeader);
//     expect(response.status).toBe(204);

//     //get user

//     let getresponse= await apiHelper.delete(`/public/v2/users${userResponse.id}`, AuthHeader);
//     expect(response.status).toBe(404);
//     expect(response.body.message).toBe('Resource not found');

// });
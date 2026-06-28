

import process from 'process';
import{test, expect}from '../src/fixtures/apiFixture';
import { ApiHelper } from '../src/utils/apiHelper';

const TOKEN= process.env.API_TOKEN!;
let AUTH_HEADER= { Authorization: `Bearer${TOKEN}`};


let userID:number;


//get

test.describe.serial('running e2e api crud operations',()=>{
    

test('GetAPI- Get user details', async({apiHelper})=>{
    let response= await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
});

test('Post api-- Create user', async({apiHelper})=>{
    let userData = {
            name: 'Auto API',
            email: `automation_${Date.now()}@open.com`,
            gender: 'male',
            status: 'active'
        };
    let response= await apiHelper.post(`/public/v2/users`, AUTH_HEADER, userData);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    userID= response.body.id;
    console.log('created user id=', userData);

});

test('Put---update user data', async({apiHelper})=>{
    let updatedData={
        name: 'AutoNewAPI',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'inactive'
    };

    let response= await apiHelper.put(`/public/v2/users${userID}`, updatedData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(response.body.status).toBe(updatedData.status);
});


test('Delete-- delete the user', async({apiHelper})=>{
    let response= await apiHelper.delete(`/public/v2/users${userID}`, AUTH_HEADER);
    expect(response.status).toBe(204);
})



})
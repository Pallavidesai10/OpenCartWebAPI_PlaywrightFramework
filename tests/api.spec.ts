import{expect, test}from'../src/fixtures/pageFixtures'


let authToken= {Authorization: 'Bearer f44a8b2e6ea84bf32941fa0cea233e15f657fe9ec10296cb7594b80c89e56690'};

test('get users test @sanity', async({request})=>{
    let response=await request.get('https://gorest.co.in/public/v2/users',{headers:authToken});
let statusCode= response.status();//200
let resposeBody= await response.json();

console.log(statusCode);
console.log(resposeBody);

let id= resposeBody.id;
console.log(id);

expect (statusCode).toBe(200);

});

test('create user test @sanity', async({request})=>{

    let requestBody= {
        name: "Dolly Dolcy",
        email: `doly1_${Date.now()}@oopenc.test`,
        gender: "female",
        status: "active"
    }
    let response=await request.post('https://gorest.co.in/public/v2/users',{
        headers:authToken,
        data: requestBody
    });
let statusCode= response.status();//201
let resposeBody= await response.json();
let name= resposeBody.name;

console.log(statusCode);
//console.log(resposeBody);

expect(name).toBe('Dolly Dolcy');

});

test('update user test @sanity', async({request})=>{

    let requestBody= {
        name: "Dolly Dolly",
        email: "doly81@oopenc.test",
        gender: "female",
        status: "active"
    }
    let response=await request.put('https://gorest.co.in/public/v2/users/8505581',{
        headers:authToken,
        data: requestBody
    });
let statusCode= response.status();//200
let resposeBody= await response.json();

console.log(statusCode);
console.log(resposeBody);

});

test('delete user test @sanity', async({request})=>{

    let response=await request.delete('https://gorest.co.in/public/v2/users/8505581',{
        headers:authToken
    });
let statusCode= response.status();//404

console.log(statusCode);

});



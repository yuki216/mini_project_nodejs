// mini_project_nodejs/app/handler/MerchantHandler.test.js
const httpMocks = require("node-mocks-http");


const { login, register, logout, remove } = require("./MerchantHandler");

const mockMerchant = jest.fn();
jest.mock("../../app/storages", () => {
    return {
      models: {
        merchant: {  
            findOne: () => mockMerchant(),
            findAll: () => mockMerchant(),
            create: () => mockMerchant(),
            destroy: () => mockMerchant(),
            save: () => mockMerchant()
        }
      }
    };
});

   test("login returns an existing merchants", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/merchants/login",
      params: {
        id: 1
      },
      headers:{
        authorization: "Basic MDgxMzkyNDgzOTg4OjEyMzQ1Ng=="
      }
    });
    const response = httpMocks.createResponse();
   
    mockMerchant.mockResolvedValue({
        id: 1,
        phone_number: "081392483988",
        password:"$2b$10$ri4JpEs5phG5Mu4V0egSuO2pqyqgDQhJylpoHkw3b7dnufGihUqf2",
        name:"Yuki",
        address:"test123",
        join_date:"2021-01-01"
    });
   
    await login(request, response);
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData().status).toEqual("success");
   });

   test("register merchants returns an existing merchants", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/merchants/register",
      body: {
        id: 1,
        phone_number: "081392483988",
        password: "123456",
        name: "Yuki",
        address: "test123",
        join_date:"2021-01-01"
      },
      headers:{
        authorization: "Basic MDgxMzkyNDgzOTg4OjEyMzQ1Ng=="
      }
    });
    const response = httpMocks.createResponse();
   
    mockMerchant.mockResolvedValue({
        id: 1,
        phone_number: "081392483988",
        password:"$2b$10$ri4JpEs5phG5Mu4V0egSuO2pqyqgDQhJylpoHkw3b7dnufGihUqf2",
        name:"Yuki",
        address:"test123",
        join_date:"2021-01-01"
    });
   
    await register(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "status" : "success",
        "message" : "Created merchant success.",
        "data" : {
          "id": 1,
          "phone_number": "081392483988",
          "password":"$2b$10$ri4JpEs5phG5Mu4V0egSuO2pqyqgDQhJylpoHkw3b7dnufGihUqf2",
          "name":"Yuki",
          "address":"test123",
          "join_date":"2021-01-01"
        }
    });
   });

   test("remove merchants returns an existing merchants", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/merchants/remove/:id",
      params: {
        id: 1
      }
    });
    const response = httpMocks.createResponse();
   
    mockMerchant.mockResolvedValue({
        id: 1,
        phone_number: "081392483988",
        password:"$2b$10$ri4JpEs5phG5Mu4V0egSuO2pqyqgDQhJylpoHkw3b7dnufGihUqf2",
        name:"Yuki",
        address:"test123",
        join_date:"2021-01-01"
    });
   
    await remove(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "status" : "success",
        "message" : "Delete merchant success."
    });
   });

   test("logout merchants returns an existing merchants", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/merchants/logout",
      cookies: {
        uid: 1,
        name:"Yuki"
      }
    });
    const response = httpMocks.createResponse();
      
    await logout(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "status" : "success",
        "message" : "cookie was cleared"
    });
   });

   
// mini_project_nodejs/app/handler/MerchantHandler.test.js
const httpMocks = require("node-mocks-http");


const { get, list, add, update, deleted } = require("./ProductHandler");

const mockFindOneProduct = jest.fn();
jest.mock("../../app/models/product", () => {
    return {
            product: {  
                findOne: () => mockFindOneProduct(),
                findAll: () => mockFindOneProduct(),
                create: () => mockFindOneProduct(),
                destroy: () => mockFindOneProduct(),
                save: () => mockFindOneProduct()
            },
            dataProduct:{
                save: () => mockFindOneProduct()
            }
    };
});

   test("get returns an existing product", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/products/:id",
      params: {
        id: 1
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue({
        id: "1",
        name: "Warteg Kharisma Bahari",
        quantity: 200,
        price: 5000,
        merchant_id:1
    });
   
    await get(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "status" : "success",
        "message" : "",
        "data" : {
            "id": "1",
            "name": "Warteg Kharisma Bahari",
            "quantity": 200,
            "price": 5000,
            "merchant_id":1
        }
    });
   });

   test("get returns 404 when a product id does not exists", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/products/:id",
      params: {
        id: 2
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue(null);
   
    await get(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getJSONData()).toEqual({
        "status" : "error",
        "message" : "ID Not Found.",
        "data" : null
    });
   });

   test("list returns an existing product", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/products",
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue([{
        id: "1",
        name: "Warteg Kharisma Bahari",
        quantity: 200,
        price: 5000,
        merchant_id:1
    }]);
   
    await list(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "status" : "success",
        "message" : "",
        "data" : [{
            "id": "1",
            "name": "Warteg Kharisma Bahari",
            "quantity": 200,
            "price": 5000,
            "merchant_id":1
        }]
    });
   });

   test("add a product", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/products",
      body:{
        name:"Warteg Kharisma Bahari",
        quantity:20,
        price:6000
      },
      cookies:{
          uid:1
      },
      
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue({
        id: "1",
        name: "Warteg Kharisma Bahari",
        quantity: 20,
        price: 6000,
        merchant_id:1
    });
   
    await add(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "status" : "success",
        "message" : "Created product success.",
        "product" : {
            "id": "1",
            "name": "Warteg Kharisma Bahari",
            "quantity": 20,
            "price": 6000,
            "merchant_id":1
        }
    });
   });
   
   test("update a product", async () => {
    const request = httpMocks.createRequest({
      method: "PUT",
      url: "/api/products",
      body:{
        id:1,
        name:"Warteg Kharisma Bahari",
        quantity:20,
        price:6000
      },
      cookies:{
          uid:1
      },
      
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue({
        id: "1",
        name: "Warteg Kharisma Bahari",
        quantity: 20,
        price: 6000,
        merchant_id:1
    });
   
    await update(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "status" : "success",
        "message" : "Created product success.",
        "product" : {
            "id": "1",
            "name": "Warteg Kharisma Bahari",
            "quantity": 20,
            "price": 6000,
            "merchant_id":1
        }
    });
   });
   
   test("delete a product", async () => {
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/api/products/:id",
      params:{
        id:1
      },
      cookies:{
          uid:1
      },
      
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue({
        id: 1
    });
   
    await deleted(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "status" : "success",
        "message" : "Delete product success."
    });
   });

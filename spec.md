#Merchants
* Merchant object
```
{
  id: integer
  name: string
  password: string
  phone_number: string
  address: string
  join_date: date
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```
**POST /register**
----
  Creates a new Merchant and returns the new object.
* **URL Params**  
  None
* **Data Params**  
```
{
    "phone_number": "081392483981",
    "password":"123456",
    "name":"Yuki",
    "address":"test123",
    "join_date":"2021-01-01"
}
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **status:** `success`  
  **message:** `Created merchant success.`
  **data:**
```
{
    {<merchant_object>},
    {<merchant_object>},
    {<merchant_object>},
    {<merchant_object>},
    {<merchant_object>}
}
```

**POST /login**
----
  Returns information merchant.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Basic Base64
* **Success Response:** 
* **Code:** 200  
  **status:** `success`  
  **message:** `login success.`
  **data:**
  ```
  {
      {<merchant_object>},
      {<merchant_object>},
      {<merchant_object>},
      {<merchant_object>},
      {<merchant_object>}
  }
  ```
* **Error Response:**  
  * **Code:** 404  
  **status:** `error`  
  **message:** `{ error : "Merchant doesn't exist" }`  
  OR  
  * **Code:** 401  
  **status:** `error`  
  **message:** `unauthorized`

**POST /logout**
----
  Returns information success.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **status:** `success` 
  **message:** `cookie was cleared.`
  
* **Error Response:**  
  * **Code:** 401  
  **status:** `error`  
  **message:** `unauthorized`

**POST /remove/:id**
----
  Returns information merchant.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **status:** `success`  
  **message:** `Delete Merchant success.`

* **Error Response:**  
  * **Code:** 404  
  **status:** `error`  
  **message:** `{ error : "ID Not Found" }`  
  OR  
  * **Code:** 401  
  **status:** `error`  
  **message:** `unauthorized`


#Products
* Product object
```
{
  id: integer
  name: string
  quantity: integer
  price: double
  merchant_id: integer
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```
**GET /product**
----
  Returns all products in the system.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **status:** `success` 
  **message:** ``
   **data:**
```
{
  [
    {<product_object>},
    {<product_object>},
    {<product_object>}
  ]
}
``` 
* **Error Response:**  
  * **Code:** 404  
  **status:** `error`  
  **message:** `Product doesn't exist`  
  OR  
  * **Code:** 401  
  **status:** `error`  
  **message:** `unauthorized`

**GET /product/:id**
----
  Returns the specified product.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **status:** `success` 
  **message:** ``
 **data:**
```
{
    {<product_object>},
    {<product_object>},
    {<product_object>}
}
```
* **Error Response:**  
  * **Code:** 404  
  **status:** `error`  
  **message:** `Product doesn't exist`  
  OR  
  * **Code:** 401  
  **status:** `error`  
  **message:** `unauthorized`

**POST /product**
----
  Creates a new Product and returns the new object.
* **URL Params**  
  None
* **Data Params**  
```
  {
    name: string
    quantity: integer
    price: float
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **status:** `success` 
  **message:** ``
  **data:**  `{ <product_object> }` 
* **Error Response:**  
  * **Code:** 401  
  **status:** `error`  
  **message:** `unauthorized`

**PUT /product**
----
  Updates fields on the specified product and returns the updated object.
* **URL Params**  
 None
* **Data Params**  
```
  {
    id:integer
    name: string
    quantity: integer
    price: float
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer `<OAuth Token>`
* **Success Response:** 
* **Code:** 200  
  **status:** `success` 
  **message:** ``
  **Content:**  `{ <product_object> }`  
* **Error Response:**  
  * **Code:** 404  
  **status:** `error`  
  **message:** `Product ID doesn't exist`  
  OR  
  * **Code:** 401  
  **status:** `error`  
  **message:** `unauthorized`

**DELETE /product/:id**
----
  Deletes the specified product.
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200  
  **status:** `success` 
  **message:** `Delete Product success`
* **Error Response:**  
  * **Code:** 404  
   **message:** `Product ID doesn't exist`  
  OR  
  * **Code:** 401  
  **message:** `unauthorized`

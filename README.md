
# Internship Task Inventory management system backend


Inventory management system Where a Logged in User can add,update,
delete and get products, category, and their details throught an APi.




## API Reference
#### Sign up user
#### api_key  = http://localhost:5000/

#### create user
```http
  POST /user/createuser
```

| Parameter                 | Type     | Description                |
| :--------                 | :------- | :------------------------- |
| `name` `email` `password` | `string` | **Required**. new data in body |


#### login user
```http
  POST /user/login
```

| Parameter          | Type     | Description                |
| :--------          | :------- | :------------------------- |
| `email` `password` | `string` | **Required**. new data in body |
`it returns a authtokken save in localstorage`



#### update user
```http
  PATCH /user/update/${id}
```

| Parameter          | Type     | Description                |
| :--------          | :------- | :------------------------- |
| `id`               | `string` | **Required**. new data in body name, email password |
`it returns a authtokken save in localstorage`


#### User should be login for further


#### Get All categories

```http
  GET /category/getcategories
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**.http://localhost:5000/category/getcategories |

#### add category

```http
  POST /category/addcategory/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** name=req.body.name |


#### delete category
```http
  DELETE /category/deletecategory/${categoryname}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.http://localhost:5000/category/deletecategory/${categoryname}  |


#### Update category
```http
  PATCH /category/deletecategory/${categoryname}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.New name in body name=req.body.name |








#### Get All Products

```http
  GET /product/getproducts
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**.authtokken |

#### add prodcut

```http
  POST /product/addproduct
```

| Parameter                                      | Type     | Description                       |
| :--------                                      | :------- | :-------------------------------- |
| `name,Description,company,category,price`      | `string` | **Required** all in body |


#### delete category
```http
  DELETE /product/deleteproduct/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  prodcut id |


#### Update category
```http
  PATCH /product/updatecategory/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. any in body |




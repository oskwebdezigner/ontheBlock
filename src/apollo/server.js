export const LoginUser = `mutation Login($facebookId:String,$email:String,$password:String,$type:String!,$appleId:String,$name:String,$notificationToken:String){
    login(facebookId:$facebookId,email:$email,password:$password,type:$type,appleId:$appleId,name:$name,notificationToken:$notificationToken){
     userId
     token
     tokenExpiration
     name
     email
     phone
     referral_id
   }
  }`;

export const estates = `
  query estates{
    estates{
      _id
      title
      image
      is_active
    }
  }`;

export const configuration = `query configuration {
     configuration{
    _id
    currency_symbol
    currency
    delivery_charges
    }
  }`;

export const updateOrder = `subscription updateOrder($userId:String!){
    updateOrder(userId:$userId){
    order{
      _id
      amount
      rider_id
      delivery_charges
      items{
        _id
        title
        quantity
        price
        image
      }
      status
      user_id
      createdAt
      delivery_address
      region{
        latitude
        longitude
      }
      rider{
        _id
        name
        last_name
        phone
      }
    }
      origin
    }
  }`;

export const newOrder = `subscription newOrder($userId:String!){
    newOrder(userId:$userId){
      order{
        _id
        amount
        rider_id
        delivery_charges
        items{
          _id
          title
          quantity
          price
          image
        }
        status
        user_id
        createdAt
        delivery_address
        region{
          latitude
          longitude
        }
        rider{
          _id
          name
          last_name
          phone
        }
      }
        origin
    }
  }`;

export const orders = `query orders{
    orders{
      _id
      amount
      rider_id
      delivery_charges
      items{
        _id
        title
        quantity
        price
        image
      }
      status
      user_id
      createdAt
      delivery_address
      region{
        latitude
        longitude
      }
      rider{
        _id
        name
        last_name
    phone
      }
    }
    }`;

export const completedOrders = `query completedOrders{
    completedOrders{
      _id
      amount
      rider_id
      delivery_charges
      items{
        _id
        title
        quantity
        price
        image
      }
      status
      user_id
      createdAt
      delivery_address
      region{
        latitude
        longitude
      }
      rider{
        _id
        name
        last_name
    phone
      }
    }
    }`;

export const placeOrder = `mutation placeOrder($amount:String, $user_id: String,
    $delivery_charges: String,$rider_id: String,
   $inputItem:[InputItem],
   $delivery_address:String,
$latitude: String,
  $longitude:String
   ){
       placeOrder(inputOrder:{
         amount: $amount,
         user_id: $user_id,
         delivery_charges: $delivery_charges,
         rider_id: $rider_id,
         items:$inputItem,
         delivery_address:$delivery_address,
         region: {
          latitude:$latitude,
          longitude:$longitude
        }
       },
       ){
         amount
         user_id
         delivery_address
         region{
          latitude
          longitude
        }
       items{
   _id
         title
         quantity
         price
         
       }
       rider_id
   
       }
     }`;

export const products = `query products{
    products{
      _id
      title
      image
      price
      is_active
      description
      category_id
    }
  }`;

export const createUser = `
    mutation CreateUser($facebookId:String,$phone:String,$email:String,$password:String,$name:String,$notificationToken:String,$appleId:String,$referral_id:String){
    createUser(userInput:{
        facebookId:$facebookId,
        phone:$phone,
        email:$email,
        password:$password,
        name:$name,
        notificationToken:$notificationToken,
        appleId:$appleId,
        referral_id:$referral_id
    }){
        userId
        token
        tokenExpiration
        name
        email
        phone
        notificationToken
        referral_id
    }
}`;

export const forgotPasswordVerfication = `mutation forgotPasswordVerification(
    $email :String!
    $code :String!
  ){
    forgotPasswordVerification(email :$email,
    code :$code){
      result
    }
  }`;

export const verifyAccount = ` mutation verifyAccount($email:String!,$code: String!,$emailCode: String! ){
    verifyAccount(verifyInput:{
      email:$email,
      code:$code,
      emailCode:$emailCode
    }){
      result
    }
  }`;
export const newPassword = `mutation newPassword($email :String! , 
    $newPassword : String!){
    newPassword(email : $email,
    newPassword :$newPassword){
      result
    }
  }`;

export const resetPassword = `mutation resetPassword($password:String!,$newPassword:String!,$email:String!){
    resetPassword(password: $password,newPassword:$newPassword, email:$email ){
      result
    }
  }`;

export const updateUser = `mutation updateUser(
  $name : String
  $phone : String
  $picture:String
){
  updateUser(updateUserInput : {
    name :$name,
    phone :$phone ,
    picture: $picture
  }){
    name
    email
    phone
    picture
  }
}`;

//ontheblock

export const goals = `query goals {
  
  goals {
    limit
    page
    results {
      description
      image
      name
      _id
    }
    totalPages
    totalResults
  }
}`;

export const signup = `mutation Signup(
  $name : String
  $phone : String
  $address:String
  $email:String
  $password:String
  $last_name:String
) {

   Signup(userInput : {
    name :$name,
    last_name :$last_name,
    phone :$phone ,
    picture: $picture
    address: $address
    email: $email
    password: $password
  })

  signup {
    _id
    token
    tokenExpiration
    role
    address
    phoneVerified
    isEmailVerified
    first_name
    last_name
    phone
    email
    notificationToken
    photo
    isOnline
  }
}`;

export const verifyPhone = `mutation VerifyPhone($code: String, $phone: String) {
  verifyPhone(code: $code, phone: $phone) {
    phone
    result
  }
}`;

export const SendPhoneCode = `mutation SendPhoneCode($phone: String) {
  sendPhoneCode(phone: $phone) {
    result
    phone
  }
}`;

export const RegisterWithProperty = `mutation RegisterWithProperty($userInput: UserInput, $propertyInput: InputProperty) {
  registerWithProperty(userInput: $userInput, propertyInput: $propertyInput) {
    _id
    token
    tokenExpiration
    role
    address
    phoneVerified
    isEmailVerified
    first_name
    last_name
    phone
    email
    notificationToken
    photo
    isOnline
  }
}`;

export const PropertyTypes = `query PropertyTypes {
  propertyTypes {
    page
    limit
    totalPages
    totalResults
    results {
      name
      image
      description
      _id
      createdAt
      updatedAt
    }
}
}
`;

export const profile = `query Profile {
  profile {
    _id
    role
    first_name
    last_name
    phone
    email
    createdAt
    updatedAt
    notificationToken
    photo
    is_active
  }
}`;

export const login = `mutation Login($email: String, $password: String, $notificationToken: String) {
  login(email: $email, password: $password, notificationToken: $notificationToken) {
    _id
    token
    tokenExpiration
    role
    address
    phoneVerified
    isEmailVerified
    first_name
    last_name
    phone
    email
    notificationToken
    photo
    isOnline
  }
}`;

export const forgotPassword = `mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    result
  }
}`;

export const ForgotPasswordVerification = `mutation ForgotPasswordVerification($email: String!, $code: String!) {
  forgotPasswordVerification(email: $email, code: $code) {
    result
    token
  }
}`;

export const ForgetPasswordChange = `mutation ForgetPasswordChange($token: String!, $password: String!) {
  forgetPasswordChange(token: $token, password: $password) {
    result
  }
}`;

export const properties = `query Properties {
  properties {
    results {
      _id
      bathrooms
      bedrooms
      city
      country
      description
      images
      is_active
      name
      owned_years
      type {
        name
        image
        description
        _id
      }
      zip_code
      address
    }
  }
}`;

export const upcommingTasksList = `query UpcommingTasksList {
  upcommingTasksList {
    results {
      _id
      assign_to {
        name
        _id
        contact_no
        occupation
      }
      is_completed
      get_notifications
      description
      schedule_date
      inventory {
        _id
        name
        type {
          name
        }
      }
      property {
        _id
        name
        images
        address
        description
      }
    }
    limit
    page
    totalPages
    totalResults
  }
}`;

export const updateProperty = `mutation UpdateProperty($updatePropertyId: ID!, $updatePropertyInput: InputProperty) {
  updateProperty(id: $updatePropertyId, updatePropertyInput: $updatePropertyInput) {
    _id
    bathrooms
    bedrooms
    country
    description
    images
    name
    owned_years
    type {
      _id
      image
      name
      description
    }
    zip_code
    city
    address
    is_active
  }
}`;

export const getInventoryByCategory = `query GetInventoryByCategory($propertyId: ID!) {
  getInventoryByCategory(propertyId: $propertyId) {
    _id
    inventories {
      images
      model_no
      name
      serail_no
      type {
        name
        image
        description
        _id
      }
      brand
      description
      _id
    }
    category {
      image
      name
      description
      _id
    }
  }
}`;

export const categories = `query Categories($options: options) {
  categories(options: $options) {
    results {
      name
      image
      description
      _id
    }
    page
    limit
    totalPages
    totalResults
  }
}`;

export const updateInventory = `mutation UpdateInventory($updateInventoryId: ID!, $updateInventoryInput: InputInventory) {
  updateInventory(id: $updateInventoryId, updateInventoryInput: $updateInventoryInput) {
    _id
    name
    description
    images
    type {
      name
      _id
      description
      image
    }
    brand
    model_no
    serail_no
    is_active
  }
}`;

export const addFolder = `mutation AddFolder($inputFolder: InputFolder) {
  addFolder(inputFolder: $inputFolder) {
    _id
    added_by {
      _id
      email
      first_name
    }
    inventory {
      _id
      name
    }
    name
    files {
      _id
      mimetype
      name
      path
    }
  }
}`;

export const addInventory = `mutation AddInventory($inputInventory: InputInventory) {
  addInventory(inputInventory: $inputInventory) {
    _id
    brand
    description
    name
    model_no
    serail_no
    images
  }
}`;

export const addHandyman = `mutation AddHandyman($inputHandyman: InputHandyman) {
  addHandyman(inputHandyman: $inputHandyman) {
    _id
    name
    contact_no
    occupation
  }
}`;

export const handymen = `query Handymen {
  handymen {
    results {
      _id
      contact_no
      name
      occupation
      property {
        _id
        name
        description
      }
    }
    limit
    totalResults
    totalPages
    page
  }
}`;

export const updateTask = `mutation UpdateTask($updateTaskId: ID!, $updateTaskInput: InputTask) {
  updateTask(id: $updateTaskId, updateTaskInput: $updateTaskInput) {
    _id
    added_by {
      _id
      first_name
      email
      photo
      phone
    }
    assign_to {
      _id
      name
      occupation
      contact_no
    }
    description
    get_notifications
    inventory {
      _id
      name
    }
    property {
      _id
      images
      name
      description
      address
    }
    schedule_date
  }
}`;

export const deleteHandyman = `mutation DeleteHandyman($deleteHandymanInput: DeleteHandymanInput) {
  deleteHandyman(deleteHandymanInput: $deleteHandymanInput) {
    _id
    name
    occupation
    contact_no
  }
}`;

export const addTask = `mutation AddTask($inputTask: InputTask) {
  addTask(inputTask: $inputTask) {
    _id
    added_by {
      _id
      email
      first_name
    }
    description
    get_notifications
    is_completed
    schedule_date
    assign_to {
      _id
      name
      occupation
      contact_no
    }
    property {
      _id
      name
      description
      address
    }
  }
}
`;

export const inventories = `query Inventories($options: options, $filters: Inventoryfilters) {
  inventories(options: $options, filters: $filters) {
    results {
      _id
      name
      is_active
    }
  }
}`;

export const folders = `query Folders($options: options) {
  folders(options: $options) {
    limit
    page
    totalPages
    totalResults
    results {
      _id
      added_by {
        _id
        email
        first_name
      }
      files {
        _id
        mimetype
        name
        path
      }
      name
      inventory {
        _id
        name
        description
      }
    }
  }
}`;

export const updateHandyman = `mutation UpdateHandyman($updateHandymanId: ID!, $updateHandymanInput: InputHandyman) {
  updateHandyman(id: $updateHandymanId, updateHandymanInput: $updateHandymanInput) {
    _id
    contact_no
    name
    occupation
    property {
      _id
      name
    }
  }
}`;

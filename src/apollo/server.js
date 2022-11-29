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
  }`

  export const estates =`
  query estates{
    estates{
      _id
      title
      image
      is_active
    }
  }`

  export const configuration = `query configuration {
     configuration{
    _id
    currency_symbol
    currency
    delivery_charges
    }
  }`

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
  }`

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
  }`

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
    }`


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
    }`

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
     }`

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
  }`

  export const profile = `
  query{
    profile{
      _id
      name
      last_name
      phone
      email
      notificationToken
      picture
      gender
      dateofbirth
    }
  }`

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
}`

export const forgotPassword = `mutation forgotPassword($email : String!){
    forgotPassword(email : $email){
      result
    }
  }`

export const forgotPasswordVerfication = `mutation forgotPasswordVerification(
    $email :String!
    $code :String!
  ){
    forgotPasswordVerification(email :$email,
    code :$code){
      result
    }
  }`

  export const verifyAccount = ` mutation verifyAccount($email:String!,$code: String!,$emailCode: String! ){
    verifyAccount(verifyInput:{
      email:$email,
      code:$code,
      emailCode:$emailCode
    }){
      result
    }
  }`
export const newPassword = `mutation newPassword($email :String! , 
    $newPassword : String!){
    newPassword(email : $email,
    newPassword :$newPassword){
      result
    }
  }`

  export const resetPassword = `mutation resetPassword($password:String!,$newPassword:String!,$email:String!){
    resetPassword(password: $password,newPassword:$newPassword, email:$email ){
      result
    }
  }`

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
}`
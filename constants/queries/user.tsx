export const CREATE_USER_QUERY = `mutation createUser(
  $email: String!,
  $name: String!,
  $mobile: Float!,
  $countryCode: Int!
  $type: UserType!
  ) {
    createUser(createUserInput: {
      email: $email,
      name: $name,
      mobile: $mobile,
      country_code: $countryCode
      user_type: $type
    }) {
      _id
      name
      mobile
      email
      country_code
      user_type
    }
  }`;
  export const Update_USER_Mutation = `
  mutation Update_User(
    $_id: String!
    $city: String!
    $country_code: Int!
    $email: String!
    $mobile: Float!
    $name: String!
    $state: String!
  ){
    updateUser(updateUserInput:{
      _id:$_id
      city:$city
      country_code: $country_code
      email:$email
      mobile:$mobile
      name:$name
      state:$state
    }){
      _id
      city
      company
      country_code
      email
      gst
      mobile
      name
      state
      status
      user_type
    }
  }
  `;


export const LOGIN_QUERY = `mutation loginUser($mobile: Float!, $countryCode: Int!) {
  loginUser(loginUserInput: {
    country_code: $countryCode
    mobile: $mobile
  }) {
    _id
    name
    country_code
    company
    email
    mobile
  }
}`;

export const OTP_VERIFY_QUERY = `mutation verifyOtp($mobile: Float!, $otp: Int!) {
  verifyOtp(verifyOtpInput: {
    mobile: $mobile
    otp: $otp
  }) {
    _id
    city
    company
    country_code
    email
    mobile
    name   
  }
}`;
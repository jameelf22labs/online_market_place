export interface SignUpPayloadDto {
  name: string;
  email: string;
  password: string;
}


export interface LoginPayloadDto {
    email : string;
    password : string;
}

export interface CreateInstructorPayloadDto {
  id : string;
  userId : string;
  bio : string;
  profilePicUrl : string;
  expertise : string
}
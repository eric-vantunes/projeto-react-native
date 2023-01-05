const isLoggedIn = () => {
  return false;
};

const login = (email, password) => {
  console.log(email);
  console.log(password);
};

const register = (_email, _password, confirmPassword, setErrors) => {
  if(_password === ""){
      setErrors((_v) => ({
          ..._v,
          password: {
              status: true,
              msg: "Campo password deve ser preenchido"
          }
      }))
  }else{
      setErrors((_v) => ({
          ..._v,
          password: {
              status: false,
              msg: ""
          }
      }))
  }

  if(confirmPassword === ""){
      setErrors((_v) => ({
          ..._v,
          confirmPassword: {
              status: true,
              msg: "Confirm password field is required"
          }
      }))
  }else{
      setErrors((_v) => ({
          ..._v,
          confirmPassword: {
              status: false,
              msg: ""
          }
      }))
  }

  if(_password === confirmPassword){
      setErrors((_v) => ({
          ..._v,
          password: {
              status: false,
              msg: ""
          },
          confirmPassword: {
              status: false,
              msg: ""
          }
      }))
  }else{
      setErrors((_v) => ({
          ..._v,
          password: {
              status: true,
              msg: "Passwords do not match"
          },
          confirmPassword: {
              status: true,
              msg: ""
          }
      }))
  }
}
const logout = () => {

}
export {
  isLoggedIn,
  login,
  register,
}

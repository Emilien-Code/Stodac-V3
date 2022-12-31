const mailValidation = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(String(email).toLowerCase());
}
const passwordValidation = (password)=>{
  const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return regexp.test(String(password));
}
const phoneValidation = (mobile)=>{
  const regexp = /^[0-9]{10}|[+][0-9]{11}$/;
  return regexp.test(String(mobile));
}


export default {mailValidation, passwordValidation, phoneValidation}
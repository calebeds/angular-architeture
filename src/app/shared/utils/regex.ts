export const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*([0-9]|(^\w\s)))/g,
  latin: /^[A-Za-z-\s]+$/,
  numbers: /^\d+$/,
  latinAndNumbers: /^[A-Za-z0-9]+$/,
  latinAndSpaces: /^[0-9-]+$/,
  safe: /^([\sA-Za-z0-9!@#$%^&*()_+\-+\[\]{};':"\\|,.<>\/?])/,
};

export const regexErrors = {
  email: 'Email is incorrect',
  password:
    'Password must contain an upper case letter, a lower case and a number',
  latin: 'Latin letters only',
  numbers: 'Digits only',
  latinAndNumbers: 'Latin letters and digits only',
  latinAndSpaces: 'Latin letters and spaces only',
  phone: 'Phone number is incorrect',
  safe: 'Latin letters, numbers and special characters only',
};

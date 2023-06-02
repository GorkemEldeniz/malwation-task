const validatePhoneNumber = (value:string|undefined):boolean | undefined => {
  const phoneNumberRegex = /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g; // Telefon numarası için uygun bir regex deseni

  return phoneNumberRegex.test(value ? value : '') || undefined;
};

const isEmpty = (obj : object ) => {
  return Object.values(obj).length === 0
}


export {
  validatePhoneNumber,
  isEmpty
}
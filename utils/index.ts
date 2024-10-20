export const convertFormat = (data: string) => {
  const cleanData = data.replace(/^0+/, '');

  return `62${cleanData}`;
}

export const  maskPhoneNumber = (phoneNumber: string)=> {
  // const phonePattern = /^(\d{4})(\d{4})(\d{4})$/;
  // const match = phoneNumber.match(phonePattern);

  // if (match) {
  //   return `${match[1]}-${match[2]}-${match[3]}`;
  // }
  // return phoneNumber;
  const splitedBy4 = phoneNumber.match(/.{1,4}/g)
  return splitedBy4?.join("-")
}
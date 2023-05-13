// email validation
let regex = new RegExp('[a-z0-9]+@[admin]+.com$');
export const emailValidation = (address) => {
    return regex.test(address)
}

// get base 64 image
export const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
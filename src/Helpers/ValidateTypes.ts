function ValidateString(value?: string) {
    if(!value || value === "") {
        return false;
    } else {
        return true;
    }
}

export {
    ValidateString
}
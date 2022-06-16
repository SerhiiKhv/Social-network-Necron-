export const MaxLength = (maxLenght) => (value) => {
    if (value.length > maxLenght) {
        return `Max lenght is ${maxLenght} symbols`
    }
    return undefined;
}

export const required = value => {
    if (value) {
        return undefined;
    }
    return "Field is required";
}
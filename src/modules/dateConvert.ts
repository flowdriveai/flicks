const dateConverted = (date_str: string) => {
    const date = new Date(date_str);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

export default dateConverted;
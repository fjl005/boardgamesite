export const convertDate = (inputDate) => {
    const date = new Date(inputDate);

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}
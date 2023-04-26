export const concatTitle = (title) => {
    const noQMarks = title.replaceAll("?", "");
    return noQMarks.replaceAll(" ", "").toLowerCase();
}
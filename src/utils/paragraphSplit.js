export const paragraphSplit = (article) => {
    const paragraphs = article.split(/\n/g);
    return paragraphs;
}
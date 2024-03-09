export function sortByLikesInPlace(dataArray, setPost) {
    let a = dataArray.slice();
    a.sort((a, b) => b.vote - a.vote);
    setPost([...a])
}

export function sortByNewestInPlace(dataArray, setPost) {
    let a = dataArray.slice();
    a.sort((a, b) => new Date(b.date) - new Date(a.date));
    setPost([...a])
}

export function searchPosts(query, post, setPost, getpost) {
    query = query.toLowerCase();
    if (query.length === 0) {
        getpost()
        return
    }
    const results = post.filter(post => post.title.toLowerCase().includes(query));
    setPost([...results]);
}

export function generateRandomColorHexCode() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}
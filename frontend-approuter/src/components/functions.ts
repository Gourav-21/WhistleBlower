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

export function searchPosts(query, post, setPost, reset) {
    query = query.toLowerCase();
    if (query.length === 0) {
        reset()
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

const adjectives = ['happy', 'brave', 'curious', 'friendly', 'clever', 'mysterious', 'playful', 'grateful', 'silly'];
const nouns = ['cat', 'dog', 'bird', 'unicorn', 'dragon', 'coffee', 'moon', 'star', 'book', 'pizza'];

export function generateRandomUsername() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    // Optional: Add a random number to the username
    const randomNumber = Math.floor(Math.random() * 1000);

    return `${randomAdjective}_${randomNoun}_${randomNumber}`;
}
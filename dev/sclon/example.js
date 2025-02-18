async function getSklonlxkand(slovo) {
    const response = await fetch('http://localhost:5000/sklonlxkand', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slovo }),
    });
    const data = await response.json();
    return data;
}

// Пример использования
getSklonlxkand('кот').then(result => console.log(result));

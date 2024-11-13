const fetchJSON = async (url) => {
    const response = await fetch(url);
    const text = await response.text();

    // remove comments
    const jsonString = text.replace(/\/\*[^*]*\*\//g, '').trim();

    const data = JSON.parse(jsonString);
    return data;
}

const genHtml = (div) => (channels) => {
    const gridContainer = document.getElementById(div);
    channels.forEach(channel => {
        const item = document.createElement("div");
        item.classList.add("grid-item");
        item.innerHTML = `
            <a href="${channel.url}" target="_blank">
                <div class="grid-item-in">
                    <div class="name">${channel.name}</div>
                    <div class="img-bx"><img src="${channel.img}" alt="${channel.name}"></div>
                </div>
            </a>
        `;
        gridContainer.appendChild(item);
    });
};

fetchJSON('livetv.json')
    .then(genHtml('livetv-grid'))
    .catch(error => console.error('Erro (livetv):', error));

fetchJSON('streaming.json')
    .then(genHtml('streaming-grid'))
    .catch(error => console.error('Erro (streaming):', error));
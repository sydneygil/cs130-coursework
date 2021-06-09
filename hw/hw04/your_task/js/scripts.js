const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    let trackSect = document.querySelector('#track-section')
    let tracks = trackSect.querySelector('#tracks')
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data[0] == undefined) {
                tracks.innerHTML = "No tracks found";
            }
            else {
                for (i = 0; i < 5; i++) {
                    tracks.innerHTML += 
                    `<section class="track-item preview" data-preview-track="${data[i].preview_url}">
                        <img src="${data[i].album.image_url}">
                        <i class="fas play-track fa-play" aria-hidden="true"></i>
                        <div class="label">
                            <h3>${data[i].name}</h3>
                            <p>
                                ${data[i].artist.name}
                            </p>
                            </div>
                    </section>`;
                }
            }
    });
};

const getAlbums = (term) => {
    let albumSect = document.querySelector('#album-section')
    let albums = albumSect.querySelector('#albums')
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data[0] == undefined) {
                albums.innerHTML = "No albums";
            }
            else {
                for (i = 0; i < data.length; i++) {
                    albums.innerHTML += 
                    `<section class="album-card" id="${data[i].id}">
                        <div>
                            <img src="${data[i].image_url}">
                            <h3>${data[i].name}</h3>
                            <div class="footer">
                                <a href="${data[i].spotify_url}" target="_blank">
                                    view on spotify
                                </a>
                            </div>
                        </div>
                    </section>`
                }
            }
        }); 
};

const getArtist = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const artist = data[0];
                document.getElementById("artist").innerHTML = `
                <section class="artist-card" id="${artist.id}">
                    <div>
                    <img src="${artist.image_url}">
                    <h3>${artist.name}</h3>
                    <div class="footer">
                        <a href="${artist.spotify_url}" target="_blank">
                            view on spotify
                            </a>
                        </div>
                    </div>
                </section>
                `;
            } else {
                document.getElementById("artist").innerHTML = "No artists";
            }
        });
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};
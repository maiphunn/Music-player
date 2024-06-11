const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')

const app = {
    currentIndex: 0,
    songs: [
        {
            name: "Chạy Ngay Đi",
            singer: "Sơn Tùng MTP",
            path: "./assets/mp3/ChayNgayDi-SonTungMTP-5468704.mp3",
            image: "./assets/img/chayngaydi.jpg"
        },
        {
            name: "Cắt Đôi Nỗi Sầu",
            singer: "Tăng Duy Tân",
            path: "./assets/mp3/catdoinoisau.mp3",
            image:
                "./assets/img/Cat-Doi-Noi-Sau-Tang-Duy-Tan-Drum7.jpg"
        },
        {
            name: "Chúng ta của tương lai",
            singer: "Sơn Tùng MTP",
            path:
                "./assets/mp3/chungtacuatuonglai.mp3",
            image: "./assets/img/Chung-ta-cua-tuong-lai.jpg"
        },
        {
            name: "Thiên lý ơi",
            singer: "J97",
            path: "./assets/mp3/thienlyoi.mp3",
            image:
                "./assets/img/Thien-Ly-Oi-Jack-J97.jpg"
        },
        {
            name: "Nơi này có anh",
            singer: "Sơn Tùng MTP",
            path: "./assets/mp3/noinaycoanh.mp3",
            image:
                "./assets/mp3/noinaycoanh.mp3"
        },
        {
            name: "Lạc trôi",
            singer: "Sơn Tùng MTP",
            path:
                "./assets/mp3/lactroi.mp3",
            image:
                "./assets/img/Lac-Troi-Son-Tung-M-TP.jpg"
        },
        {
            name: "Khuôn Mặt Đáng Thương",
            singer: "Sơn Tùng MTP",
            path: "./assets/mp3/khuonmatdangthuong.mp3",
            image:
                "./assets/img/Khuon-Mat-Dang-Thuong-Son-Tung-M-TP.jpg"
        }
    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
            `
        })

        $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function () {
        const cdWidth = cd.offsetWidth

        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        playBtn.onclick = function () {
            audio.play()
            player.classList.add('play')
        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    start: function () {
        this.handleEvent()
        this.defineProperties()
        this.loadCurrentSong()
        this.render()
    }
}

app.start()
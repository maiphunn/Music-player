const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playlist = $('.playlist')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
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
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
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

        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 20000,
            iteration: Infinity,
        })
        cdThumbAnimate.pause()

        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        progress.onchange = function (e) {
            console.log(e.target.value)
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 200)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {
        this.handleEvent()
        this.defineProperties()
        this.loadCurrentSong()
        this.render()
    }
}

app.start()
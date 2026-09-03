/* =====================================================
   WEB TỎ TÌNH
   TRUNAL QR
===================================================== */


/* =====================================================
   KHÁCH HÀNG
   CHỈ SỬA PHẦN NÀY
===================================================== */

const DATA = {

    boyName: "Nguyễn Minh",

    girlName: "Thuỳ Nhi",

    proposal:
        "Em đồng ý làm người yêu của anh nhé?"

};


/* =====================================================
   CANVAS TRÁI TIM
===================================================== */

const canvas =
    document.getElementById(
        "heartCanvas"
    );

const ctx =
    canvas.getContext("2d");


let width =
    window.innerWidth;

let height =
    window.innerHeight;

let dpr =
    Math.min(
        window.devicePixelRatio || 1,
        2
    );


function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;


    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



/* =====================================================
   HEART PARTICLES
===================================================== */

/*
    Không dùng hàng ngàn div.

    Tất cả được vẽ trực tiếp trên Canvas.
*/

const hearts = [];

const HEART_COUNT =
    window.innerWidth < 700
        ? 650
        : 1200;



class Heart {

    constructor() {

        this.spawn(
            true
        );

    }


    spawn(
        initial = false
    ) {

        this.x =
            Math.random() *
            width;


        this.y =
            initial
                ? Math.random() * height
                : height + 50;


        /*
            Kích thước rất đa dạng
        */

        this.size =
            3 +
            Math.random() * 18;


        /*
            tốc độ bay
        */

        this.speed =
            .15 +
            Math.random() * 1.25;


        /*
            bay ngang
        */

        this.vx =
            -0.35 +
            Math.random() * .7;


        /*
            độ xoay
        */

        this.rotation =
            Math.random() *
            Math.PI *
            2;


        this.rotationSpeed =
            -.025 +
            Math.random() * .05;


        /*
            opacity
        */

        this.alpha =
            .12 +
            Math.random() * .8;


        /*
            dao động
        */

        this.wave =
            Math.random() *
            Math.PI *
            2;


        this.waveSpeed =
            .005 +
            Math.random() * .025;


        /*
            mỗi trái tim có độ "ảo"
            khác nhau
        */

        this.twinkle =
            Math.random() *
            Math.PI *
            2;


        this.twinkleSpeed =
            .01 +
            Math.random() * .03;


        /*
            màu
        */

        const colors = [

            "255,255,255",

            "255,190,215",

            "255,105,165",

            "255,65,135",

            "255,220,235"

        ];


        this.color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

    }


    update() {

        /*
            bay lên
        */

        this.y -=
            this.speed;


        /*
            chuyển động ngang
            hơi uốn lượn
        */

        this.wave +=
            this.waveSpeed;


        this.x +=
            this.vx +
            Math.sin(this.wave) *
            .35;


        /*
            xoay
        */

        this.rotation +=
            this.rotationSpeed;


        /*
            lấp lánh
        */

        this.twinkle +=
            this.twinkleSpeed;


        /*
            ra khỏi màn hình
        */

        if (
            this.y <
            -40
        ) {

            this.spawn(
                false
            );

        }


        if (
            this.x <
            -60
        ) {

            this.x =
                width + 40;

        }


        if (
            this.x >
            width + 60
        ) {

            this.x =
                -40;

        }

    }


    draw() {

        ctx.save();


        ctx.translate(
            this.x,
            this.y
        );


        ctx.rotate(
            this.rotation
        );


        /*
            opacity biến thiên
        */

        const shimmer =
            .65 +
            Math.sin(
                this.twinkle
            ) *
            .35;


        const alpha =
            this.alpha *
            shimmer;


        ctx.globalAlpha =
            alpha;


        ctx.fillStyle =
            `rgba(${this.color},${alpha})`;


        /*
            ánh sáng
        */

        ctx.shadowBlur =
            this.size *
            1.8;


        ctx.shadowColor =
            `rgba(255,70,150,${alpha})`;


        /*
            vẽ trái tim
        */

        const s =
            this.size;


        ctx.beginPath();


        ctx.moveTo(
            0,
            s * .35
        );


        ctx.bezierCurveTo(
            -s * .9,
            -s * .15,
            -s * .8,
            -s * .9,
            0,
            -s * .35
        );


        ctx.bezierCurveTo(
            s * .8,
            -s * .9,
            s * .9,
            -s * .15,
            0,
            s * .35
        );


        ctx.closePath();


        ctx.fill();


        ctx.restore();

    }

}



/* =====================================================
   TẠO HÀNG NGÀN TRÁI TIM
===================================================== */

for (
    let i = 0;
    i < HEART_COUNT;
    i++
) {

    hearts.push(
        new Heart()
    );

}



/* =====================================================
   ANIMATION TRÁI TIM
===================================================== */

let heartAnimation =
    true;


function animateHearts() {

    if (!heartAnimation) {

        return;

    }


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    for (
        const heart of hearts
    ) {

        heart.update();

        heart.draw();

    }


    requestAnimationFrame(
        animateHearts
    );

}


animateHearts();



/* =====================================================
   CÂU TỎ TÌNH
===================================================== */

const question =
    document.getElementById(
        "question"
    );

const answerArea =
    document.getElementById(
        "answerArea"
    );


question.textContent =
    DATA.proposal;


/*
    Ban đầu hiện câu hỏi
*/

setTimeout(
    () => {

        question.classList.add(
            "show"
        );

    },
    900
);


/*
    Sau một khoảng thời gian,
    câu hỏi biến mất
*/

setTimeout(
    () => {

        question.classList.remove(
            "show"
        );

        question.classList.add(
            "hide"
        );

    },
    5000
);


/*
    Sau khi câu hỏi biến mất,
    mới xuất hiện nút
*/

setTimeout(
    () => {

        answerArea.classList.add(
            "show"
        );

    },
    6000
);



/* =====================================================
   NÚT NHẤN GIỮ
===================================================== */

const holdButton =
    document.getElementById(
        "holdButton"
    );


const holdProgress =
    document.getElementById(
        "holdProgress"
    );


let holding =
    false;


let holdStart =
    0;


let holdFrame =
    null;


/*
    2 giây
*/

const HOLD_TIME =
    2000;



/* =====================================================
   BẮT ĐẦU NHẤN
===================================================== */

function startHold(
    event
) {

    event.preventDefault();


    if (holding) {

        return;

    }


    holding =
        true;


    holdStart =
        performance.now();


    holdButton.classList.add(
        "holding"
    );


    holdProgress.classList.add(
        "show"
    );


    updateHold();

}



/* =====================================================
   TÍNH TIẾN ĐỘ
===================================================== */

function updateHold() {

    if (!holding) {

        return;

    }


    const elapsed =
        performance.now() -
        holdStart;


    const progress =
        Math.min(
            elapsed /
            HOLD_TIME,
            1
        );


    holdProgress.textContent =
        Math.round(
            progress * 100
        ) + "%";


    /*
        hoàn thành
    */

    if (
        progress >= 1
    ) {

        holding =
            false;


        holdButton.classList.remove(
            "holding"
        );


        holdProgress.classList.remove(
            "show"
        );


        celebrate();


        return;

    }


    holdFrame =
        requestAnimationFrame(
            updateHold
        );

}



/* =====================================================
   THẢ TAY
===================================================== */

function stopHold() {

    if (!holding) {

        return;

    }


    holding =
        false;


    cancelAnimationFrame(
        holdFrame
    );


    holdButton.classList.remove(
        "holding"
    );


    holdProgress.classList.remove(
        "show"
    );


    holdProgress.textContent =
        "0%";

}



/* =====================================================
   MOUSE
===================================================== */

holdButton.addEventListener(
    "mousedown",
    startHold
);


document.addEventListener(
    "mouseup",
    stopHold
);



/* =====================================================
   TOUCH
===================================================== */

holdButton.addEventListener(
    "touchstart",
    startHold,
    {
        passive: false
    }
);


holdButton.addEventListener(
    "touchend",
    stopHold
);


holdButton.addEventListener(
    "touchcancel",
    stopHold
);



/* =====================================================
   POINTER
===================================================== */

holdButton.addEventListener(
    "pointerdown",
    startHold
);


holdButton.addEventListener(
    "pointerup",
    stopHold
);


holdButton.addEventListener(
    "pointercancel",
    stopHold
);



/* =====================================================
   MÀN HÌNH CHÚC MỪNG
===================================================== */

const successScreen =
    document.getElementById(
        "successScreen"
    );


const boyName =
    document.querySelector(
        ".person-left .person-name"
    );


const girlName =
    document.querySelector(
        ".person-right .person-name"
    );


boyName.textContent =
    DATA.boyName;


girlName.textContent =
    DATA.girlName;



/* =====================================================
   PHÁO HOA CANVAS
===================================================== */

const fireworkCanvas =
    document.getElementById(
        "fireworkCanvas"
    );


const fireCtx =
    fireworkCanvas.getContext(
        "2d"
    );


function resizeFireworkCanvas() {

    fireworkCanvas.width =
        window.innerWidth *
        dpr;

    fireworkCanvas.height =
        window.innerHeight *
        dpr;

    fireworkCanvas.style.width =
        window.innerWidth +
        "px";

    fireworkCanvas.style.height =
        window.innerHeight +
        "px";


    fireCtx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeFireworkCanvas();


window.addEventListener(
    "resize",
    resizeFireworkCanvas
);



/* =====================================================
   FIREWORK PARTICLES
===================================================== */

const fireworks = [];


class FireworkParticle {

    constructor(
        x,
        y,
        angle,
        speed
    ) {

        this.x =
            x;

        this.y =
            y;

        this.vx =
            Math.cos(angle) *
            speed;

        this.vy =
            Math.sin(angle) *
            speed;

        this.life =
            1;

        this.size =
            1 +
            Math.random() *
            3;

    }


    update() {

        this.x +=
            this.vx;

        this.y +=
            this.vy;

        this.vx *=
            .985;

        this.vy *=
            .985;

        this.vy +=
            .025;

        this.life -=
            .015;

    }


    draw() {

        fireCtx.save();


        fireCtx.globalAlpha =
            Math.max(
                this.life,
                0
            );


        fireCtx.fillStyle =
            "white";


        fireCtx.shadowBlur =
            15;


        fireCtx.shadowColor =
            "#ff6fa4";


        fireCtx.beginPath();


        fireCtx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );


        fireCtx.fill();


        fireCtx.restore();

    }

}



/* =====================================================
   TẠO PHÁO HOA
===================================================== */

function createFirework(
    x,
    y
) {

    const count =
        100;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            Math.PI *
            2 *
            i /
            count;


        const speed =
            2 +
            Math.random() *
            5;


        fireworks.push(
            new FireworkParticle(
                x,
                y,
                angle,
                speed
            )
        );

    }

}



/* =====================================================
   ANIMATE FIREWORK
===================================================== */

function animateFireworks() {

    fireCtx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    for (
        let i =
        fireworks.length - 1;

        i >= 0;

        i--
    ) {

        const particle =
            fireworks[i];


        particle.update();

        particle.draw();


        if (
            particle.life <= 0
        ) {

            fireworks.splice(
                i,
                1
            );

        }

    }


    requestAnimationFrame(
        animateFireworks
    );

}


animateFireworks();



/* =====================================================
   HIỆU ỨNG CHÚC MỪNG
===================================================== */

function celebrationFireworks() {

    const positions = [

        [
            width * .15,
            height * .25
        ],

        [
            width * .85,
            height * .25
        ],

        [
            width * .5,
            height * .15
        ],

        [
            width * .25,
            height * .6
        ],

        [
            width * .75,
            height * .6
        ],

        [
            width * .5,
            height * .45
        ]

    ];


    positions.forEach(
        (
            position,
            index
        ) => {

            setTimeout(
                () => {

                    createFirework(
                        position[0],
                        position[1]
                    );

                },
                index * 220
            );

        }
    );


    /*
        pháo hoa nền tiếp tục
    */

    setInterval(
        () => {

            createFirework(
                Math.random() *
                width,

                80 +
                Math.random() *
                height *
                .55
            );

        },
        1300
    );

}



/* =====================================================
   CELEBRATE
===================================================== */

function celebrate() {

    /*
        chuyển sang nền thành công
    */

    successScreen.classList.add(
        "show"
    );


    /*
        tắt bớt chuyển động tim
    */

    heartAnimation =
        false;


    /*
        pháo hoa
    */

    setTimeout(
        celebrationFireworks,
        300
    );

}
/* =====================================================
   NHẠC NỀN
   ===================================================== */

const backgroundMusic =
    document.getElementById("backgroundMusic");

let musicStarted = false;


function startBackgroundMusic() {

    if (!backgroundMusic || musicStarted) {
        return;
    }

    backgroundMusic.volume = 0.55;

    const playPromise =
        backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                musicStarted = true;

            })
            .catch(() => {

                /*
                    Điện thoại có thể chặn
                    autoplay có tiếng.
                    Khi người dùng chạm vào web
                    sẽ thử phát lại.
                */

            });

    }

}


/* =====================================================
   THỬ TỰ PHÁT KHI MỞ WEB
   ===================================================== */

window.addEventListener(
    "load",
    () => {

        startBackgroundMusic();

        setTimeout(
            startBackgroundMusic,
            300
        );

    }
);


/* =====================================================
   NẾU AUTOPLAY BỊ CHẶN
   CHẠM ĐẦU TIÊN SẼ BẬT NHẠC
   ===================================================== */

[
    "pointerdown",
    "touchstart",
    "click"
].forEach(
    (eventName) => {

        document.addEventListener(
            eventName,
            () => {

                startBackgroundMusic();

            },
            {
                once: true,
                passive: true
            }
        );

    }
);


/* =====================================================
   KHI QUAY LẠI TRANG
   ===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState === "visible" &&
            musicStarted &&
            backgroundMusic &&
            backgroundMusic.paused
        ) {

            backgroundMusic
                .play()
                .catch(() => {});

        }

    }
);
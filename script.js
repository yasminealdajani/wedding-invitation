/* =====================================================
   OPENING
===================================================== */

const sealButton =
    document.getElementById("sealButton");

const opening =
    document.getElementById("opening");

const invitation =
    document.getElementById("invitation");

const music =
    document.getElementById("weddingMusic");

let opened = false;


/* =====================================================
   SEAL CLICK
===================================================== */

sealButton.addEventListener(
    "click",
    function () {

        if (opened) {
            return;
        }

        opened = true;


        /* START MUSIC */

        music.volume = 0.8;

        music.play().catch(
            function (error) {

                console.log(
                    "Music error:",
                    error
                );

            }
        );


        /* START ENVELOPE */

        opening.classList.add(
            "opening-animation"
        );


        /*
           نخلي المستخدم يشوف
           حركة الختم والفتح
        */

        setTimeout(
            function () {

                opening.classList.add(
                    "hide"
                );

                invitation.classList.add(
                    "show"
                );

                document.body.style.overflowY =
                    "auto";

                window.scrollTo(
                    0,
                    0
                );

            },
            2200
        );

    }
);


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date(
        "2026-11-16T19:00:00+02:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        weddingDate - now;


    if (difference <= 0) {

        document.getElementById(
            "days"
        ).textContent = "00";


        document.getElementById(
            "hours"
        ).textContent = "00";


        document.getElementById(
            "minutes"
        ).textContent = "00";


        document.getElementById(
            "seconds"
        ).textContent = "00";


        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(
            2,
            "0"
        );


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   RSVP
===================================================== */

/*
   IMPORTANT:
   بعد إنشاء Google Form سنضع رابط الإرسال
   وحقول Google Form هنا.
*/

const rsvpForm =
    document.getElementById(
        "rsvpForm"
    );


rsvpForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "guestName"
            ).value.trim();


        const attendance =
            document.querySelector(
                'input[name="attendance"]:checked'
            );


        const guests =
            document.getElementById(
                "guestsCount"
            ).value;


        const message =
            document.getElementById(
                "guestMessage"
            ).value.trim();


        if (!name || !attendance) {

            return;

        }


        /*
           حاليًا نعرض رسالة مؤقتة.
           بعد ربط Google Form:
           البيانات ستذهب إلى Google Sheets.
        */

        const formMessage =
            document.getElementById(
                "formMessage"
            );


        formMessage.textContent =
            "شكرًا لتأكيد حضوركم 🤍";


        console.log({
            name: name,
            attendance: attendance.value,
            guests: guests,
            message: message
        });


        rsvpForm.reset();

    }
);
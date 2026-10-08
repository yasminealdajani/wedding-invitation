const sealButton = document.getElementById("sealButton");
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const music = document.getElementById("weddingMusic");

let opened = false;


/* =====================================================
   OPEN ENVELOPE + PLAY MUSIC
===================================================== */

sealButton.addEventListener("click", function () {

    if (opened) return;

    opened = true;

    music.volume = 0.8;

    music.play().catch(function (error) {
        console.log("Music error:", error);
    });

    opening.classList.add("opening-animation");

    setTimeout(function () {

        opening.classList.add("hide");

        invitation.classList.add("show");

        document.body.style.overflowY = "auto";

        window.scrollTo(0, 0);

    }, 2200);

});


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date("2026-11-16T19:00:00+02:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;


    if (difference <= 0) {

        ["days", "hours", "minutes", "seconds"].forEach(function (id) {

            document.getElementById(id).textContent = "00";

        });

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );


    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);



/* =====================================================
   RSVP → GOOGLE APPS SCRIPT → GOOGLE FORMS → SHEETS
===================================================== */

const rsvpForm = document.getElementById("rsvpForm");


rsvpForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name =
        document.getElementById("guestName").value.trim();


    const attendance =
        document.querySelector(
            'input[name="attendance"]:checked'
        );


    const guests =
        document.getElementById("guestsCount").value;


    const message =
        document.getElementById("guestMessage").value.trim();


    const formMessage =
        document.getElementById("formMessage");


    /* =================================================
       CHECK REQUIRED FIELDS
    ================================================= */

    if (!name || !attendance) {

        formMessage.textContent =
            "يرجى تعبئة الاسم واختيار حالة الحضور.";

        return;
    }


    /* =================================================
       GOOGLE APPS SCRIPT WEB APP
    ================================================= */

    const scriptURL =
        "https://script.google.com/macros/s/AKfycbzRmedjGUBioW0RTrEPgBSM7MdjswR4C2gJsR1xXzsKRhV_nGvao5C_6ho8eVs-HbQ6/exec";


    /* =================================================
       PREVENT DOUBLE SUBMISSION
    ================================================= */

    const sendButton =
        rsvpForm.querySelector(".send-button");

    sendButton.disabled = true;

    sendButton.textContent = "جاري الإرسال...";


    /* =================================================
       PREPARE DATA
    ================================================= */

    const data = new URLSearchParams();


    data.append(
        "name",
        name
    );


    data.append(
        "attendance",
        attendance.value
    );


    data.append(
        "guests",
        guests
    );


    data.append(
        "message",
        message
    );


    /* =================================================
       SEND TO GOOGLE APPS SCRIPT
    ================================================= */

    try {

        await fetch(scriptURL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
            },

            body: data.toString()

        });


        /* =================================================
           SUCCESS
        ================================================= */

        formMessage.textContent =
            "🤍 تم تأكيد حضوركم بنجاح ";


        rsvpForm.reset();


    } catch (error) {

        console.error(
            "RSVP Error:",
            error
        );


        formMessage.textContent =
            "حدث خطأ، يرجى المحاولة مرة أخرى.";

    }


    /* =================================================
       RESTORE BUTTON
    ================================================= */

    sendButton.disabled = false;

    sendButton.textContent = "إرسال";

});
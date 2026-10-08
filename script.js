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
   RSVP → GOOGLE FORMS / GOOGLE SHEETS
===================================================== */

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function (event) {

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


    /* CHECK REQUIRED FIELDS */

    if (!name || !attendance) {

        formMessage.textContent =
            "يرجى تعبئة الاسم واختيار حالة الحضور.";

        return;
    }


    /* =================================================
       GOOGLE FORM URL
    ================================================= */

    const googleFormURL =
        "https://docs.google.com/forms/d/e/1FAIpQLScRIxMUIhDe12LPBh18DtRmNyZZH60O00F6iJzrocrDrFfoSg/formResponse";


    /* =================================================
       CREATE HIDDEN IFRAME
    ================================================= */

    const iframe =
        document.createElement("iframe");

    iframe.name =
        "google-form-hidden";

    iframe.style.display =
        "none";

    document.body.appendChild(iframe);


    /* =================================================
       CREATE FORM TO SEND TO GOOGLE
    ================================================= */

    const googleForm =
        document.createElement("form");

    googleForm.action =
        googleFormURL;

    googleForm.method =
        "POST";

    googleForm.target =
        "google-form-hidden";

    googleForm.style.display =
        "none";


    /* =================================================
       NAME
    ================================================= */

    const nameInput =
        document.createElement("input");

    nameInput.type =
        "hidden";

    nameInput.name =
        "entry.1525417623";

    nameInput.value =
        name;

    googleForm.appendChild(nameInput);


    /* =================================================
       ATTENDANCE
    ================================================= */

    const attendanceInput =
        document.createElement("input");

    attendanceInput.type =
        "hidden";

    attendanceInput.name =
        "entry.1802258243";

    attendanceInput.value =
        attendance.value;

    googleForm.appendChild(attendanceInput);


    /* =================================================
       NUMBER OF GUESTS
    ================================================= */

    const guestsInput =
        document.createElement("input");

    guestsInput.type =
        "hidden";

    guestsInput.name =
        "entry.1824842101";

    guestsInput.value =
        guests;

    googleForm.appendChild(guestsInput);


    /* =================================================
       MESSAGE
    ================================================= */

    const messageInput =
        document.createElement("input");

    messageInput.type =
        "hidden";

    messageInput.name =
        "entry.799579534";

    messageInput.value =
        message;

    googleForm.appendChild(messageInput);


    /* =================================================
       SEND
    ================================================= */

    document.body.appendChild(googleForm);

    googleForm.submit();


    /* =================================================
       SUCCESS MESSAGE
    ================================================= */

    formMessage.textContent =
        "تم تأكيد حضوركم بنجاح 🤍";


    /* CLEAR FORM */

    rsvpForm.reset();


    /* CLEAN UP */

    setTimeout(function () {

        googleForm.remove();

        iframe.remove();

    }, 3000);

});
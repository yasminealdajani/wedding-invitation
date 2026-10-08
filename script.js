const sealButton = document.getElementById("sealButton");
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const music = document.getElementById("weddingMusic");

let opened = false;

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


/* =========================
   COUNTDOWN
========================= */

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
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
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


/* =========================
   RSVP → WHATSAPP
========================= */

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


    /* التحقق من البيانات */

    if (!name) {

        formMessage.textContent =
            "يرجى كتابة الاسم الكريم.";

        return;
    }


    if (!attendance) {

        formMessage.textContent =
            "يرجى اختيار حالة الحضور.";

        return;
    }


    /* رقم واتساب */

    const whatsappNumber = "972599169096";


    /* تجهيز الرسالة */

    let whatsappMessage =
        "💍 تأكيد حضور حفل Ayman & Yasmine\n\n";

    whatsappMessage +=
        "الاسم: " + name + "\n";

    whatsappMessage +=
        "الحضور: " + attendance.value + "\n";

    whatsappMessage +=
        "عدد المرافقين: " + guests + "\n";

    if (message) {

        whatsappMessage +=
            "الرسالة: " + message + "\n";
    }


    whatsappMessage +=
        "\n16/11/2026 🤍";


    /* تحويل الرسالة إلى رابط */

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);


    /* فتح واتساب */

    window.open(
        whatsappURL,
        "_blank"
    );


    /* رسالة للمستخدم */

    formMessage.textContent =
        "تم تجهيز رسالة التأكيد، يرجى الضغط على إرسال في واتساب 🤍";


    /* تفريغ النموذج */

    rsvpForm.reset();

});
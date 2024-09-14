const btnReservasi = document.querySelector(".btn-reservasi");
const popup = document.querySelector(".popup");
const popupMain = document.querySelector(".popup-main");
const popupSuccess = document.querySelector(".popup-success");
const popupFailed = document.querySelector(".popup-failed");
const closePopup = document.querySelectorAll(".popup-close");
const attendance = document.querySelector("#kehadiran");
const fjt = document.querySelector(".form-jumlah-tamu");
const btnSubmit = document.querySelector(".btn-submit");
const btnLoading = document.querySelector(".btn-loading");
const audioControl = document.querySelector(".audio-control");
const iconPlay = document.querySelector(".icon-play");
const iconPause = document.querySelector(".icon-pause");
const bgm = document.querySelector(".bgm");
const bukaUndangan = document.querySelector(".buka-undangan");

if (btnReservasi) {
    btnReservasi.addEventListener("click", () => {
        popupMain.classList.remove("hidden");
        popupSuccess.classList.add("hidden");
        popupFailed.classList.add("hidden");
        popup.classList.add("show");
        setTimeout(() => {
            popup.classList.add("show-slow");
        }, 100);
    });

    closePopup.forEach((btn) => {
        btn.addEventListener("click", () => {
            popup.classList.remove("show-slow");
            setTimeout(() => {
                popup.classList.remove("show");
                popupMain.classList.add("hidden");
                popupSuccess.classList.remove("hidden");
                popupFailed.classList.remove("hidden");
            }, 250);
        });
    });

    audioControl.addEventListener("click", () => {
        if (bgm.paused) {
            bgm.play();
            iconPlay.classList.add("hidden");
            iconPause.classList.remove("hidden");
        } else {
            bgm.pause();
            iconPlay.classList.remove("hidden");
            iconPause.classList.add("hidden");
        }
    });

    bukaUndangan.addEventListener("click", () => {
        bgm.muted = false;
        bgm.play();

        iconPlay.classList.add("hidden");
        iconPause.classList.remove("hidden");
    });

    // document.addEventListener("visibilitychange", function () {
    //     if (document.hidden && !bgm.paused) {
    //         bgm.pause();
    //         iconPlay.classList.remove("hidden");
    //         iconPause.classList.add("hidden");
    //     }
    // });

    function startCountdown(targetDate) {
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                (document.getElementById("days").innerText = "00"), (document.getElementById("hours").innerText = "00"), (document.getElementById("minutes").innerText = "00"), (document.getElementById("seconds").innerText = "00");
                clearInterval(timerInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            (document.getElementById("days").innerText = days), (document.getElementById("hours").innerText = hours), (document.getElementById("minutes").innerText = minutes), (document.getElementById("seconds").innerText = seconds);
        }

        updateCountdown(); // Initial call to show the countdown immediately
        const timerInterval = setInterval(updateCountdown, 1000);
    }

    const targetDate = new Date("2024-10-18T07:00:00").getTime();
    startCountdown(targetDate);

    attendance.addEventListener("change", () => {
        if (attendance.value == "tidak") {
            fjt.classList.add("hidden");
        } else {
            fjt.classList.remove("hidden");
        }
    });

    const scriptURL = "https://script.google.com/macros/s/AKfycbw5H3YHfhMz-qeuuxViHCqUEBIAbJmPjZTbLjwipaTOLJw_oKKSFJ4heK3M5D5EN8sZqw/exec";
    const form = document.forms["reservasi"];

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        btnSubmit.classList.toggle("hidden");
        btnLoading.classList.toggle("hidden");
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
            .then((response) => {
                btnSubmit.classList.toggle("hidden");
                btnLoading.classList.toggle("hidden");
                popupMain.classList.add("hidden");
                popupSuccess.classList.remove("hidden");
                form.reset();
                console.log("Success!", response);
            })
            .catch((error) => {
                popupMain.classList.add("hidden");
                popupFailed.classList.remove("hidden");
                form.reset();
                console.error("Error!", error.message);
            });
    });
}


document.addEventListener("DOMContentLoaded", function () {

    // PAGE NAVIGATION
    const pages = document.querySelectorAll(".page");
    const navButtons = document.querySelectorAll(".nav-btn");

    function goToPage(pageId) {
        pages.forEach(page => page.classList.remove("active"));
        navButtons.forEach(button => button.classList.remove("active"));

        const targetPage = document.getElementById(pageId);

        if (targetPage) {
            targetPage.classList.add("active");
        }

        const activeButton = document.querySelector(
            `[data-page="${pageId}"]`
        );

        if (activeButton) {
            activeButton.classList.add("active");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.goToPage = goToPage;

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            goToPage(button.dataset.page);
        });
    });


    // STAR PARTICLES
    const starsContainer = document.getElementById("stars");

    if (starsContainer) {
        for (let i = 0; i < 65; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.animationDelay = Math.random() * 3 + "s";
            starsContainer.appendChild(star);
        }
    }


    // CONFETTI EFFECT
    function createConfetti() {
        const colors = ["#e7c58c", "#d99aab", "#fff5ed", "#b77caa"];

        for (let i = 0; i < 65; i++) {
            const particle = document.createElement("div");

            particle.style.position = "fixed";
            particle.style.left = Math.random() * 100 + "vw";
            particle.style.top = "-15px";
            particle.style.width = "8px";
            particle.style.height = "8px";
            particle.style.background =
                colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = "50%";
            particle.style.zIndex = "1000";
            particle.style.pointerEvents = "none";

            document.body.appendChild(particle);

            const x = (Math.random() - 0.5) * 300;
            const duration = 2000 + Math.random() * 2000;

            particle.animate([
                {
                    transform: "translate(0, 0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform: `translate(${x}px, 100vh) rotate(720deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: "ease-out"
            });

            setTimeout(() => particle.remove(), duration);
        }
    }


    // BIRTHDAY CANDLES
    const blowButton = document.getElementById("blowButton");
    const candles = document.querySelectorAll(".candle");
    const wishMessage = document.getElementById("wishMessage");

    let candlesBlown = false;

    if (blowButton) {
        blowButton.addEventListener("click", function () {

            if (!candlesBlown) {
                candlesBlown = true;

                candles.forEach((candle, index) => {
                    setTimeout(() => {
                        candle.classList.add("blown");
                    }, index * 350);
                });

                blowButton.textContent = "Wish Made ✨";

                if (wishMessage) {
                    wishMessage.textContent =
                        "اللہ آپ کی ہر نیک خواہش پوری فرمائے۔ آمین!";
                }

                createConfetti();

            } else {
                if (wishMessage) {
                    wishMessage.textContent =
                        "آج کا دن آپ کے نام، امنا! ہمیشہ خوش رہیں۔ ♡";
                }

                blowButton.textContent = "Continue Your Surprise →";
                goToPage("wishes");
            }
        });
    }


    // OLD OFFICIAL REPORT (if old HTML is still present)
    const oldReportButton = document.getElementById("reportButton");

    if (oldReportButton) {
        oldReportButton.addEventListener("click", function () {
            const result = document.getElementById("reportResult");

            if (result) {
                result.textContent =
                    "رپورٹ کے مطابق، امنا کو بہت زیادہ شرارتیں کرنے کا لائسنس حاصل ہے۔ 😂";
            }

            oldReportButton.textContent = "Report Unlocked ✓";
        });
    }


    // OLD INNOCENCE QUIZ (if old HTML is still present)
    const oldQuizOptions = document.querySelectorAll(".quiz-option");

    oldQuizOptions.forEach(option => {
        option.addEventListener("click", function () {
            const result = document.getElementById("quizResult");

            const messages = {
                A: "اتنی معصوم؟ اچھا جی، مزید ثبوت درکار ہیں! 😂",
                B: "کم از کم سچ تو بول دیا! 🤭",
                C: "راز چھپانے کی کوشش ناکام، شک پہلے ہی تھا! 😏"
            };

            if (result) {
                result.textContent = messages[this.dataset.answer] || "";
            }

            oldQuizOptions.forEach(btn => {
                btn.style.borderColor = "rgba(255,255,255,.13)";
            });

            this.style.borderColor = "#e7c58c";
        });
    });


    // RANDOM MISCHIEF BUTTON
    const mischiefMessages = [
        "آپ کو لگتا ہے آپ بہت معصوم ہیں؟ Nice try! 😂",
        "Breaking News: آج کی سب سے بڑی شرارت کرنے والی شخصیت آپ ہیں!",
        "آپ کی مسکراہٹ اچھی ہے، لیکن شرارتیں کچھ زیادہ ہیں! 🤭",
        "آج آپ کو کوئی تنگ نہیں کرے گا، سوائے اس ویب سائٹ کے! 😈",
        "Congratulations! You have officially unlocked VIP birthday treatment! ♡",
        "ہمیشہ خوش رہیے اور شرارتیں تھوڑی کم کیجیے! 😂"
    ];

    const mischiefButton = document.getElementById("mischiefButton");

    if (mischiefButton) {
        mischiefButton.addEventListener("click", function () {
            const randomIndex = Math.floor(
                Math.random() * mischiefMessages.length
            );

            const result = document.getElementById("mischiefResult");

            if (result) {
                result.textContent = mischiefMessages[randomIndex];
            }

            createConfetti();
        });
    }


    // SECRET ENVELOPE OPEN / CLOSE
    const envelopeWrapper = document.getElementById("envelopeWrapper");
    const envelopeButton = document.getElementById("envelopeButton");
    const envelopeHint = document.getElementById("envelopeHint");

    let envelopeOpened = false;

    function toggleSecretEnvelope() {
        if (!envelopeWrapper) return;

        envelopeOpened = !envelopeOpened;

        envelopeWrapper.classList.toggle("open", envelopeOpened);

        if (envelopeButton) {
            envelopeButton.textContent = envelopeOpened
                ? "Close Your Secret Letter ♡"
                : "Open Your Secret Letter ♡";
        }

        if (envelopeHint) {
            envelopeHint.textContent = envelopeOpened
                ? "ایک چھوٹا سا پیغام، صرف آپ کے لیے۔ ♡"
                : "لفافے پر کلک کریں اور اپنا پیغام پڑھیے۔";
        }

        if (envelopeOpened) {
            createConfetti();
        }
    }

    if (envelopeWrapper) {
        envelopeWrapper.addEventListener("click", toggleSecretEnvelope);
    }

    if (envelopeButton) {
        envelopeButton.addEventListener("click", toggleSecretEnvelope);
    }


    // FORTUNE MESSAGES
    const fortuneMessages = [
        "آپ کی مسکراہٹ ہمیشہ آپ کی زندگی کا سب سے خوبصورت حصہ رہے۔ ♡",
        "اللہ آپ کے ہر خواب کو آپ کی توقع سے بھی زیادہ خوبصورت بنائے۔",
        "آپ جہاں بھی جائیں، خوشیاں آپ کے ساتھ چلیں۔ ✨",
        "کبھی اپنی قدر کم مت سمجھیے گا، آپ واقعی بہت خاص ہیں۔",
        "آپ کی زندگی میں کامیابی، سکون اور بے شمار محبتیں ہوں۔",
        "ہمیشہ ایسی ہی شرارتی رہیے، کیونکہ آپ کی یہی ادا خاص ہے۔ ♡",
        "آپ کے آنے والے دن آپ کے گزرے ہوئے دنوں سے زیادہ خوبصورت ہوں۔"
    ];

    let previousFortune = -1;

    window.revealFortune = function () {
        const message = document.getElementById("fortuneMessage");

        if (!message) return;

        let randomIndex;

        do {
            randomIndex = Math.floor(
                Math.random() * fortuneMessages.length
            );
        } while (randomIndex === previousFortune);

        previousFortune = randomIndex;

        message.style.opacity = "0";

        setTimeout(() => {
            message.textContent = fortuneMessages[randomIndex];
            message.style.opacity = "1";
        }, 250);
    };


    // EXTENDED OFFICIAL AMNA REPORT
    const reportButtonNew = document.getElementById("reportButtonNew");

    if (reportButtonNew) {
        reportButtonNew.addEventListener("click", function () {
            const result = document.getElementById("reportResultNew");

            if (result) {
                result.textContent =
                    "سرکاری فیصلہ: امنا شرارتوں میں سزا یافتہ قرار پائی ہیں! 😂 " +
                    "ان کی معصومیت مشکوک ہے، نخرے ناقابلِ برداشت حد تک خوبصورت ہیں، " +
                    "اور انہیں عمر بھر خوش رہنے کی سزا سنائی جاتی ہے۔ ♡";
            }

            this.textContent = "Case Closed! 😂";
            createConfetti();
        });
    }


    // EXTENDED QUESTION QUIZ
    const quizComments = {
        A: [
            "اچھا جی، اب یہ معصومیت کا ڈرامہ بند کریں! 😂",
            "شرارتوں کی فہرست میں یہ جواب بھی شامل ہوگیا۔ 😭",
            "ملکہ صاحبہ، حکم چلانے کی عادت ابھی سے؟ 👑",
            "ثبوت مانگنے پر شکل دکھانا کوئی ثبوت نہیں! 🤭",
            "یہ جواب تو بہت پیارا تھا، رعایت مل گئی۔ ♡"
        ],

        B: [
            "دوسروں پر الزام ڈالنے میں تو آپ ماہر ہیں! 😂",
            "معصوم بننے کی کوشش کامیاب نہیں ہوئی۔ 🤭",
            "اتنے نخرے؟ واقعی خاص شخصیت ہیں آپ! 😌",
            "کم از کم سچ بولنے کی کوشش تو کی۔ 😭",
            "تحفوں کی لسٹ ابھی سے تیار ہے کیا؟ 🎁"
        ],

        C: [
            "واہ! اعترافِ جرم بھی بڑے اعتماد سے! 😭",
            "یعنی شرارت بھی اور معصومیت بھی؟ کمال ہے! 😂",
            "یہی جواب متوقع تھا، کوئی حیرانی نہیں۔ 🤌",
            "اگلا سوال نہیں، پہلے اس کا جواب دیں! 🤣",
            "اچھا، یہ جواب دل جیت گیا۔ ♡"
        ]
    };

    document.querySelectorAll(".fun-question").forEach((question, index) => {
        const options = question.querySelectorAll(".quiz-option-new");
        const feedback = question.querySelector(".question-feedback");

        options.forEach(option => {
            option.addEventListener("click", function () {

                options.forEach(btn => btn.classList.remove("selected"));
                this.classList.add("selected");

                const answer = this.dataset.comment;
                const comments = quizComments[answer];

                if (feedback && comments) {
                    feedback.textContent = comments[index];
                }
            });
        });
    });


    // YES BUTTON RUNS AWAY
    const loveArea = document.getElementById("loveButtonArea");
    const yesButton = document.getElementById("loveYes");
    const noButton = document.getElementById("loveNo");
    const loveResult = document.getElementById("loveResult");

    function moveYesButton() {
        if (!loveArea || !yesButton) return;

        const maxX = Math.max(
            0,
            loveArea.clientWidth - yesButton.offsetWidth
        );

        const maxY = Math.max(
            0,
            loveArea.clientHeight - yesButton.offsetHeight
        );

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        yesButton.style.left = newX + "px";
        yesButton.style.top = newY + "px";
    }

    if (yesButton) {
        yesButton.addEventListener("pointerenter", moveYesButton);

        yesButton.addEventListener("click", function (event) {
            event.preventDefault();
            moveYesButton();
        });
    }

    if (noButton) {
        noButton.addEventListener("click", function () {

            if (loveResult) {
                loveResult.textContent =
                    "اچھا جی! اتنی جلدی NO؟ 😂 کوئی بات نہیں، " +
                    "آپ کی شرارتیں پھر بھی معاف ہیں۔ " +
                    "لیکن یہ جواب ریکارڈ میں محفوظ ہوگیا! ♡";
            }

            noButton.textContent = "I Said NO! 😭";
            createConfetti();
        });
    }

});

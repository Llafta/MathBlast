const questions = {
    easy: [
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "soal-easy1.jpg",
            options: [
                { text: "A. 21",},
                { text: "B. 7",},
                { text: "C. 12",},
                { text: "D. 1",}
            ],
            answer: "C. 12",
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "soal-easy2.jpg",
            options: [
                { text: "A. 5 dan 6",},
                { text: "B. 3 dan 2",},
                { text: "C. 5 dan 3",},
                { text: "D. 6 dan 2",}
            ],
            answer: "B. 3 dan 2",
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "soal-easy3.jpg",
            options: [
                { text: "A. bilangan pokoknya c",},
                { text: "B. penjabarannya c x c x c",},
                { text: "C. eksponennya 3",},
                { text: "D. eksponennya adalah c",}
            ], 
            answer: "D. eksponennya adalah c", 
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "soal-easy4.jpg",
            options: [
                { text: "A", image: "jawaba.jpg" },
                { text: "B", image: "jawabb.jpg" },
                { text: "C", image: "jawabc.jpg" },
                { text: "D", image: "jawabd.jpg" }
            ],
            answer: "B",
        },
    ],
    medium: [
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "medium1.jpg",
            options: [
                { text: "A", image: "Am1.jpg" },
                { text: "B", image: "Bm1.jpg" },
                { text: "C", image: "Cm1.jpg" },
                { text: "D", image: "Dm1.jpg" }
            ],
            answer: "A", 
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "medium2.jpg",
            options: [
                { text: "A", image: "Am2.jpg" },
                { text: "B", image: "Bm2.jpg" },
                { text: "C", image: "Cm2.jpg" },
                { text: "D", image: "Dm2.jpg" }
            ], 
            answer: "D",
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "medium3.jpg",
            options: [
                { text: "A", image: "Am3.jpg" },
                { text: "B", image: "Bm3.jpg" },
                { text: "C", image: "Cm3.jpg" },
                { text: "D", image: "Dm3.jpg" }
            ], 
            answer: "C", 
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "medium4.jpg",
            options: [
                { text: "A", image: "Am4.jpg" },
                { text: "B", image: "Bm4.jpg" },
                { text: "C", image: "Cm4.jpg" },
                { text: "D", image: "Dm4.jpg" }
            ],
            answer: "B", 
        },
    ],
    hard: [
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "hard1.jpg",
            options: [
                { text: "A. 1",},
                { text: "B. 2",},
                { text: "C. 3",},
                { text: "D. 4",}
            ], 
            answer: "B. 2", 
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "hard2.jpg",
            options: [
                { text: "A. x = -3 atau x = 1",},
                { text: "B. x = 3 atau x = -1",},
                { text: "C. x = 9 atau x = 3",},
                { text: "D. x = -9 atau x = -3",}
            ], 
            answer: "C. x = 9 atau x = 3", 
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "hard3.jpg",
            options: [
                { text: "A. -5",},
                { text: "B. 2",},
                { text: "C. -2",},
                { text: "D. 5",}
            ], 
            answer: "A. -5", 
        },
        { 
            question: "Perhatikan gambar dibawah ini.", 
            questionImage: "hard4.jpg",
            options: [
                { text: "A", image: "Ah4.jpg" },
                { text: "B", image: "Bh4.jpg" },
                { text: "C", image: "Ch4.jpg" },
                { text: "D", image: "Dh4.jpg" }
            ],
            answer: "D", 
        },
    ]
};

let currentLevel = "";
let currentQuestionIndex = 0;
let timer;
let timeLeft = 40;
let score = 0;
let startTime;
let correctAnswers = 0;
let wrongAnswers = 0;
let totalTimeTaken = 0;
let levelsCompleted = 0;

function enterGame() {
    let name = document.getElementById("name-input").value;
    if (name && name.trim() !== "") {
        document.getElementById("welcome-screen").classList.add("hidden");
        const gameScreen = document.getElementById("game-screen");
        gameScreen.classList.remove("hidden");
        gameScreen.classList.add("lightning-rise");
        document.getElementById("greeting").innerText = "Hello, " + name + "!";
        localStorage.setItem("currentPlayer", name.trim());

        // Muat skor dari localStorage
        const savedScores = JSON.parse(localStorage.getItem("mathBlastScores")) || [];
        const playerScore = savedScores.find(player => player.name === name.trim());
        score = playerScore ? playerScore.score : 0; // Jika ada, ambil skor, jika tidak, set ke 0
        updateScoreDisplay(); // Perbarui tampilan skor
    }
}

function startLevel(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    document.getElementById("game-screen").classList.add("hidden");
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.classList.remove("hidden");
    quizContainer.classList.add("lightning-rise");

    const quizTitle = document.getElementById("quiz-title");
    quizTitle.className = '';
    if (level === 'easy') {
        quizTitle.classList.add('easy-level');
        quizTitle.textContent = 'Easy Level';
    } else if (level === 'medium') {
        quizTitle.classList.add('medium-level');
        quizTitle.textContent = 'Medium Level';
    } else if (level === 'hard') {
        quizTitle.classList.add('hard-level');
        quizTitle.textContent = 'Hard Level';
    }

    loadQuestion();
}

function loadQuestion() {
    startTime = Date.now(); // Catat waktu mulai
    clearTimeout(timer);
    timeLeft = 40;
    updateTimer();
    document.getElementById("feedback-text").innerText = "";
    
    let questionData = questions[currentLevel][currentQuestionIndex];
    document.getElementById("quiz-title").innerText = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1) + " Level";
    document.getElementById("question-text").innerText = questionData.question;

    // Menampilkan gambar jika ada
    const imageElement = document.getElementById("question-image");
    if (questionData.questionImage) {
        imageElement.src = questionData.questionImage; // Set src gambar
        imageElement.style.display = "block"; // Tampilkan gambar
    } else {
        imageElement.style.display = "none"; // Sembunyikan gambar jika tidak ada
    }

    let optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    optionsContainer.classList.add("options-container"); // Tambahkan kelas untuk tata letak 2x2
    questionData.options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option.text; // Tampilkan teks opsi

        // Tambahkan gambar jika ada
        if (option.image) {
            let img = document.createElement("img");
            img.src = option.image; // Set src gambar
            img.alt = option.text; // Set alt untuk aksesibilitas
            img.style.width = "50px"; // Atur lebar gambar sesuai kebutuhan
            img.style.height = "auto"; // Atur tinggi gambar secara otomatis
            button.appendChild(img); // Tambahkan gambar ke dalam tombol
        }

        button.onclick = () => checkAnswer(option.text);
        optionsContainer.appendChild(button);
    });
    
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("feedback-text").innerText = "Time's up! You did not answer.";
            document.getElementById("feedback-text").style.display = "block"; // Menampilkan teks umpan balik
            setTimeout(() => {
                document.getElementById("feedback-text").style.display = "none"; // Sembunyikan teks umpan balik
                nextQuestion(); // Memuat pertanyaan berikutnya
            }, 2000); // Tampilkan pesan selama 2 detik sebelum berpindah
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById("timer-text").innerText = "" + timeLeft + "";

    if (timeLeft <= 20) {
        document.getElementById("timer-text").style.color = "red";
        document.getElementById("timer-text").classList.add("blink");
    } else {
        document.getElementById("timer-text").style.color = "green";
        document.getElementById("timer-text").classList.remove("blink");
    }
}

function updateScoreDisplay() {
    document.getElementById("score-display").innerText = "Score: " + score;
}

function checkAnswer(selectedAnswer) {
    let endTime = Date.now();
    let timeTaken = (endTime - startTime) / 1000; // Hitung waktu yang dibutuhkan dalam detik
    totalTimeTaken += timeTaken; // Tambahkan waktu pengerjaan
    let correctAnswer = questions[currentLevel][currentQuestionIndex].answer;
    let optionsContainer = document.getElementById("options-container");
    
    // Mengubah warna kotak jawaban
    optionsContainer.childNodes.forEach(button => {
        if (button.innerText === correctAnswer) {
            button.style.backgroundColor = "green"; // Warna hijau untuk jawaban yang benar
        } else {
            button.style.backgroundColor = "red"; // Warna merah untuk jawaban yang salah
        }
    });

    const feedbackText = document.getElementById("feedback-text");

    if (selectedAnswer === correctAnswer) {
        correctAnswers++; // Tambahkan jawaban benar
        let points = Math.max(10 - timeTaken, 1);
        score += Math.round(points); // Membulatkan poin ke bilangan bulat terdekat
        feedbackText.innerText = `Correct! + ${Math.round(points)} points`;
        feedbackText.className = 'correct'; // Tambahkan kelas 'correct'
        feedbackText.style.color = "green";
    } else {
        wrongAnswers++; // Tambahkan jawaban salah
        feedbackText.innerText = "Wrong answer!";
        feedbackText.className = 'wrong'; // Tambahkan kelas 'wrong'
        feedbackText.style.color = "red"; // Mengatur warna teks menjadi merah
    }
    feedbackText.style.display = "block"; // Menampilkan teks umpan balik
    feedbackText.classList.add("animate"); // Menambahkan kelas animasi

    setTimeout(() => {
        feedbackText.style.display = "none"; // Sembunyikan setelah animasi
        nextQuestion();
    }, 1000); // Durasi animasi

    updateScoreDisplay(); // Perbarui tampilan skor setelah skor berubah
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentLevel].length) {
        loadQuestion();
    } else {
        showSummary(); // Tampilkan ringkasan setelah menyelesaikan semua pertanyaan
    }
}

function showSummary() {
    document.getElementById("quiz-container").classList.add("hidden");
    const summaryContainer = document.getElementById("summary-container");
    summaryContainer.classList.remove("hidden");

    const summaryElements = [
        { element: document.getElementById("summary-correct"), text: `Correct Answers: ${correctAnswers}` },
        { element: document.getElementById("summary-wrong"), text: `Wrong Answers: ${wrongAnswers}` },
        { element: document.getElementById("summary-points"), text: `Total Points: ${score}` },
        { element: document.getElementById("summary-time"), text: `Total Time: ${totalTimeTaken.toFixed(2)} seconds` },
        { element: document.getElementById("summary-thankyou"), text: "Thank you for completing the quiz!" }
    ];

    // Reset counters for the next game
    correctAnswers = 0;
    wrongAnswers = 0;
    totalTimeTaken = 0;

    // Tambahkan jumlah level yang diselesaikan
    levelsCompleted++;

    // Tampilkan setiap elemen dengan penundaan
    summaryElements.forEach((item, index) => {
        setTimeout(() => {
            item.element.innerText = item.text;
            item.element.style.opacity = 1; // Tampilkan elemen
        }, index * 500); // Penundaan 500ms antara setiap elemen
    });

    // Simpan skor setelah menampilkan ringkasan
    saveScore();
}

function goToGameScreen() {
    clearInterval(timer);
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("summary-container").classList.add("hidden"); // Sembunyikan summary-container
    document.getElementById("game-screen").classList.remove("hidden");

    // Tampilkan animasi masuk berdasarkan jumlah level yang diselesaikan
    const introAnimation = document.getElementById('intro-animation');
    if (introAnimation) {
        introAnimation.style.display = 'flex';
        introAnimation.innerHTML = `<h1>Levels Completed: ${levelsCompleted}</h1>`;
        setTimeout(() => {
            introAnimation.style.display = 'none';
        }, 2000); // Durasi animasi 2 detik
    }
}

function clearGameHistory() {
    // Contoh: Hapus data dari localStorage
    localStorage.removeItem('gameHistory');

    // Contoh: Hapus data dari sessionStorage
    sessionStorage.removeItem('gameHistory');
}

// Pastikan untuk memanggil fungsi ini saat permainan dimulai atau berakhir
clearGameHistory();

function goBack() {
    // Menyembunyikan kontainer kuis atau level
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("game-screen").classList.add("hidden");

    // Menampilkan layar lobby
    const welcomeScreen = document.getElementById("welcome-screen");
    welcomeScreen.classList.remove("hidden");
    welcomeScreen.classList.add("lightning-rise"); // Tambahkan animasi

    // Mengatur ulang input nama
    document.getElementById("name-input").value = "";
}

document.addEventListener('DOMContentLoaded', () => {
    const titleText = "MathBlast";
    const titleContainer = document.getElementById('animated-title');
    if (!titleContainer) {
        console.error('Animated title container not found!');
        return;
    }
    titleContainer.innerHTML = [...titleText].map((char, index) => `<span style="animation-delay: ${index * 0.1}s">${char}</span>`).join('');

    const introAnimation = document.getElementById('intro-animation');
    if (!introAnimation) {
        console.error('Intro animation container not found!');
        return;
    }
    introAnimation.addEventListener('animationend', () => {
        console.log('Animation ended');
        setTimeout(() => {
            introAnimation.style.display = 'none'; // Sembunyikan animasi
            const welcomeScreen = document.getElementById('welcome-screen');
            welcomeScreen.classList.remove('hidden'); // Tampilkan welcome screen
            const welcomeTitle = document.getElementById('welcome-title');
            welcomeTitle.classList.add('lightning-rise'); // Tambahkan animasi ke welcome title
        }, 2000); // Tambahkan delay 2000 ms (2 detik) sebelum transisi
    });

    loadScore(); // Muat skor saat aplikasi dimulai
    scheduleScoreboardReset(); // Jadwalkan reset scoreboard

    const audio = document.getElementById('background-music');
    audio.volume = 0.5; // Atur volume antara 0.0 (senyap) dan 1.0 (maksimum)
});

function saveScore() {
    let scores = JSON.parse(localStorage.getItem("mathBlastScores")) || [];
    let playerName = localStorage.getItem("currentPlayer");

    // Abaikan penyimpanan jika nama pemain kosong atau tidak valid
    if (!playerName || playerName.trim() === "") {
        return;
    }

    // Tambahkan entri baru untuk setiap sesi permainan
    scores.push({ name: playerName, score: score });

    // Urutkan skor dari yang tertinggi ke terendah
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem("mathBlastScores", JSON.stringify(scores));
    updateScoreTable(scores); // Perbarui tampilan papan skor
}

function loadScore() {
    let scores = JSON.parse(localStorage.getItem("mathBlastScores")) || [];
    updateScoreTable(scores);
}

function updateScoreTable(scores) {
    let tableBody = document.getElementById("score-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Bersihkan tabel terlebih dahulu

    scores.forEach((player, index) => {
        let row = tableBody.insertRow();
        let rankCell = row.insertCell(0);
        let nameCell = row.insertCell(1);
        let scoreCell = row.insertCell(2);
        rankCell.textContent = index + 1; // Tambahkan peringkat
        nameCell.textContent = player.name;
        scoreCell.textContent = player.score;
    });
}

function showScoreboard() {
    document.getElementById("scoreboard").classList.remove("hidden");
    document.getElementById("game-screen").classList.add("hidden");
    loadScore(); // Memuat skor dari localStorage dan memperbarui tabel
}

function hideScoreboard() {
    document.getElementById("scoreboard").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden"); // Tampilkan kembali game screen
}

const testScores = Array.from({ length: 36 }, (_, i) => ({
    name: `Player ${i + 1}`,
    score: Math.floor(Math.random() * 100)
}));

updateScoreTable(testScores);

function resetScoreboard() {
    localStorage.removeItem("mathBlastScores");
    console.log("Scoreboard has been reset.");
}

function scheduleScoreboardReset() {
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === 0 && now.getMinutes() === 0) {
            resetScoreboard();
        }
    }, 60000); // Periksa setiap menit
}

// Panggil fungsi ini saat aplikasi dimulai
scheduleScoreboardReset();
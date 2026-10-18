// 1. Theme Switcher (Muted Day / Midnight Night)
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'night') {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.className = 'fa-regular fa-moon';
            } else {
                document.documentElement.setAttribute('data-theme', 'night');
                themeIcon.className = 'fa-regular fa-sun';
            }
        });

        // 2. Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('show'));
        });

        // 3. Daily Survival Tips Generator for Male Freshmen
        const tips = [
            "\"Konsistensi kecil setiap hari lebih berharga daripada maraton belajar di akhir semester.\"",
            "\"Cari teman diskusi yang saling mendukung, bukan sekadar teman nongkrong biasa.\"",
            "\"Jangan takut bertanya saat praktikum; lebih baik tanya sekarang daripada bingung pas ujian.\"",
            "\"Manajemen waktu antara organisasi, koding, dan istirahat adalah kunci utama bertahan.\"",
            "\"Gunakan Notion / Google Calendar dari hari pertama untuk mencatat tenggat tugas.\""
        ];

        const quoteBtn = document.getElementById('quoteBtn');
        const quoteText = document.getElementById('quoteText');

        quoteBtn.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * tips.length);
            quoteText.style.opacity = '0';
            setTimeout(() => {
                quoteText.textContent = tips[randomIndex];
                quoteText.style.opacity = '1';
            }, 200);
        });

        // 4. Modal Detail Karya
        function openModal(title, text, imgSrc, category) {
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalText').textContent = text;
            document.getElementById('modalImg').src = imgSrc;
            document.getElementById('projectModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('projectModal').classList.remove('active');
        }

        document.getElementById('projectModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('projectModal')) {
                closeModal();
            }
        });

        // 5. Interactive Skill Progress Bar Animation
        const skillBars = document.querySelectorAll('.progress-fill');
        
        function checkScrollSkills() {
            skillBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                if (rect.top < window.innerHeight - 50) {
                    bar.style.width = bar.getAttribute('data-progress');
                }
            });
        }

        window.addEventListener('scroll', checkScrollSkills);
        window.addEventListener('load', checkScrollSkills);

        // 6. Contact Form Feedback
        const contactForm = document.getElementById('contactForm');
        const formFeedback = document.getElementById('formFeedback');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                formFeedback.style.display = 'none';
            }, 4000);
        });

        // 7. Focus Ambient Sound Generator (Web Audio API)
        const playBtn = document.getElementById('playBtn');
        const playIcon = document.getElementById('playIcon');
        const audioWidget = document.getElementById('audioWidget');
        
        let isPlaying = false;
        let audioCtx = null;
        let intervalId = null;

        playBtn.addEventListener('click', () => {
            if (!isPlaying) {
                startFocusSound();
                playIcon.className = 'fa-solid fa-pause';
                audioWidget.classList.add('playing');
                isPlaying = true;
            } else {
                stopFocusSound();
                playIcon.className = 'fa-solid fa-play';
                audioWidget.classList.remove('playing');
                isPlaying = false;
            }
        });

        function startFocusSound() {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            // Warm relaxed chords for focus (D minor / F Major muted tones)
            const notes = [146.83, 220.00, 261.63, 329.63]; 
            let step = 0;

            function playNote() {
                if (!isPlaying) return;
                
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = 'triangle'; // Warm tone
                osc.frequency.setValueAtTime(notes[step % notes.length], audioCtx.currentTime);
                
                gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
                
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc.start();
                osc.stop(audioCtx.currentTime + 1.8);
                
                step++;
            }

            playNote();
            intervalId = setInterval(playNote, 1400);
        }

        function stopFocusSound() {
            if (intervalId) clearInterval(intervalId);
        }
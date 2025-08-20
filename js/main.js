onload = () =>{
        document.body.classList.remove("container");

        const modal = document.getElementById("question-modal");
        const playBtn = document.getElementById("play-video-btn");
        const videoSection = document.getElementById("video-section");
        const video = document.getElementById("love-video");
        const flowers = document.querySelector(".flowers");
        const closeBtn = document.getElementById("close-video-btn");
        const typewriterEl = document.getElementById("typewriter");
        const typewriterText = document.getElementById("typewriter-text");
        let typeTimer = null;
        function getVisitorName() {
                try {
                        let n = localStorage.getItem("visitorName");
                        if (!n) {
                                n = (window.prompt("What's your name?", "") || "").trim();
                                if (!n) n = "Dear";
                                localStorage.setItem("visitorName", n);
                        }
                        return n;
                } catch (e) { return "Dear"; }
        }
        const visitorName = getVisitorName();
        const composeLines = (n) => ([
                `${n}, I'm sorry for what I did. I love you.`,
                `I'll be good from now.`,
                `Ami tor sob kotha shunbo, I promise.`,
                `Toke konodino r kosto debo na.`,
                `You have made me full.`,
                `And I have a big hole now.`
        ]);

        // Show the modal as soon as the final growth animation completes
        const finalGrowthEl = document.querySelector(".flower__g-front__leaf-wrapper--1");
        if (finalGrowthEl) {
                finalGrowthEl.addEventListener("animationend", () => {
                        if (modal) modal.classList.remove("is-hidden");
                }, { once: true });
        } else {
                // Fallback approximate timing if selector changes
                setTimeout(() => { if (modal) modal.classList.remove("is-hidden"); }, 6500);
        }

        if (playBtn) {
                playBtn.addEventListener("click", () => {
                        if (modal) modal.classList.add("is-hidden");
                        if (flowers) flowers.style.display = "none";
                        if (videoSection) videoSection.classList.remove("is-hidden");
                        if (video) {
                                video.loop = true;
                                video.addEventListener('play', () => {
                                        if (typewriterEl && typewriterText) {
                                                typewriterEl.classList.remove('is-hidden');
                                                startTypewriterLoop(composeLines(visitorName));
                                        }
                                }, { once: true });
                        }
                        if (video && typeof video.play === "function") {
                                video.play().catch(() => {});
                        }
                });
        }

        if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                        if (video && typeof video.pause === "function") {
                                video.pause();
                                video.currentTime = 0;
                        }
                        if (videoSection) videoSection.classList.add("is-hidden");
                        if (flowers) flowers.style.display = "";
                        // Optionally re-show the question modal
                        if (modal) modal.classList.remove("is-hidden");
                        if (typewriterEl && typewriterText) {
                                typewriterEl.classList.add('is-hidden');
                                typewriterText.textContent = '';
                        }
                        if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
                        typeAbort = true;
                });
        }
        let typeAbort = false;
        function startTypewriterLoop(lines) {
                if (!typewriterText) return;
                // cancel previous
                typeAbort = false;
                if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
                typewriterText.textContent = '';
                let index = 0;
                const typeSpeed = 50;   // ms per char when typing
                const delSpeed = 30;    // ms per char when deleting
                const holdMs = 800;     // pause at full line before deleting

                function typeForward(line, done) {
                        let i = 0;
                        function step() {
                                if (typeAbort) return;
                                if (i <= line.length) {
                                        typewriterText.textContent = line.slice(0, i++);
                                        typeTimer = setTimeout(step, typeSpeed);
                                } else {
                                        done && done();
                                }
                        }
                        step();
                }

                function typeBackward(done) {
                        let i = typewriterText.textContent.length;
                        function step() {
                                if (typeAbort) return;
                                if (i >= 0) {
                                        typewriterText.textContent = typewriterText.textContent.slice(0, i--);
                                        typeTimer = setTimeout(step, delSpeed);
                                } else {
                                        done && done();
                                }
                        }
                        step();
                }

                function loop() {
                        if (typeAbort) return;
                        const line = lines[index];
                        typeForward(line, () => {
                                typeTimer = setTimeout(() => {
                                        typeBackward(() => {
                                                index = (index + 1) % lines.length;
                                                loop();
                                        });
                                }, holdMs);
                        });
                }
                loop();
        }
};

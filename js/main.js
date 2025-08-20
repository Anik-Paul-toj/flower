onload = () =>{
        document.body.classList.remove("container");

        const modal = document.getElementById("question-modal");
        const playBtn = document.getElementById("play-video-btn");
        const videoSection = document.getElementById("video-section");
        const video = document.getElementById("love-video");
        const flowers = document.querySelector(".flowers");
        const closeBtn = document.getElementById("close-video-btn");

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
                });
        }
};

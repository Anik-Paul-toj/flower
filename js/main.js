onload = () =>{
        document.body.classList.remove("container");

        const modal = document.getElementById("question-modal");
        const playBtn = document.getElementById("play-video-btn");
        const videoSection = document.getElementById("video-section");
        const video = document.getElementById("love-video");
        const flowers = document.querySelector(".flowers");

        // Wait until the growth animations are done before showing the modal
        const TOTAL_GROWTH_MS = 7000; // ~6.5s last delayed anim ends; add buffer
        setTimeout(() => {
                if (modal) {
                        modal.classList.remove("is-hidden");
                }
        }, TOTAL_GROWTH_MS);

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
};

(() => {
    const scrollBar = document.getElementById("scrollBar");
    const scrollLabel = document.getElementById("scrollLabel");
    const yearEl = document.getElementById("year");
    const revealStage = document.getElementById("revealStage");
    const revealCards = revealStage ? Array.from(revealStage.querySelectorAll(".reveal-card")) : [];

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const updateScrollProgress = () => {
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const max = doc.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(scrollTop / max, 1) : 0;

        if (scrollBar) {
            scrollBar.style.height = (ratio * 100) + "%";
        }

        if (scrollLabel) {
            scrollLabel.textContent = String(Math.round(ratio * 100)).padStart(2, "0");
        }
    };

    const updateRevealCards = () => {
        if (!revealStage || revealCards.length === 0) return;

        const stage = revealStage.parentElement;
        const rect = stage.getBoundingClientRect();
        const total = stage.offsetHeight - window.innerHeight;
        const progress = Math.min(Math.max(-rect.top / total, 0), 1);
        const slice = 1 / revealCards.length;
        const activeIndex = Math.min(Math.floor(progress / slice), revealCards.length - 1);

        revealCards.forEach((card, i) => {
            card.classList.toggle("is-active", i === activeIndex);
            card.style.zIndex = i === activeIndex ? 10 : 1;
        });
    };

    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                updateRevealCards();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateScrollProgress();
    updateRevealCards();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const id = anchor.getAttribute("href");
            if (id && id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
})();

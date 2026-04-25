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

    const initModelViewer = () => {
        const canvas = document.getElementById("modelViewer");
        if (!canvas || typeof THREE === "undefined") return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setClearColor(0x000000, 0);
        camera.position.set(0, 0, 2);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        let model = null;
        let isHovering = false;
        let targetScale = 1;
        let targetRotation = { x: 0, y: 0 };

        const loader = new THREE.OBJLoader();
        loader.load("assets/iconportfolio.obj", (obj) => {
            model = obj;
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);

            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xff5b1f,
                        roughness: 0.5,
                        metalness: 0.3
                    });
                }
            });

            scene.add(model);
        });

        canvas.addEventListener("mouseenter", () => {
            isHovering = true;
            targetScale = 1.2;
        });

        canvas.addEventListener("mouseleave", () => {
            isHovering = false;
            targetScale = 1;
            targetRotation = { x: 0, y: 0 };
        });

        canvas.addEventListener("mousemove", (e) => {
            if (!isHovering || !model) return;
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            targetRotation = {
                x: (y - 0.5) * 0.5,
                y: (x - 0.5) * 0.5
            };
        });

        canvas.addEventListener("click", () => {
            const contactSection = document.getElementById("contacto");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        const animate = () => {
            requestAnimationFrame(animate);

            if (model) {
                model.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
                model.rotation.x += (targetRotation.x - model.rotation.x) * 0.1;
                model.rotation.y += (targetRotation.y - model.rotation.y) * 0.1;
                model.rotation.z += 0.005;
            }

            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener("resize", () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
    };

    initModelViewer();
})();

// Lógica de Navbar: Glass effect + Ocultar/Mostrar al scroll
            const nav = document.getElementById('nav');
            let lastScrollY = window.scrollY;
            let upScrollDistance = 0;

            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const scrollDiff = scrollY - lastScrollY;

                // 1. Efecto Glass / Sticky styles
                if (scrollY > 30) {
                    nav.classList.add('bg-white/95', 'shadow-lg', 'py-1');
                    nav.classList.remove('bg-white/80', 'py-4');
                } else {
                    nav.classList.remove('bg-white/95', 'shadow-lg', 'py-1');
                    nav.classList.add('bg-white/80', 'py-4');
                }

                // 2. Ocultar al bajar / Mostrar al subir (Mobile & Desktop)
                if (scrollY < 100) {
                    nav.style.transform = 'translateY(0)';
                } else {
                    if (scrollDiff > 5) { // Bajando (sensible)
                        nav.style.transform = 'translateY(-100%)';
                        upScrollDistance = 0;
                    } else if (scrollDiff < -1) { // Subiendo
                        upScrollDistance += Math.abs(scrollDiff);
                        if (upScrollDistance > 150) { // Requiere subir bastante (150px)
                            nav.style.transform = 'translateY(0)';
                        }
                    }
                }

                lastScrollY = scrollY;
            }, { passive: true });

            const navHeight = 72; // Since h-[72px] is fixed 

            // Lógica Carrusel Testimonios (basado en índice)
            (function () {
                const track = document.getElementById('tmn-track');
                const viewport = document.getElementById('tmn-viewport');
                const dotsContainer = document.getElementById('tmn-dots');
                if (!track || !viewport) return;

                const cards = Array.from(track.querySelectorAll('.tmn-card'));
                const total = cards.length;
                let currentIndex = 0;
                const GAP = 32;

                function getPerPage() {
                    return window.innerWidth >= 768 ? 3 : 1;
                }

                function maxIndex() {
                    return Math.max(0, total - getPerPage());
                }

                function setCardWidths() {
                    const perPage = getPerPage();
                    // Descontamos 80px que corresponden al px-10 (40px de cada lado) para que las sombras respiren
                    const vw = viewport.getBoundingClientRect().width - 80;
                    const cardW = (vw - GAP * (perPage - 1)) / perPage;
                    cards.forEach(c => { c.style.width = cardW + 'px'; });
                }

                function buildDots() {
                    dotsContainer.innerHTML = '';
                    const pages = maxIndex() + 1;
                    for (let i = 0; i < pages; i++) {
                        const d = document.createElement('button');
                        d.setAttribute('aria-label', 'Ir a la reseña ' + (i + 1));
                        d.style.cssText = 'height:8px; border-radius:9999px; border:none; cursor:pointer; transition: all 0.3s; background:' + (i === currentIndex ? '#6366f1' : '#cbd5e1') + '; width:' + (i === currentIndex ? '24px' : '8px') + ';';
                        d.addEventListener('click', () => goTo(i));
                        dotsContainer.appendChild(d);
                    }
                }

                function updateDots() {
                    Array.from(dotsContainer.children).forEach((d, i) => {
                        d.style.background = i === currentIndex ? '#6366f1' : '#cbd5e1';
                        d.style.width = i === currentIndex ? '24px' : '8px';
                    });
                }

                function goTo(idx) {
                    currentIndex = Math.max(0, Math.min(idx, maxIndex()));
                    const cardW = cards[0].offsetWidth;
                    const offset = currentIndex * (cardW + GAP);
                    track.style.transform = 'translateX(-' + offset + 'px)';
                    updateDots();
                }

                function prev() { goTo(currentIndex - 1); }
                function next() { goTo(currentIndex + 1); }

                // Botones (visibles en ambos mobile y desktop, misma ID)
                const btnPrev = document.getElementById('tmn-prev');
                const btnNext = document.getElementById('tmn-next');
                if (btnPrev) btnPrev.addEventListener('click', prev);
                if (btnNext) btnNext.addEventListener('click', next);

                // Touch swipe
                let touchStartX = 0;
                viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
                viewport.addEventListener('touchend', e => {
                    const dx = touchStartX - e.changedTouches[0].clientX;
                    if (Math.abs(dx) > 50) dx > 0 ? next() : prev();
                }, { passive: true });

                // Init
                setCardWidths();
                buildDots();
                goTo(0);

                // Recalcular en resize
                window.addEventListener('resize', () => {
                    setCardWidths();
                    buildDots();
                    goTo(Math.min(currentIndex, maxIndex()));
                });
            })();

            // Menú Mobile
            const btnMobile = document.getElementById('btn-mobile');
            const menuMobile = document.getElementById('menu-mobile');
            const spans = btnMobile.querySelectorAll('span');

            btnMobile.addEventListener('click', () => {
                const isOpen = menuMobile.classList.contains('flex');
                if (isOpen) {
                    // Cerrar
                    menuMobile.classList.remove('opacity-100');
                    menuMobile.classList.add('opacity-0');
                    setTimeout(() => {
                        menuMobile.classList.add('hidden');
                        menuMobile.classList.remove('flex');
                    }, 300);
                    document.body.style.overflow = '';

                    // Animación Hamburguesa
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                } else {
                    // Abrir
                    menuMobile.classList.remove('hidden');
                    menuMobile.classList.add('flex');

                    // Usamos requestAnimationFrame para esperar al siguiente frame antes de animar
                    // Esto es mucho más eficiente que forzar un offsetHeight
                    requestAnimationFrame(() => {
                        menuMobile.classList.remove('opacity-0');
                        menuMobile.classList.add('opacity-100');
                    });

                    document.body.style.overflow = 'hidden';

                    // Animación X Perfecta
                    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
                }
            });

            menuMobile.querySelectorAll('a').forEach(link => link.addEventListener('click', () => btnMobile.click()));

            // Smooth Scrolling for all anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        // Using cached navHeight instead of offsetHeight to avoid forced reflow
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Intersection Observer (Para animaciones al scroll)
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('vis');
                        obs.unobserve(e.target);
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal-on-scroll').forEach(s => obs.observe(s));

            // 🖱️ Lógica del Carrusel de Portfolio (Scroll Infinito Filtrado para Bloqueos)
            const portfolioTrack = document.getElementById('portfolio-track');
            let isDown = false;
            let startX;
            let scrollLeft;
            let autoScroll = true;
            let scrollSpeed = 0.5;

            if (portfolioTrack) {
                portfolioTrack.style.scrollBehavior = 'auto';

                const startInteraction = (e) => {
                    isDown = true;
                    autoScroll = false;
                    portfolioTrack.classList.add('cursor-grabbing');
                    startX = (e.pageX || e.touches[0].pageX) - portfolioTrack.offsetLeft;
                    scrollLeft = portfolioTrack.scrollLeft;
                };

                const endInteraction = () => {
                    isDown = false;
                    portfolioTrack.classList.remove('cursor-grabbing');
                    // Reiniciar autoScroll con un delay mayor para asegurar suavidad
                    setTimeout(() => { if (!isDown) autoScroll = true; }, 1500);
                };

                portfolioTrack.addEventListener('mousedown', startInteraction);
                portfolioTrack.addEventListener('touchstart', startInteraction, { passive: true });

                window.addEventListener('mouseup', endInteraction);
                portfolioTrack.addEventListener('touchend', endInteraction);
                portfolioTrack.addEventListener('mouseleave', endInteraction);

                portfolioTrack.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - portfolioTrack.offsetLeft;
                    const walk = (x - startX) * 1.5;
                    portfolioTrack.scrollLeft = scrollLeft - walk;
                });

                portfolioTrack.addEventListener('touchmove', (e) => {
                    if (!isDown) return;
                    const x = e.touches[0].pageX - portfolioTrack.offsetLeft;
                    const walk = (x - startX) * 1.5;
                    portfolioTrack.scrollLeft = scrollLeft - walk;
                }, { passive: true });



                let cachedScrollWidth = portfolioTrack.scrollWidth;
                let currentScrollPos = portfolioTrack.scrollLeft;
                window.addEventListener('resize', () => {
                    cachedScrollWidth = portfolioTrack.scrollWidth;
                });

                function playCarousel() {
                    if (autoScroll && !isDown) {
                        currentScrollPos += scrollSpeed;
                        const half = cachedScrollWidth / 2;

                        if (currentScrollPos >= half) {
                            currentScrollPos -= half;
                        } else if (currentScrollPos <= 0) {
                            currentScrollPos += half;
                        }

                        portfolioTrack.scrollLeft = currentScrollPos;
                    } else {
                        // Sync position if manual scroll happened
                        currentScrollPos = portfolioTrack.scrollLeft;
                    }
                    requestAnimationFrame(playCarousel);
                }
                requestAnimationFrame(playCarousel);
            }

            // Gemini API Config (Ofuscada)
            const _0x4a2b = ["QUl6YVN5Q1kzTWJWOGRkcXdITzBfTllnWVRlUVA4endKNzUydE5B"];
            const apiKey = atob(_0x4a2b[0]);

            async function generateStrategy() {
                const inputField = document.getElementById('ai-input');
                const btn = document.getElementById('ai-btn');
                const outputDiv = document.getElementById('ai-output');

                if (!inputField.value.trim()) {
                    inputField.focus();
                    return;
                }

                // Estado de carga
                btn.innerHTML = 'Generando...';
                btn.classList.add('opacity-80', 'cursor-not-allowed');
                btn.disabled = true;

                outputDiv.innerHTML = '<div class="flex items-center gap-3 font-medium text-brand-300"><div class="ia-loader"></div> Analizando modelo de negocio...</div>';
                outputDiv.classList.remove('hidden');

                try {
                    const prompt = `Actuá como un experto amigo de Nocta Webs (Buenos Aires). Tu misión es convencer al usuario de que una web rápida y el WhatsApp automático le van a cambiar el negocio.

Contexto amigable:
- No digas palabras técnicas raras. Nada de "algoritmos", "despliegues" o "scalability". 
- Hablá de: "Vender más", "No perder clientes", "Web que vuela", "WhatsApp que responde solo".
- No usamos WordPress (que es lento), hacemos todo a mano para que sea un avión.

Basado en: "${inputField.value}":
1. Tirale 3 consejos CORTITOS Y AL PIE (máximo 2 oraciones por punto). 
2. Decile qué plan le conviene (Presencia $2,5 Impulso $55 o Tienda Online $120).
3. Tono: Muy argentino (che, laburo, posta, guita), de confianza, super amigable pero que se note que sabés.

Formato: HTML simple. Usá <h3> para el título de cada consejo, <ul> y <li class="mb-4"> para el texto. Usá <strong> para resaltar lo clave. Sé muy breve, no des vueltas.`;

                    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                    });

                    const data = await res.json();

                    if (data.candidates && data.candidates[0].content.parts[0].text) {
                        outputDiv.innerHTML = `<div class="mb-6 text-wapp font-bold text-xl uppercase tracking-wider">🎯 Tu plan de ataque Nocta Webs:</div>` + data.candidates[0].content.parts[0].text + `<div class="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white text-center">¿Te sirve? <a href="https://wa.me/5491150285618" target="_blank" class="text-brand-400 hover:text-brand-300 underline underline-offset-4">Escribinos por WhatsApp y lo hacemos realidad</a>.</div>`;
                    } else {
                        throw new Error("No response content");
                    }
                } catch (err) {
                    outputDiv.innerHTML = '<span class="text-red-400">Hubo un error al conectar con la IA. Probá de nuevo o escribinos directo al WhatsApp.</span>';
                }

                // Restaurar botón
                btn.innerHTML = 'Generar Estrategia';
                btn.classList.remove('opacity-80', 'cursor-not-allowed');
                btn.disabled = false;
            }
// Optimizacion de imagenes no criticas
(function optimizeMediaLoading() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        if (img.getAttribute('loading') !== 'eager' && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }
    });
})();

        document.addEventListener("DOMContentLoaded", function () {
            const today = new Date();
            const currentMonth = today.getMonth(); 
            const currentYear = today.getFullYear();

            // A szkript most már külön-külön kezeli mindkét naptár blokkot
            const sliders = ['#carousel2026', '#carousel2027'];

            sliders.forEach(sliderId => {
                const container = document.querySelector(sliderId);
                if (!container) return;

                const slides = container.querySelectorAll('.carousel-item');
                let activeSet = false;

                // 1. Letakarítjuk a múltbeli hónapokat a slideren belül
                slides.forEach(slide => {
                    const slideMonth = parseInt(slide.getAttribute('data-month'));
                    const slideYear = parseInt(slide.getAttribute('data-year'));

                    if (slideYear < currentYear || (slideYear === currentYear && slideMonth < currentMonth)) {
                        slide.remove(); 
                    } else if (slideYear === currentYear && slideMonth === currentMonth && !activeSet) {
                        slide.classList.add('active');
                        activeSet = true;
                    }
                });

                // 2. Ha az adott évben nincs aktuális hónap (pl. a 2027-es naptárban), 
                // akkor simán az első elérhető hónapot (Január) teszi aktívvá.
                if (!activeSet) {
                    const remainingSlides = container.querySelectorAll('.carousel-item');
                    if (remainingSlides.length > 0) {
                        remainingSlides[0].classList.add('active');
                    } else {
                        // Ha egy teljes év már a múlté (pl. elmúlt 2026), elrejtjük az egész szekciót címsorostól
                        container.closest('.calendar').style.display = 'none';
                    }
                }
            });
        });

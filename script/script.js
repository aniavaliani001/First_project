const logo = document.querySelector('.hero_abstract');

// 1. დატრიალება ჩატვირთვისას
window.addEventListener('load', () => {
    logo.classList.add('spin-animation');
});

// 2. დატრიალება მაუსის მიტანისას (Hover)
logo.addEventListener('mouseenter', () => {
    logo.style.animation = 'none'; // ჯერ ვაჩერებთ წინა ანიმაციას
    setTimeout(() => {
        logo.style.animation = 'logo-spin 1s ease-out'; // თავიდან ვუშვებთ
    }, 10);
});





const slider = document.getElementById('genreSlider');
const leftBtn = document.getElementById('genreLeft');
const rightBtn = document.getElementById('genreRight');

if (slider && leftBtn && rightBtn) {
  // როცა მარჯვენა ღილაკს დავაჭერთ
  rightBtn.addEventListener('click', () => {
    // ვითვლით ერთი ბარათის სიგანეს + დაშორება (gap)
    const cardWidth = slider.querySelector('.genre_card').offsetWidth + 20;
    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  // როცა მარცხენა ღილაკს დავაჭერთ
  leftBtn.addEventListener('click', () => {
    const cardWidth = slider.querySelector('.genre_card').offsetWidth + 20;
    slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });
}




document.addEventListener('DOMContentLoaded', () => {
    const monthlyBtn = document.getElementById('monthlyBtn');
    const yearlyBtn = document.getElementById('yearlyBtn');

    // JS იპოვის ამ ელემენტებს ID-ით
    const basicPrice = document.getElementById('basicPrice');
    const standardPrice = document.getElementById('standardPrice');
    const premiumPrice = document.getElementById('premiumPrice');
    const periods = document.querySelectorAll('.price_period');

    yearlyBtn.addEventListener('click', () => {
        yearlyBtn.classList.add('active');
        monthlyBtn.classList.remove('active');

        // ფასების შეცვლა
        basicPrice.innerText = '$95.99';
        standardPrice.innerText = '$120.99';
        premiumPrice.innerText = '$145.99';

        // პერიოდის შეცვლა (ეს უკვე გიმუშავებდა)
        periods.forEach(p => p.innerText = '/year');
    });

    monthlyBtn.addEventListener('click', () => {
        monthlyBtn.classList.add('active');
        yearlyBtn.classList.remove('active');

        // ფასების დაბრუნება
        basicPrice.innerText = '$9.99';
        standardPrice.innerText = '$12.99';
        premiumPrice.innerText = '$14.99';

        periods.forEach(p => p.innerText = '/month');
    });
});
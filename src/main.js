/**
 * Velaro-Trend.blog - Core Scripts (2025)
 * Чистый JavaScript без использования модулей.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ПЛАВНЫЙ СКРОЛЛ (LENIS) ---
  // Проверяем, загружена ли библиотека из CDN
  let lenis;
  if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
      });

      function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
  }

  // --- 2. МОБИЛЬНОЕ МЕНЮ (BURGER) ---
  const burger = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu__list a');

  if (burger && mobileMenu) {
      burger.addEventListener('click', () => {
          mobileMenu.classList.toggle('active');
          // Анимация самого бургера (если добавлена в CSS)
          burger.classList.toggle('open');
      });

      // Закрываем меню при клике на любую ссылку
      menuLinks.forEach(link => {
          link.addEventListener('click', () => {
              mobileMenu.classList.remove('active');
              burger.classList.remove('open');
          });
      });
  }

  // --- 3. ХЕДЕР ПРИ СКРОЛЛЕ (ЭФФЕКТ СТЕКЛА) ---
  const header = document.querySelector('.header');
  const handleScroll = () => {
      if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
      } else {
          header.classList.remove('header--scrolled');
      }
  };
  window.addEventListener('scroll', handleScroll);

  // --- 4. ФОРМА КОНТАКТОВ И КАПЧА ---
  const form = document.getElementById('ajax-form');
  const capText = document.getElementById('cap-text');
  const capAns = document.getElementById('cap-ans');
  const formStatus = document.getElementById('form-status');
  const phoneInput = document.getElementById('phone');

  // Генерация капчи
  let result = 0;
  if (capText) {
      const n1 = Math.floor(Math.random() * 10) + 2;
      const n2 = Math.floor(Math.random() * 5) + 1;
      result = n1 + n2;
      capText.innerText = `Подтвердите: ${n1} + ${n2} =`;
  }

  // Валидация телефона (только цифры и +)
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9+]/g, '');
      });
  }

  // Обработка отправки формы
  if (form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();

          // Проверка капчи
          if (parseInt(capAns.value) !== result) {
              alert('Неверный ответ капчи! Попробуйте еще раз.');
              return;
          }

          // Визуализация отправки
          formStatus.style.display = 'block';
          formStatus.style.background = 'rgba(255, 255, 255, 0.1)';
          formStatus.style.color = '#fff';
          formStatus.innerText = 'ОТПРАВКА ДАННЫХ...';

          // Имитация AJAX (задержка 1.5 сек)
          setTimeout(() => {
              form.reset();
              formStatus.style.background = 'var(--color-accent)';
              formStatus.style.color = 'var(--color-bg)';
              formStatus.innerText = 'УСПЕХ! МЫ СВЯЖЕМСЯ С ВАМИ В БЛИЖАЙШЕЕ ВРЕМЯ.';

              // Скрываем сообщение через 5 секунд
              setTimeout(() => {
                  formStatus.style.display = 'none';
              }, 5000);

              // Обновляем капчу для следующего раза
              const n1 = Math.floor(Math.random() * 10) + 2;
              const n2 = Math.floor(Math.random() * 5) + 1;
              result = n1 + n2;
              capText.innerText = `Подтвердите: ${n1} + ${n2} =`;
          }, 1500);
      });
  }

  // --- 5. COOKIE POPUP ---
  const cookieBar = document.getElementById('cookie-bar');
  const cookieBtn = document.getElementById('cookie-btn');

  if (cookieBar && !localStorage.getItem('velaro_cookies_2025')) {
      // Показываем плашку через 3 секунды после входа
      setTimeout(() => {
          cookieBar.style.display = 'flex';
      }, 3000);

      cookieBtn.addEventListener('click', () => {
          localStorage.setItem('velaro_cookies_2025', 'true');
          cookieBar.style.display = 'none';
      });
  }

  // --- 6. GSAP АНИМАЦИИ (SCROLLTRIGGER) ---
  // Проверяем наличие GSAP перед использованием
  if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Анимация Hero при загрузке
      gsap.from(".hero__title", {
          duration: 1.5,
          y: 80,
          opacity: 0,
          ease: "power4.out",
          delay: 0.3
      });

      gsap.from(".hero__lead", {
          duration: 1.2,
          y: 30,
          opacity: 0,
          ease: "power3.out",
          delay: 0.8
      });

      // Анимация появления секций
      const fadeSections = document.querySelectorAll('.section');
      fadeSections.forEach(section => {
          gsap.from(section, {
              scrollTrigger: {
                  trigger: section,
                  start: "top 85%", // Анимация начнется, когда секция будет на 85% экрана
              },
              y: 40,
              opacity: 0,
              duration: 1,
              ease: "power2.out"
          });
      });

      // Анимация карточек кейсов
      const cases = document.querySelectorAll('.case-item');
      if (cases.length > 0) {
          gsap.from(cases, {
              scrollTrigger: {
                  trigger: ".cases-grid",
                  start: "top 80%",
              },
              scale: 0.9,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2, // Появление по очереди
              ease: "back.out(1.7)"
          });
      }
  }
});
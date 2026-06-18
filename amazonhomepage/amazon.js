
const products = [
  { name: "boAt Airdopes 141", price: "₹1,299", old: "₹4,990", off: "74% off", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80" },
  { name: "Redmi Note 13 Pro", price: "₹18,999", old: "₹25,999", off: "27% off", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
  { name: "Samsung 43\" 4K TV", price: "₹32,990", old: "₹55,900", off: "41% off", img: "https://tse3.mm.bing.net/th/id/OIP.R8KRA0Bmhxfu_uQY3vqhGAHaE8?pid=Api&P=0&h=180" },
  { name: "Apple Watch SE", price: "₹24,900", old: "₹29,900", off: "17% off", img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&q=80" },
  { name: "Sony WH-1000XM5", price: "₹22,990", old: "₹34,990", off: "34% off", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
  { name: "Kindle Paperwhite", price: "₹13,999", old: "₹16,999", off: "18% off", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&q=80" },
  { name: "Instant Pot Pro", price: "₹8,499", old: "₹14,999", off: "43% off", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=80" },
  { name: "Nike Air Max 270", price: "₹9,295", old: "₹12,995", off: "28% off", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80" },
];

const ratings = ["★★★★★","★★★★☆","★★★★★","★★★☆☆","★★★★★","★★★★☆","★★★★★","★★★★☆"];
const reviewCounts = ["12,840","4,521","8,003","2,107","15,422","6,899","3,215","9,870"];

function makeProductCard(p, i) {
  const d = document.createElement('div');
  d.className = 'product-card';
  d.innerHTML = `
    <img src="${p.img}" alt="${p.name}" loading="lazy"/>
    <div class="prod-name">${p.name}</div>
    <div class="stars">${ratings[i % ratings.length]} <span class="rating-count">(${reviewCounts[i % reviewCounts.length]})</span></div>
    <div class="prod-price">${p.price}</div>
    <div><span class="prod-old">${p.old}</span> <span class="prod-off">${p.off}</span></div>
  `;
  d.onclick = () => addToCart(p.name);
  return d;
}

function populateScroll(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  items.forEach((p, i) => el.appendChild(makeProductCard(p, i)));
}

// Populate deal, bestseller, recent
populateScroll('dealScroll', products.slice(0, 5));
populateScroll('bestsellerScroll', [...products].sort(() => Math.random() - .5));
populateScroll('recentScroll', [...products].reverse());

/* ─── Cart ─── */
let cartCount = 0;
function addToCart(name) {
  cartCount++;
  document.getElementById('cartCount').textContent = cartCount;
  showToast(`✅ "${name}" added to cart`);
}

/* ─── Search ─── */
function doSearch() {
  const q = document.getElementById('searchInput').value.trim();
  const cat = document.getElementById('searchCat').value;
  if (q) showToast(`🔍 Searching for "${q}" in ${cat}`);
  else showToast('Please enter a search term');
}
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

/* ─── Toast ─── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ─── Hero Carousel ─── */
let slide = 0;
const total = 4;
const track = document.getElementById('heroTrack');
const dotsWrap = document.getElementById('heroDots');

// Create dots
for (let i = 0; i < total; i++) {
  const d = document.createElement('button');
  d.className = 'hero-dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goSlide(i);
  dotsWrap.appendChild(d);
}

function goSlide(n) {
  slide = (n + total) % total;
  track.style.transform = `translateX(-${slide * 100}%)`;
  document.querySelectorAll('.hero-dot').forEach((d, i) => {
    d.classList.toggle('active', i === slide);
  });
}
function moveSlide(dir) { goSlide(slide + dir); }

// Auto-play
let autoPlay = setInterval(() => moveSlide(1), 5000);
document.querySelector('.hero').addEventListener('mouseenter', () => clearInterval(autoPlay));
document.querySelector('.hero').addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => moveSlide(1), 5000);
});

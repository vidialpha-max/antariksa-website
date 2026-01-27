import "./style.css";

// Function to check if element exists
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

// Mobile menu toggle
if (elementExists("#menuToggle") && elementExists("#navMenu")) {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", function () {
    const isHidden = navMenu.classList.contains("hidden");

    if (isHidden) {
      navMenu.classList.remove("hidden");
      navMenu.classList.add(
        "flex",
        "absolute",
        "top-16",
        "left-0",
        "w-full",
        "bg-space-light/95",
        "backdrop-blur-lg",
        "p-6",
        "shadow-xl",
      );
    } else {
      navMenu.classList.add("hidden");
      navMenu.classList.remove(
        "flex",
        "absolute",
        "top-16",
        "left-0",
        "w-full",
        "bg-space-light/95",
        "backdrop-blur-lg",
        "p-6",
        "shadow-xl",
      );
    }

    // Toggle icon
    const icon = menuToggle.querySelector("i");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking outside on mobile
  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768) {
      if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.add("hidden");
        navMenu.classList.remove(
          "flex",
          "absolute",
          "top-16",
          "left-0",
          "w-full",
          "bg-space-light/95",
          "backdrop-blur-lg",
          "p-6",
          "shadow-xl",
        );

        // Reset icon
        const icon = menuToggle.querySelector("i");
        if (icon.classList.contains("fa-times")) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    }
  });
}

// Create particle background
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random animation
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 5;
    particle.style.animation = `float ${duration}s linear ${delay}s infinite`;

    particlesContainer.appendChild(particle);
  }
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".animate-slide-up, .animate-fade-in",
  );
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  animatedElements.forEach((element) => {
    if (element.classList.contains("animate-slide-up")) {
      element.classList.add(
        "opacity-0",
        "translate-y-8",
        "transition-all",
        "duration-700",
      );
    } else if (element.classList.contains("animate-fade-in")) {
      element.classList.add("opacity-0", "transition-all", "duration-1000");
    }
    observer.observe(element);
  });
}

// Search Functionality
function initSearch() {
  if (!elementExists("#searchInput")) return;

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const searchResults = document.getElementById("searchResults");
  const resultsList = document.getElementById("resultsList");

  // Data simulasi untuk pencarian
  const searchData = [
    {
      title: "Tata Surya",
      desc: "Sistem planet yang terdiri dari Matahari dan benda langit yang mengitarinya",
      category: "Planet",
      link: "tata-surya.html",
    },
    {
      title: "Gerhana Matahari",
      desc: "Fenomena ketika Bulan menghalangi cahaya Matahari",
      category: "Fenomena",
      link: "gerhana.html",
    },
    {
      title: "Galaksi Bima Sakti",
      desc: "Galaksi spiral tempat tata surya kita berada",
      category: "Galaksi",
      link: "index.html",
    },
    {
      title: "Planet Saturnus",
      desc: "Planet dengan sistem cincin yang indah",
      category: "Planet",
      link: "tata-surya.html",
    },
    {
      title: "Supernova",
      desc: "Ledakan besar yang menandai kematian sebuah bintang",
      category: "Fenomena",
      link: "index.html",
    },
    {
      title: "Hujan Meteor",
      desc: "Fenomena meteor yang tampak berjatuhan di langit malam",
      category: "Fenomena",
      link: "index.html",
    },
    {
      title: "Eksplorasi Antariksa",
      desc: "Penjelajahan manusia ke luar angkasa",
      category: "Teknologi",
      link: "artikel.html",
    },
    {
      title: "Satelit Alami",
      desc: "Benda langit yang mengorbit planet, seperti Bulan",
      category: "Satelit",
      link: "tata-surya.html",
    },
    {
      title: "Bintang Neutron",
      desc: "Sisa inti bintang masif setelah supernova",
      category: "Bintang",
      link: "index.html",
    },
    {
      title: "Lubang Hitam",
      desc: "Wilayah di ruang angkasa dengan gravitasi sangat kuat",
      category: "Fenomena",
      link: "index.html",
    },
  ];

  // Fungsi untuk menampilkan hasil pencarian
  function showSearchResults(query) {
    if (!query.trim()) {
      searchResults.classList.remove("opacity-100", "visible");
      searchResults.classList.add("opacity-0", "invisible");
      return;
    }

    const filteredResults = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()),
    );

    // Update daftar hasil
    resultsList.innerHTML = "";

    if (filteredResults.length > 0) {
      filteredResults.forEach((result) => {
        const li = document.createElement("li");
        li.className =
          "p-3 hover:bg-primary-blue/10 rounded-lg transition-colors cursor-pointer";
        li.innerHTML = `
                    <div class="font-medium text-primary-blue">${result.title}</div>
                    <div class="text-sm text-blue-300">${result.desc}</div>
                    <div class="text-xs text-blue-400 mt-1">Kategori: ${result.category}</div>
                `;
        li.addEventListener("click", function () {
          searchInput.value = result.title;
          performSearch(result.title, result.link);
        });
        resultsList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.className = "p-3 text-blue-300 text-center";
      li.textContent = "Tidak ditemukan hasil pencarian";
      resultsList.appendChild(li);
    }

    // Tampilkan dropdown hasil
    searchResults.classList.remove("opacity-0", "invisible");
    searchResults.classList.add("opacity-100", "visible");
  }

  // Fungsi untuk melakukan pencarian
  function performSearch(query, link = null) {
    if (!query.trim()) {
      alert("Silakan masukkan kata kunci pencarian");
      return;
    }

    // Sembunyikan hasil dropdown
    searchResults.classList.remove("opacity-100", "visible");
    searchResults.classList.add("opacity-0", "invisible");

    // Jika ada link, arahkan ke halaman tersebut
    if (link) {
      window.location.href = link;
      return;
    }

    // Simulasi pencarian
    const found = searchData.find(
      (item) => item.title.toLowerCase() === query.toLowerCase(),
    );

    if (found) {
      window.location.href = found.link;
    } else {
      // Cari yang mengandung kata kunci
      const similar = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()),
      );

      if (similar.length > 0) {
        const resultText = similar
          .map((item) => `• ${item.title}: ${item.desc}`)
          .join("\n\n");
        alert(
          `Hasil pencarian untuk "${query}":\n\n${resultText}\n\nKlik pada salah satu hasil untuk membuka halaman.`,
        );
      } else {
        alert(`Tidak ditemukan hasil untuk "${query}"`);
      }
    }

    // Focus kembali ke input
    searchInput.focus();
  }

  // Event listener untuk input
  searchInput.addEventListener("input", function () {
    showSearchResults(this.value);
  });

  // Event listener untuk tombol cari
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      performSearch(searchInput.value);
    });
  }

  // Event listener untuk tekan Enter di input
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch(this.value);
    }
  });

  // Sembunyikan dropdown saat klik di luar
  document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove("opacity-100", "visible");
      searchResults.classList.add("opacity-0", "invisible");
    }
  });

  // Untuk mobile, atur lebar input agar responsif
  function adjustSearchWidth() {
    if (window.innerWidth < 768) {
      searchInput.parentElement.classList.add("w-full");
      searchInput.classList.add("w-full");
    } else {
      searchInput.parentElement.classList.remove("w-full");
      searchInput.classList.remove("w-full");
    }
  }

  // Panggil saat load dan resize
  adjustSearchWidth();
  window.addEventListener("resize", adjustSearchWidth);
}

// Dropdown mobile untuk Pengenalan Antariksa
function initPengenalanDropdown() {
  const pengenalanToggle = document.querySelector(".pengenalan-toggle");
  const pengenalanDropdown = document.querySelector(".pengenalan-dropdown");

  if (!pengenalanToggle || !pengenalanDropdown) return;

  pengenalanToggle.addEventListener("click", function (e) {
    // Di mobile, toggle dropdown
    if (window.innerWidth <= 768) {
      e.preventDefault();
      pengenalanDropdown.classList.toggle("active");

      // Tutup dropdown lain jika ada
      const otherDropdowns = document.querySelectorAll(
        ".dropdown-mobile.active",
      );
      otherDropdowns.forEach((dropdown) => {
        if (dropdown !== pengenalanDropdown) {
          dropdown.classList.remove("active");
        }
      });
    }
  });

  // Tutup dropdown saat klik di luar
  document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768) {
      if (
        !pengenalanToggle.contains(event.target) &&
        !pengenalanDropdown.contains(event.target)
      ) {
        pengenalanDropdown.classList.remove("active");
      }
    }
  });
}

// Popup untuk Objek Antariksa (Bima Sakti, Matahari, Saturnus)
function initObjekPopup() {
  const objekCards = document.querySelectorAll(".objek-card");

  objekCards.forEach((card) => {
    card.addEventListener("click", function () {
      const objek = this.getAttribute("data-objek");
      let judul = "";
      let gambar = "";
      let deskripsi = "";
      let fakta = [];

      // Tentukan data berdasarkan objek
      switch (objek) {
        case "bima-sakti":
          judul = "Galaksi Bima Sakti";
          gambar =
            "https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1419&q=80";
          deskripsi =
            "Galaksi spiral tempat tata surya kita berada. Bima Sakti adalah galaksi berbatang dengan diameter sekitar 100.000 tahun cahaya dan ketebalan sekitar 1.000 tahun cahaya. Kita berada di lengan Orion, sekitar 27.000 tahun cahaya dari pusat galaksi.";
          fakta = [
            "⏳ Usia: 13,6 miliar tahun",
            "🌟 Jumlah bintang: 100-400 miliar",
            "🌀 Tipe: Galaksi spiral berbatang",
            "🌌 Grup: Grup Lokal (54 galaksi)",
            "📍 Lokasi kita: Lengan Orion",
          ];
          break;

        case "matahari":
          judul = "Matahari";
          gambar =
            "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80";
          deskripsi =
            "Bintang tunggal di pusat tata surya kita. Matahari adalah bola plasma panas yang memancarkan energi melalui reaksi fusi nuklir di intinya. Energi ini menjangkau Bumi dalam bentuk cahaya dan panas, mendukung seluruh kehidupan di planet kita.";
          fakta = [
            "🔥 Suhu inti: 15 juta °C",
            "🌡 Suhu permukaan: 5.500 °C",
            "⚖️ Massa: 1,989 × 10³⁰ kg",
            "🎨 Komposisi: 74% Hidrogen, 24% Helium",
            "⏳ Usia: 4,6 miliar tahun",
          ];
          break;

        case "saturnus":
          judul = "Planet Saturnus";
          gambar =
            "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80";
          deskripsi =
            "Planet keenam dari Matahari dan planet kedua terbesar di tata surya kita. Saturnus terkenal dengan sistem cincinnya yang spektakuler, yang terdiri dari miliaran partikel es dan batuan. Planet ini memiliki kepadatan yang lebih rendah dari air.";
          fakta = [
            "💍 Cincin utama: 7 cincin (A-G)",
            "🌙 Bulan: 82 bulan (Titan terbesar)",
            "🌀 Rotasi: 10,7 jam (tercepat)",
            "🎨 Warna: Kuning pucat karena amonia",
            "🎯 Khusus: Bisa mengapung di air",
          ];
          break;
      }

      // Gunakan SweetAlert2 untuk popup
      Swal.fire({
        title: `<span class="font-orbitron text-2xl text-primary-blue">${judul}</span>`,
        html: `
          <div class="text-left">
            <div class="mb-6 rounded-xl overflow-hidden border border-primary-blue/20">
              <img src="${gambar}" alt="${judul}" class="w-full h-48 object-cover">
            </div>
            <p class="mb-4 text-blue-100">${deskripsi}</p>
            <div class="bg-space-light/50 p-4 rounded-lg border border-primary-blue/20 mb-4">
              <h4 class="font-orbitron text-primary-blue mb-2"><i class="fas fa-star mr-2"></i>Fakta Menarik:</h4>
              <ul class="space-y-1">
                ${fakta.map((f) => `<li class="text-blue-200 flex items-center"><i class="fas fa-circle text-xs mr-2 text-primary-blue"></i>${f}</li>`).join("")}
              </ul>
            </div>
            <div class="flex justify-between items-center text-sm text-blue-300">
              <div>
                <i class="fas fa-info-circle mr-1"></i>
                <span>Klik di luar untuk menutup</span>
              </div>
              <div class="text-primary-blue">
                <i class="fas fa-external-link-alt"></i>
                <a href="tata-surya.html" class="ml-1 hover:underline">Pelajari lebih lanjut</a>
              </div>
            </div>
          </div>
        `,
        width: "600px",
        background: "#0f172a",
        color: "#e2e8f0",
        showConfirmButton: false,
        showCloseButton: true,
        customClass: {
          popup: "bg-space-light border border-primary-blue/30 rounded-xl",
          title: "font-orbitron",
          closeButton: "text-primary-blue hover:text-white",
        },
      });
    });
  });
}

// Coming Soon Popup untuk Fenomena Antariksa
function initComingSoonPopup() {
  const fenomenaCards = document.querySelectorAll(".fenomena-card");

  fenomenaCards.forEach((card) => {
    card.addEventListener("click", function () {
      const fenomena = this.getAttribute("data-fenomena");
      let judul = "";
      let ikon = "";
      let deskripsi = "";

      switch (fenomena) {
        case "gerhana":
          judul = "Gerhana Matahari Total";
          ikon = "fas fa-sun";
          deskripsi =
            'Fenomena langit yang menakjubkan ketika Bulan sepenuhnya menutupi Matahari, menciptakan "siang yang menjadi malam" selama beberapa menit. Gerhana total terakhir di Indonesia terjadi pada 9 Maret 2016.';
          break;
        case "supernova":
          judul = "Ledakan Supernova";
          ikon = "fas fa-star";
          deskripsi =
            "Ledakan spektakuler yang menandai kematian sebuah bintang masif. Supernova bisa bersinar lebih terang dari seluruh galaksi selama beberapa minggu. Supernova terakhir yang terlihat dari Bumi adalah SN 1987A.";
          break;
        case "hujan-meteor":
          judul = "Hujan Meteor Perseid";
          ikon = "fas fa-meteor";
          deskripsi =
            "Hujan meteor tahunan yang berasal dari puing-puing Komet Swift-Tuttle. Dinamakan Perseid karena titik radiannya berada di rasi bintang Perseus. Bisa dilihat setiap tahun di bulan Agustus.";
          break;
      }

      Swal.fire({
        title: `<span class="font-orbitron text-primary-blue">${judul}</span>`,
        html: `
          <div class="text-left">
            <div class="text-center mb-4">
              <i class="${ikon} text-primary-blue text-5xl"></i>
            </div>
            <p class="mb-4 text-blue-100">${deskripsi}</p>
            <div class="bg-space-light/50 p-4 rounded-lg border border-primary-blue/20 my-4">
              <div class="flex items-center gap-3">
                <i class="fas fa-tools text-primary-blue text-xl"></i>
                <div>
                  <p class="font-medium text-primary-blue">Sedang Dalam Pengembangan</p>
                  <p class="text-sm text-blue-200">Kami sedang menyiapkan konten lengkap dengan animasi, timeline, dan panduan pengamatan untuk Anda.</p>
                </div>
              </div>
            </div>
            <p class="text-blue-300 text-sm">
              <i class="fas fa-clock mr-1"></i>
              Perkiraan selesai: Desember 2024
            </p>
          </div>
        `,
        icon: "info",
        iconColor: "#4dabff",
        background: "#0f172a",
        color: "#e2e8f0",
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#4dabff",
        showCloseButton: true,
        customClass: {
          popup: "bg-space-light border border-primary-blue/30 rounded-xl",
          title: "font-orbitron",
          confirmButton: "font-exo",
        },
      });
    });
  });
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  initScrollAnimations();
  initSearch();
  initPengenalanDropdown();
  initObjekPopup(); // Tambah ini
  initComingSoonPopup();
});

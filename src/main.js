// Import CSS Tailwind
import "./style.css";

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
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
    },
    {
      title: "Gerhana Matahari",
      desc: "Fenomena ketika Bulan menghalangi cahaya Matahari",
      category: "Fenomena",
    },
    {
      title: "Galaksi Bima Sakti",
      desc: "Galaksi spiral tempat tata surya kita berada",
      category: "Galaksi",
    },
    {
      title: "Planet Saturnus",
      desc: "Planet dengan sistem cincin yang indah",
      category: "Planet",
    },
    {
      title: "Supernova",
      desc: "Ledakan besar yang menandai kematian sebuah bintang",
      category: "Fenomena",
    },
    {
      title: "Hujan Meteor",
      desc: "Fenomena meteor yang tampak berjatuhan di langit malam",
      category: "Fenomena",
    },
    {
      title: "Eksplorasi Antariksa",
      desc: "Penjelajahan manusia ke luar angkasa",
      category: "Teknologi",
    },
    {
      title: "Satelit Alami",
      desc: "Benda langit yang mengorbit planet, seperti Bulan",
      category: "Satelit",
    },
    {
      title: "Bintang Neutron",
      desc: "Sisa inti bintang masif setelah supernova",
      category: "Bintang",
    },
    {
      title: "Lubang Hitam",
      desc: "Wilayah di ruang angkasa dengan gravitasi sangat kuat",
      category: "Fenomena",
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
          performSearch(result.title);
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
  function performSearch(query) {
    if (!query.trim()) {
      alert("Silakan masukkan kata kunci pencarian");
      return;
    }

    // Sembunyikan hasil dropdown
    searchResults.classList.remove("opacity-100", "visible");
    searchResults.classList.add("opacity-0", "invisible");

    // Simulasi pencarian
    const found = searchData.find(
      (item) => item.title.toLowerCase() === query.toLowerCase(),
    );

    if (found) {
      alert(
        `Anda mencari: "${found.title}"\n\nDeskripsi: ${found.desc}\nKategori: ${found.category}`,
      );
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
        alert(`Hasil pencarian untuk "${query}":\n\n${resultText}`);
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
  searchButton.addEventListener("click", function () {
    performSearch(searchInput.value);
  });

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

  // Dropdown mobile untuk Pengenalan Antariksa
  const pengenalanToggle = document.querySelector(".pengenalan-toggle");
  const pengenalanDropdown = document.querySelector(".pengenalan-dropdown");

  if (pengenalanToggle && pengenalanDropdown) {
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

  // Smooth scroll untuk anchor links di dropdown
  document.querySelectorAll(".pengenalan-dropdown a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Scroll ke elemen target
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });

          // Tutup dropdown di mobile
          if (window.innerWidth <= 768 && pengenalanDropdown) {
            pengenalanDropdown.classList.remove("active");
          }
        }
      }
    });
  });

  // Panggil saat load dan resize
  adjustSearchWidth();
  window.addEventListener("resize", adjustSearchWidth);
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  createParticles();
  initScrollAnimations();
  initSearch();
});

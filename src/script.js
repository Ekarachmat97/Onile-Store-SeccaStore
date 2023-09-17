// SCRIPFTED BY SECCA
// SCRIPFTED BY SECCA
// SCRIPFTED BY SECCA
// SCRIPFTED BY SECCA
// SCRIPFTED BY SECCA

// HAMBURGER MENU
const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
});

// Data produk aktual
const products = [
  {
    name: "Sepatu Casual Putih pria dan wanita saibite",
    price: 137000,
    description:
      "Tidak Ada Merek Cetak Grafis Rendah Sepatu Kanvas Masa Lalu PU Kanvas Masa Lalu uniseks. sepatu cowok terbaru 2023 viral ori. sepatu pria dewasa terbaru 2023. sepatu putih pria keren style. sepatu sport pria import 2023. sepatu cowok keren buat gaya",
    image: "/img/sepatu-casual.jpeg",
  },
  {
    name: "SEPATU PRIA SPORT FASHION TERLARIS Olahraga",
    price: 67000,
    description:
      "SEPATU PRIA SPORT FASHION TERLARIS SEPATU SNEAKERS OLAHRAGA TERBARU 2022 dengan harga Rp67.200 - Rp79.800. ",
    image: "/img/sepatu-sport.jpeg",
  },
  {
    name: "SEPATU DUNK LOW ORANGE BLASS",
    price: 489000,
    description:
      "SEPATU DUNK LOW SIZE : 36 37 38 39 40 41 42 43 KUALITAS PREMIUM QUALITY Barang 100% sesuai gambar Fitur ringan empuk enak di pakai harga sudah termasuk Box/Dus",
    image: "/img/sepatu-nike.jpeg",
  },
  {
    name: "Sepatu Sneakers Kekinian Pria dan Wanita",
    price: 53900,
    description:
      "Ready Warna Putih Hitam, Hitam Putih, Putih Biru dan Hitam Ready Size 39-43 Keterangan ukuran : 39 = 26 cm 40 = 26,5 cm 41 = 27 cm 42 = 27,5 cm 43 = 28 cm Silahkan order ",
    image: "/img/sepatu-sneakers.webp",
  },
];

// Fungsi untuk menghasilkan kartu produk
function generateProductCards() {
  // Temukan elemen "products" di dalam dokumen HTML
  const productsSection = document.querySelector(".products");

  // Loop melalui produk dan buat kartu produk untuk setiap produk
  products.forEach((product, index) => {
    // Buat elemen kartu
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="view-details" data-bs-toggle="modal" data-bs-target="#productModal${index}">
            <h3>${product.name}</h3>
            <p>Rp.${product.price}</p>
            
            <div class="button-group">
                <button class="view-details-btn" data-bs-toggle="modal" data-bs-target="#productModal${index}"><i class="fas fa-eye"></i></button>
                <button class="add-to-cart-btn" data-index="${index}">Add to Cart</button>
            </div>
        `;

    // Buat modal produk yang sesuai
    const modal = createProductModal(product, index);

    // Tambahkan modal ke dalam elemen <body> di dokumen
    document.body.appendChild(modal);

    // Tambahkan kartu produk ke dalam elemen "products"
    productsSection.appendChild(card);
  });
}

// Fungsi untuk membuat modal produk
function createProductModal(product, index) {
  // Buat elemen modal
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.id = `productModal${index}`;
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", `productModalLabel${index}`);
  modal.setAttribute("aria-hidden", "true");

  // Isi modal dengan konten produk
  modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel${index}">${product.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img src="${product.image}" alt="${product.name}" class="modal-product-image">
                    <p>Price: $${product.price}</p>
                    <p>${product.description}</p>
                    <div class="modal-footer">
                    <button class="add-to-cart-btn" data-index="${index}">Add to Cart</button>
                    </div>
                    <!-- Add more details here -->
                </div>
            </div>
        </div>
    `;

  return modal;
}

// Inisialisasi kartu produk
generateProductCards();

// Fungsi untuk menginisialisasi keranjang belanja
function initializeCart() {
  // Temukan elemen-elemen yang diperlukan di dalam dokumen HTML
  const cartIcon = document.querySelector(".cart-icon");
  const cartSidebar = document.querySelector(".cart-sidebar");
  const closeCartButton = document.querySelector(".close-cart");
  const checkoutButtonSidebar = document.querySelector(".checkout-btn");
  const cartItemsList = document.querySelector(".cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  // Inisialisasi variabel yang diperlukan
  let cartVisible = false;
  const cart = []; // Inisialisasi keranjang belanja

  // Fungsi untuk menampilkan atau menyembunyikan sidebar keranjang
  function toggleCartSidebar() {
    cartVisible = !cartVisible;
    if (cartVisible) {
      cartSidebar.classList.add("active");
    } else {
      cartSidebar.classList.remove("active");
    }
  }

  // Tambahkan event listener untuk ikon keranjang
  cartIcon.addEventListener("click", toggleCartSidebar);

  // Tambahkan event listener untuk tombol tutup sidebar keranjang
  closeCartButton.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartVisible = false;
  });

  // Fungsi untuk menghitung total belanja
  function updateCartTotal() {
    const cartTotal = cart.reduce((total, item) => total + item.price, 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);
  }

  // Fungsi untuk mengupdate jumlah ikon keranjang
  function updateCartIconCount() {
    const cartCount = document.querySelector(".cart-count");
    cartCount.textContent = cart.length;
  }

  // Fungsi untuk mereset jumlah ikon keranjang ke 0
  function resetCartIconCount() {
    const cartCount = document.querySelector(".cart-count");
    cartCount.textContent = "0";
  }

  // Fungsi untuk menghapus produk dari keranjang
  function removeProductFromCart(product) {
    const productIndex = cart.findIndex((item) => item === product);
    if (productIndex !== -1) {
      cart.splice(productIndex, 1);
    }
  }

  // Fungsi untuk menambahkan produk ke keranjang
  function addToCart(product) {
    cart.push(product);
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");

    const itemContent = document.createElement("div");
    itemContent.classList.add("cart-item-content");

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.classList.add("cart-item-image");

    const productName = document.createElement("span");
    productName.textContent = product.name;
    productName.classList.add("product-name");

    const productPrice = document.createElement("span");
    productPrice.textContent = "Rp." + product.price;
    productPrice.classList.add("product-price");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("delete-icon", "fas", "fa-trash-alt");
    deleteIcon.addEventListener("click", () => {
      removeProductFromCart(product);
      cartItem.remove();
      updateCartTotal();
      updateCartIconCount();
    });

    productInfo.appendChild(productImage);
    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);

    itemContent.appendChild(productInfo);
    itemContent.appendChild(deleteIcon);

    cartItem.appendChild(itemContent);
    cartItemsList.appendChild(cartItem);

    updateCartTotal();
    updateCartIconCount();
  }

  // Ambil semua tombol "Add to Cart" dan tambahkan event listener untuk menambahkan produk ke keranjang
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      addToCart(products[index]);
    });
  });

  // Tambahkan event listener untuk tombol "Checkout" di sidebar
  checkoutButtonSidebar.addEventListener("click", () => {
    if (cart.length > 0) {
      // Panggil fungsi handleCheckout untuk menangani proses checkout
      handleCheckout(cart);
    } else {
      alert(
        "Keranjang belanja Anda kosong. Silakan tambahkan produk ke keranjang."
      );
    }
  });

  // Inisialisasi jumlah ikon keranjang
  updateCartIconCount();

  // Fungsi untuk menangani proses checkout
  function handleCheckout(cart) {
    if (cart.length > 0) {
      // Simpan produk yang akan dibeli dalam localStorage
      localStorage.setItem("cartItems", JSON.stringify(cart));
      // Alihkan halaman ke konfirmasi-pembayaran.html
      window.location.href = "src/konfirmasi-pembayaran.html";
    } else {
      alert(
        "Keranjang belanja Anda kosong. Silakan tambahkan produk ke keranjang."
      );
    }
  }

  // Fungsi untuk menyalin teks ke clipboard
  function copyToClipboard(text) {
    const tempElement = document.createElement("textarea");
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
  }
}

// Inisialisasi keranjang dan fungsionalitasnya
initializeCart();

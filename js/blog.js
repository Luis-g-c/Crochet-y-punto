console.log("Bienvenido al blog de Crochet y Punto");

// Función para cargar y mostrar los posts
function cargarPosts() {
  fetch('../js/posts.json')
    .then(response => response.json())
    .then(posts => {
      const container = document.getElementById('blog-posts');
      if (!container) return;
      container.innerHTML = '';
      posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-post';
        article.innerHTML = `
        <div class="d-flex text-center mb-1">
          <div class="col-auto d-none d-lg-block m-3">
            <img src="${post.image}" alt="Thumbnail" class="bd-placeholder-img" width="200" height="200">
          </div>
          <div class="texto text-center mb-3">
            <h3 class="display-6 link-body-emphasis mb-3">${post.title}</h3>
            ${post.content} 
            <p class="blog-post-meta">${post.date} por <a href="#">${post.author}</a></p>
          </div>
        </div>
        `;
        container.appendChild(article);
      });
    })
    .catch(error => {
      console.error('Error cargando los posts:', error);
    });
}

function cargarSidebarPosts() {
  fetch('../js/posts.json')
    .then(response => response.json())
    .then(posts => {
      const sidebar = document.getElementById('sidebar-posts');
      if (!sidebar) return;
      sidebar.innerHTML = '';
      // Solo los 5 más recientes
      posts.slice().reverse().slice(0, 5).forEach(post => {
        const item = document.createElement('a');
        item.className = 'list-group-item list-group-item-action';
        item.href = "#";
        item.innerHTML = `
          <div class="d-flex w-100 align-items-center">
            <img src="${post.image}" alt="Imagen post" width="50" height="50" class="me-2 rounded">
            <div>
              <h6 class="mb-1">${post.title}</h6>
              <small class="text-muted">${post.date}</small>
            </div>
          </div>
        `;
        sidebar.appendChild(item);
      });
    })
    .catch(error => {
      console.error('Error cargando los posts de la barra lateral:', error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  cargarPosts();
  cargarSidebarPosts();
  // ...el resto de tu código...
});

// Scroll suave para "Back to top"
document.addEventListener("DOMContentLoaded", function () {
  cargarPosts();

  // Back to top
  const backToTopLinks = document.querySelectorAll('footer a[href="#"]');
  backToTopLinks.forEach(function(link) {
    if (link.textContent.trim().toLowerCase() === "back to top") {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });

  // Subscribe
  const subscribeLinks = document.querySelectorAll('a.link-secondary[href="#"]');
  subscribeLinks.forEach(function (element) {
    if (element.textContent.trim().toLowerCase() === "subscribe") {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        alert("¡Gracias por tu interés! Pronto habilitaremos la suscripción.");
      });
    }
  });
});
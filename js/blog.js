console.log("Bienvenido al blog de Crochet y Punto");

// Parámetros de paginación
const POSTS_POR_PAGINA = 5;
let paginaActual = 1;
let postsGlobal = [];

// Función para renderizar los posts de la página actual
function renderizarPosts(posts) {
  const container = document.getElementById('blog-posts');
  if (!container) return;
  container.innerHTML = '';
  const inicio = (paginaActual - 1) * POSTS_POR_PAGINA;
  const fin = inicio + POSTS_POR_PAGINA;
  const postsPagina = posts.slice().reverse().slice(inicio, fin);

  postsPagina.forEach(post => {
    const article = document.createElement('article');
    article.className = 'blog-post';
    article.innerHTML = `
      <div class="d-flex text-center mb-1">
        <div class="col-auto d-none d-lg-block m-4">
          <img src="${post.image}" alt="Thumbnail" class="bd-placeholder-img" width="200" height="200">
        </div>
        <div class="texto text-center mb-4">
          <h3 class="display-6 mb-3">${post.title}</h3>
          ${post.content} 
          <p class="blog-post-meta">${post.date} por <a href="#">${post.author}</a></p>
        </div>
      </div>
    `;
    container.appendChild(article);
  });

  renderizarPaginacion(posts.length);
}

// Función para renderizar la paginación
function renderizarPaginacion(totalPosts) {
  let paginacion = document.getElementById('paginacion-posts');
  if (!paginacion) {
    paginacion = document.createElement('nav');
    paginacion.id = 'paginacion-posts';
    paginacion.className = 'blog-pagination d-flex justify-content-center my-4';
    const container = document.getElementById('blog-posts');
    if (container) container.after(paginacion);
  }
  paginacion.innerHTML = '';

  const totalPaginas = Math.ceil(totalPosts / POSTS_POR_PAGINA);

  // Botón anterior
  const btnAnterior = document.createElement('button');
  btnAnterior.className = 'btn btn-outline-primary mx-1';
  btnAnterior.textContent = 'Anterior';
  btnAnterior.disabled = paginaActual === 1;
  btnAnterior.onclick = () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderizarPosts(postsGlobal);
    }
  };
  paginacion.appendChild(btnAnterior);

  // Números de página
  for (let i = 1; i <= totalPaginas; i++) {
    const btnPagina = document.createElement('button');
    btnPagina.className = 'btn btn-outline-secondary mx-1' + (i === paginaActual ? ' active' : '');
    btnPagina.textContent = i;
    btnPagina.onclick = () => {
      paginaActual = i;
      renderizarPosts(postsGlobal);
    };
    paginacion.appendChild(btnPagina);
  }

  // Botón siguiente
  const btnSiguiente = document.createElement('button');
  btnSiguiente.className = 'btn btn-outline-primary mx-1';
  btnSiguiente.textContent = 'Siguiente';
  btnSiguiente.disabled = paginaActual === totalPaginas;
  btnSiguiente.onclick = () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderizarPosts(postsGlobal);
    }
  };
  paginacion.appendChild(btnSiguiente);
}

// Cargar y mostrar los posts con paginación
function cargarPosts() {
  fetch('../js/posts.json')
    .then(response => response.json())
    .then(posts => {
      postsGlobal = posts;
      renderizarPosts(postsGlobal);
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
      posts.forEach(post => {
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
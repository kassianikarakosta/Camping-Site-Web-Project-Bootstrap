// Function to determine if a link should be active based on the current URL
function isActive(url) {
  // Check if the current URL exactly matches the specified URL
  if (window.location.pathname === url) {
      return 'active';
  } else {
      return '';
  }
}



document.addEventListener("DOMContentLoaded", function() {
  const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar-color">
    <a class="navbar-brand">Patras Camping</a>
    <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link ${isActive('/home')}" href="../html/home.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${isActive('/accomondation')}" href="../html/accomondation.html">Accommodation</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${isActive('/services')}" href="../html/services.html">Services</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${isActive('/events')}" href="../html/events.html">Events</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ${isActive('/contact')}" href="../html/contact.html">Contact</a>
        </li>
      </ul>
      
      <ul class="navbar-nav ml-auto"> <!-- Right-aligned links -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            User
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a class="dropdown-item ${isActive('/signin')}" href="../html/signin.html">Sign In</a>
            <a class="dropdown-item ${isActive('/signup')}" href="../html/signup.html">Sign Up</a>
            <a class="dropdown-item ${isActive('/profile')}" href="../html/profile.html">Profile</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>

  `;

  const footer = `
  <footer class="bg-warning text-center">    
      <!-- Copyright -->
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
          © 2024 Copyright: Team 25: Karakosta, Fragki
      </div>
      <!-- Copyright -->
  </footer>
  `;

  // Insert the navbar HTML into the DOM
  document.body.insertAdjacentHTML("afterbegin", navbar);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Get reference to the navbar collapse element
  const navbarCollapse = document.querySelector('.navbar-collapse');

  // Add event listener to the navbar toggler button
  document.querySelector('.navbar-toggler').addEventListener('click', function() {
      // Toggle the 'show' class on the navbar collapse element
      navbarCollapse.classList.toggle('show');
  });
});

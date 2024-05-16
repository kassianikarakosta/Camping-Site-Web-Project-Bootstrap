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
              <a class="nav-link" href="../views/home.html">Home</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="../views/accomondation.html">Accommodation</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="../views/events.html">Events</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="../views/contact.html">Contact</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="../views/booking.html">Booking</a>
          </li>
      </ul>

      <ul class="navbar-nav ml-auto"> <!-- Right-aligned links -->
          <li class="nav-item">
              <a class="nav-link" href="../views/signin.html">Sign In</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="../views/signup.html">Sign Up</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="../views/profile.html">Profile</a>
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

  
});


document.addEventListener("DOMContentLoaded", function() {
  // Get the current page URL
  const currentPageUrl = window.location.href;

  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-item a');
  // const dropdownlinks = document.querySelectorAll('.dropdown a');

  // Loop through each navigation link
  navLinks.forEach(function(link) {
    // Check if the link's href matches the current page URL
    if (link.href === currentPageUrl) {
      // Add the "active" class to the parent li element
      link.parentNode.classList.add('active');
    }
  });

  // Get reference to the navbar collapse element
  const navbarCollapse = document.querySelector('.navbar-collapse');

  // Add event listener to the navbar toggler button
  document.querySelector('.navbar-toggler').addEventListener('click', function() {
      // Toggle the 'show' class on the navbar collapse element
      navbarCollapse.classList.toggle('show');
  });
});

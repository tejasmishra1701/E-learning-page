const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
    ...scrollRevealOption,
    origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
    ...scrollRevealOption,
    delay: 500,
});

ScrollReveal().reveal(".header__content p", {
    ...scrollRevealOption,
    delay: 1000,
});

ScrollReveal().reveal(".header__content form", {
    ...scrollRevealOption,
    delay: 1500,
});


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchSuggestions = document.getElementById("searchSuggestions");

  // Load previous searches from local storage
  const loadPreviousSearches = () => {
      const searches = JSON.parse(localStorage.getItem("previousSearches")) || [];
      return searches;
  };

  const saveSearch = (search) => {
      let searches = loadPreviousSearches();
      if (!searches.includes(search)) {
          searches.push(search);
          localStorage.setItem("previousSearches", JSON.stringify(searches));
      }
  };

  const showSuggestions = (searches) => {
      searchSuggestions.innerHTML = "";
      searches.forEach((search) => {
          const suggestion = document.createElement("p");
          suggestion.textContent = search;
          suggestion.addEventListener("click", () => {
              searchInput.value = search;
              searchSuggestions.style.display = "none";
          });
          searchSuggestions.appendChild(suggestion);
      });
      searchSuggestions.style.display = searches.length > 0 ? "block" : "none";
  };

  // Display previous searches on input focus
  searchInput.addEventListener("focus", () => {
      const searches = loadPreviousSearches();
      showSuggestions(searches);
  });

  // Filter suggestions as user types
  searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const searches = loadPreviousSearches().filter((search) =>
          search.toLowerCase().includes(query)
      );
      showSuggestions(searches);
  });

  // Save the search and hide suggestions on form submission
  document.getElementById("searchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const searchQuery = searchInput.value.trim();
      if (searchQuery) {
          saveSearch(searchQuery);
          searchInput.value = "";
          searchSuggestions.style.display = "none";
      }
  });

  // Hide suggestions when clicking outside the input
  document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
          searchSuggestions.style.display = "none";
      }
  });
});



/*const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content form", {
  ...scrollRevealOption,
  delay: 1500,
}); */
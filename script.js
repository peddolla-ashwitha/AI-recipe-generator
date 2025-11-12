document.getElementById("findBtn").addEventListener("click", async () => {
  const ingredients = document.getElementById("ingredients").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Loading recipes...</p>";

  if (!ingredients) {
    resultsDiv.innerHTML = "<p>Please enter some ingredients.</p>";
    return;
  }

  try {
    const response = await fetch(
      https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}
    );
    const data = await response.json();

    if (data.meals) {
      resultsDiv.innerHTML = "";
      data.meals.slice(0, 5).forEach((meal) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
          <h3>${meal.strMeal}</h3>
          <img src="${meal.strMealThumb}" width="100%" style="border-radius:10px" />
          <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">
            <button>View Full Recipe</button>
          </a>
        `;
        resultsDiv.appendChild(card);
      });
    } else {
      resultsDiv.innerHTML = "<p>No recipes found. Try other ingredients.</p>";
    }
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching recipes. Please try again.</p>";
  }
});

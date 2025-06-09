class CharacterVideoGenerator {
  async generateVideo(story, theme = "default") {
    console.log("Generating video for:", story.title, "with theme:", theme);

    // Simulated generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      url: "https://www.w3schools.com/html/mov_bbb.mp4", // Demo video
      title: `Animated: ${story.title}`,
      genre: story.genre || "Fantasy",
      duration: 12,
      characters: story.characters || [],
    };
  }
}

// Instantiate the generator
const characterVideoGenerator = new CharacterVideoGenerator();

// Attach event listener once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const videoBtn = document.getElementById("video-btn");
  const videoContainer = document.getElementById("video-container");
  const loadingOverlay = document.getElementById("loading-overlay");
  const videoPlayer = document.getElementById("video-player");
  const videoDescription = document.getElementById("video-description");
  const videoCharacters = document.getElementById("video-characters");

  if (!videoBtn) return;

  videoBtn.addEventListener("click", async () => {
    const story = window.currentStory || {
      title: "The Lost Crystal",
      genre: "Fantasy",
      characters: [
        { name: "Lyra", description: "A brave warrior" },
        { name: "Tarin", description: "A clever thief" }
      ]
    };

    loadingOverlay.style.display = "flex";

    try {
      const result = await characterVideoGenerator.generateVideo(story);

      // Show video container
      videoContainer.style.display = "block";

      // Inject video
      videoPlayer.innerHTML = `
        <video controls autoplay width="100%">
          <source src="${result.url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;

      // Video details
      videoDescription.innerHTML = `
        <h5>${result.title}</h5>
        <p>Genre: ${result.genre}</p>
        <p>Duration: ${result.duration} seconds</p>
      `;

      // Character cards
      videoCharacters.innerHTML = result.characters.map(char => `
        <div class="col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">${char.name}</h6>
              <p class="card-text">${char.description}</p>
            </div>
          </div>
        </div>
      `).join("");

    } catch (err) {
      alert("Failed to generate video: " + err.message);
    } finally {
      loadingOverlay.style.display = "none";
    }
  });
});

async function fetchFromMW(word) {
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=YOUR_API_KEY`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // If no definitions found
    if (!data[0] || typeof data[0] === "string") {
      return { word, meaning: "No entry found.", audio: null };
    }

    // Get first definition
    const definition = data[0].shortdef ? data[0].shortdef[0] : "No definition available.";

    // Get audio if available
    let audioUrl = null;
    if (data[0].hwi && data[0].hwi.prs && data[0].hwi.prs[0].sound) {
      const audio = data[0].hwi.prs[0].sound.audio;
      const subdir = audio.charAt(0); // first letter decides subdirectory
      audioUrl = `https://media.merriam-webster.com/soundc11/${subdir}/${audio}.wav`;
    }

    return { word, meaning: definition, audio: audioUrl };

  } catch (error) {
    console.error(error);
    return { word, meaning: "Error fetching data.", audio: null };
  }
}

document.querySelector("button").addEventListener("click", async () => {
  const word = document.querySelector("input").value.trim();
  const dictionaryArea = document.querySelector(".dictionary-app");

  if (!word) {
    dictionaryArea.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  const data = await fetchFromMW(word);

  dictionaryArea.innerHTML = `
    <h3>${data.word}</h3>
    <p>${data.meaning}</p>
    ${data.audio ? `<audio controls><source src="${data.audio}" type="audio/wav"></audio>` : ""}
  `;
});

const input = document.querySelector('input')
const btn = document.querySelector('button')
const dictionaryArea = document.querySelector('.dictionary-app')





// https://api.dictionaryapi.dev/api/v2/entries/en/<word>


async function fetchandCreateCard(){
    const data = await dictionaryFn(input.value);

    if (!data || !data.meanings) {
        dictionaryArea.innerHTML = "<div class='card'>No definition found.</div>";
        return;
    }

    let partOfSpeechArray = [];
    for(let i = 0; i < data.meanings.length; i++) {
        partOfSpeechArray.push(data.meanings[i].partOfSpeech);
    }

    dictionaryArea.innerHTML = `
    <div class="card">
        <div class="property">
            <span>Word:</span>
            <span>${data.word}</span>
        </div>
        <div class="property">
            <span>phonetics:</span>
            <span>${data.phonetic || ""}</span>
        </div>
        <div class="property">
            <span>
            <audio controls src="${data.phonetics && data.phonetics[0] ? data.phonetics[0].audio : ""}"></audio>
            </span>
        </div>
        <div class="property">
            <span>Definition</span>
            <span>${data.meanings[0].definitions[0].definition}</span>
        </div>
        <div class="property">
            <span>Example</span>
            <span>${
                data.meanings[1] && data.meanings[1].definitions[0].example
                ? data.meanings[1].definitions[0].example
                : "No example available"
            }</span>
        </div>
        <div class="property">
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
    </div>
    `;
}

                   

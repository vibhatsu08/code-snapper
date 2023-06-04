let finalTagCounts = {}

let codeInput = document.getElementById('code-input');
let tagsArea = document.getElementById('tags-area');
let descriptionArea = document.getElementById('description-area');
let useCaseArea = document.getElementById('use-case-area');

document.getElementById('snip-it-button').addEventListener('click', function() {
    let description = descriptionArea.value.trim();
    let useCase = useCaseArea.value.trim();

    let code = codeInput.value.trim();
    if (code === '') {
		codeInput.value = "";
    	tagsArea.value = "";
        return;
    }

	if (tagsArea.value.trim() == "" ) {
		codeInput.value = "";
    	tagsArea.value = "";
		return;
	}
    let tags = extractTags(tagsArea.value.trim());
    console.log(tags)
    let snippetDiv = createSnippetDiv(code, description, useCase, tags);
    let snippetsBody = document.getElementById('snippets-body');
    snippetsBody.appendChild(snippetDiv);
    codeInput.value = "";
    tagsArea.value = "";

    finalTagsCount();
    updateTagCounts(tags, 1);
});

function extractTags(tagsText) {
    let tags = tagsText.trim().split(/\s+/);
    console.log(Array.from(new Set(tags)))
    return Array.from(new Set(tags));
}

function createSnippetDiv(code, description, useCase, tags) {
    let snippetDiv = document.createElement('div');
    let snippetButtonsDiv = document.createElement('div');
    let closeButtonDiv = document.createElement('button');
    let enlargeButtonDiv = document.createElement('button');
    let gptButtonsContainerDiv = document.createElement('div');
    let useCaseButton = document.createElement('button');
    let explainButton = document.createElement('button');
    let translateButton = document.createElement('button');
    let codeBodyDiv = document.createElement('div');
    let codeGroundDiv = document.createElement('div');
    let codeUseDesc = document.createElement('div');
    let codeDescriptionDiv = document.createElement('div');
    let codeUseCaseDiv = document.createElement('div');
    let codeTagsDiv = document.createElement('div');

    codeGroundDiv.textContent = code;
    useCaseButton.textContent = 'use case';
    explainButton.textContent = 'explain';
    translateButton.textContent = 'translate';

    snippetDiv.classList.add('snippet');
    snippetButtonsDiv.classList.add('snippet-buttons');
    closeButtonDiv.classList.add('close-button');
    enlargeButtonDiv.classList.add('enlarge-button');
    gptButtonsContainerDiv.classList.add('gpt-buttons');
    useCaseButton.classList.add('gpt-use-case');
    explainButton.classList.add('gpt-explain');
    translateButton.classList.add('gpt-translate');
    codeBodyDiv.classList.add('code-body');
    codeGroundDiv.classList.add('code-ground');
    codeUseDesc.classList.add('code-use-desc');
    codeDescriptionDiv.classList.add('code-description');
    codeUseCaseDiv.classList.add('code-use-case');
    codeTagsDiv.classList.add('code-tags');

    codeDescriptionDiv.textContent = description;
    codeUseCaseDiv.textContent = useCase;


    closeButtonDiv.addEventListener('click', function() {
        deleteSnippet(snippetDiv);
    });

    codeUseDesc.appendChild(codeUseCaseDiv);
    codeUseDesc.appendChild(codeDescriptionDiv);
    snippetButtonsDiv.appendChild(closeButtonDiv);
    snippetButtonsDiv.appendChild(enlargeButtonDiv);
    snippetDiv.appendChild(snippetButtonsDiv);
    snippetDiv.appendChild(codeBodyDiv);
    snippetDiv.appendChild(codeUseDesc);
    snippetDiv.appendChild(gptButtonsContainerDiv);
    gptButtonsContainerDiv.appendChild(useCaseButton);
    gptButtonsContainerDiv.appendChild(explainButton);
    gptButtonsContainerDiv.appendChild(translateButton);
    codeBodyDiv.appendChild(codeGroundDiv);
    codeBodyDiv.appendChild(codeTagsDiv);
    codeBodyDiv.appendChild(codeUseDesc);
    codeBodyDiv.appendChild(gptButtonsContainerDiv);

    tags.forEach(function(tag) {
        let tagSpan = document.createElement('span');
        tagSpan.classList.add('tags');
        tagSpan.textContent = tag;
        codeTagsDiv.appendChild(tagSpan);
    
        updateTagCounts([tag], 1);
    });
    return snippetDiv;
}
function deleteSnippet(snippet) {
    let snippetsBody = document.getElementById('snippets-body');
    snippetsBody.removeChild(snippet);
}
function finalTagsCount() {
    let finalTagsBodyDiv = document.getElementById('final-tags-body');
    finalTagsBodyDiv.innerHTML = '';

    for (let tag in finalTagCounts) {
        let finalTagCountsSpan = document.createElement('div');
        let finalTagCountsSpanTag = document.createElement("span");
        let finalTagCountsSpanTagCount = document.createElement("span");
        finalTagCountsSpan.classList.add('tags');
        finalTagCountsSpanTag.textContent = tag;
        finalTagCountsSpanTagCount.textContent = finalTagCounts[tag]
        finalTagCountsSpan.appendChild(finalTagCountsSpanTag);
        finalTagCountsSpan.appendChild(finalTagCountsSpanTagCount);
        finalTagsBodyDiv.appendChild(finalTagCountsSpan);
    }
}
function updateTagCounts(tags, increment) {
    tags.forEach(function(tag) {
        if (finalTagCounts[tag]) {
            finalTagCounts[tag] += increment;
        } else {
            finalTagCounts[tag] = increment;
        }
    });
}
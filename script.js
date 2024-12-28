document.addEventListener('DOMContentLoaded', function() {
    const authorizedCode = "1234"; // Changez ceci pour le code secret
    const validateButton = document.getElementById('validate');
    const contentDiv = document.getElementById('content');
    const audioList = document.getElementById('audio-list');

    // Clé API et identifiant du dossier Google Drive
    const API_KEY = AIzaSyCyL7Iv519prVIDXmWAWaR2t5GHFrK-oDk; // Remplacez par votre clé API
    const FOLDER_ID = 1zBaK9wbAKv8ZRSHpz0N6hoyhDU4l9vYQ; // Remplacez par l'ID du dossier partagé

    validateButton.addEventListener('click', function() {
        const userCode = document.getElementById('code').value;

        if (userCode === authorizedCode) {
            contentDiv.style.display = 'block';
            fetchAudioFiles();
        } else {
            alert("Code incorrect. Veuillez réessayer.");
        }
    });

    function fetchAudioFiles() {
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayAudioFiles(data.files);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des fichiers :", error);
                alert("Impossible de charger les fichiers audio.");
            });
    }

    function displayAudioFiles(files) {
        audioList.innerHTML = ""; // Nettoie la liste

        files.forEach(file => {
            if (file.mimeType === "audio/mpeg" || file.mimeType === "audio/wav") {
                const listItem = document.createElement('li');
                const audioLink = `https://drive.google.com/uc?id=${file.id}`;

                listItem.innerHTML = `
                    <p>${file.name}</p>
                    <audio controls>
                        <source src="${audioLink}" type="${file.mimeType}">
                        Votre navigateur ne supporte pas l'audio.
                    </audio>
                    <br>
                    <a href="${audioLink}" download>Télécharger</a>
                `;
                audioList.appendChild(listItem);
            }
        });

        if (files.length === 0) {
            audioList.innerHTML = "<p>Aucun fichier audio trouvé.</p>";
        }
    }
});

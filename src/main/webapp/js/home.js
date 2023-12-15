document.getElementById('commandInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        executeCommand();
    }
});

function executeCommand() {
    const commandInput = document.getElementById('commandInput');
    const outputPre = document.getElementById('output');

    // Get the entered command
    const command = commandInput.value.trim();

    // Clear previous results
    commandInput.value = '';
    outputPre.innerHTML = '';

    // Check if the command is not empty
    if (command === '') {
        return;
    }

    // Make a GET request to the REST web service
    fetch(`proxmox-api/execute-command?command=${command}`)
        .then(response => response.text())
        .then(result => {
            outputPre.innerHTML = result;
        })
        .catch(error => {
            console.error('Error:', error);
            outputPre.innerHTML = 'Error executing command.';
        });
}

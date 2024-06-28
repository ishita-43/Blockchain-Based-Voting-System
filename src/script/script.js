function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('slide-out');
    notification.classList.add('slide-in');

    setTimeout(() => {
        notification.classList.remove('slide-in');
        notification.classList.add('slide-out');
    }, 3000); // Show the notification for 3 seconds
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }

    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [
        // Add ABI of the contract here
    ];

    const contract = new web3.eth.Contract(abi, contractAddress);

    async function loadCandidates() {
        const candidateCount = await contract.methods.getCandidateIds().call();
        const candidateSelect = document.getElementById("candidate");

        for (let i = 0; i < candidateCount.length; i++) {
            const candidateName = await contract.methods.candidates(i).call();
            const option = document.createElement("option");
            option.value = candidateCount[i];
            option.text = candidateName.name;
            candidateSelect.add(option);
        }
    }

    async function vote() {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const selectedCandidate = document.getElementById("candidate").value;

        await contract.methods.vote(selectedCandidate).send({ from: accounts[0] });
        document.getElementById("status").innerText = "Voted successfully!";
    }

    document.getElementById("vote-form").addEventListener("submit", function (event) {
        event.preventDefault();
        vote();
    });

    loadCandidates();
});

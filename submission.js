//get api
document.addEventListener("DOMContentLoaded", () => {
    const teamSelect = document.getElementById("team-select");
    const apiUrl = "https://synthethix.onrender.com/api/raw-data"; // Replace with your actual API URL

    async function fetchTeams() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            
            const responseData = await response.json();
            console.log("API Response:", responseData); // Debugging

            if (!responseData.data || !Array.isArray(responseData.data)) {
                throw new Error("Unexpected response format: 'data' key missing or not an array");
            }

            let teams = responseData.data.map(item => ({ name: item[0] })); // Extracting names

            populateTeamDropdown(teams);
        } catch (error) {
            console.error("Error fetching team names:", error);
        }
    }

    function populateTeamDropdown(teams) {
        teams.forEach(team => {
            const option = document.createElement("option");
            option.value = team.name; // Using 'name' as the value
            option.textContent = team.name;
            teamSelect.appendChild(option);
        });
    }

    fetchTeams();
});


// post api 
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("submission"); // Ensure this ID matches
    const teamSelect = document.getElementById("team-select");
    const submissionUrl = document.getElementById("submissionUrl");
    const submitButton = document.getElementById("submit-project");
    const apiUrl = "https://synthethix.onrender.com/api/update-sheet"; // Use correct API URL

    // Enable button when the URL input is valid
    submissionUrl.addEventListener("input", () => {
        submitButton.disabled = !submissionUrl.checkValidity();
        submitButton.style.opacity = submissionUrl.checkValidity() ? "1" : "0.6";
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission  

        const requestData = {
            team_name: teamSelect.value,
            input_value: submissionUrl.value
        };

        console.log("Sending Data:", requestData); // Debugging log

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            console.log("Response Status:", response.status); // Debugging log

            const result = await response.json();
            console.log("API Response:", result); // Debugging log

            if (response.ok) {
                alert("Project submitted successfully!");
                form.reset(); // Reset form
                submitButton.disabled = true;
                submitButton.style.opacity = "0.6";
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to submit project. Check the console for details.");
        }
    });
});

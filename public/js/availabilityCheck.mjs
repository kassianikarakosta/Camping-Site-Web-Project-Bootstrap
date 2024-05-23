document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search_button');

    if (searchButton) {
        searchButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const arrivalDate = document.getElementById('arrival_date').value;
            const departureDate = document.getElementById('departure_date').value;

            try {
                const response = await fetch('/api/availability', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        arrivalDate: arrivalDate,
                        departureDate: departureDate,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Availability:', data);
                alert(JSON.stringify(data));
            } catch (error) {
                console.error('Error checking availability:', error);
            }
        });
    }
});
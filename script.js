document.addEventListener("DOMContentLoaded", () => {
    // Load Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

            // Nutrition Tracker Logic
    const foodNameInput = document.getElementById('food-name');
    const caloriesInput = document.getElementById('calories');
    const proteinInput = document.getElementById('protein');
    const carbsInput = document.getElementById('carbs');
    const fatsInput = document.getElementById('fats');
    const addFoodButton = document.getElementById('add-food');
    const foodList = document.getElementById('food-list');
    const totalCaloriesDisplay = document.getElementById('total-calories');
    const totalProteinDisplay = document.getElementById('total-protein');
    const totalCarbsDisplay = document.getElementById('total-carbs');
    const totalFatsDisplay = document.getElementById('total-fats');

    let foodEntries = [];

    function renderFoodEntries() {
        foodList.innerHTML = '';
        let totalCalories = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFats = 0;

        foodEntries.forEach(food => {
            const listItem = document.createElement('li');
            listItem.textContent = `${food.name} - ${food.calories} kcal, P:${food.protein}g, C:${food.carbs}g, F:${food.fats}g`;
            foodList.appendChild(listItem);

            totalCalories += food.calories;
            totalProtein += food.protein;
            totalCarbs += food.carbs;
            totalFats += food.fats;
        });

        totalCaloriesDisplay.textContent = `Total Calories: ${totalCalories} kcal`;
        totalProteinDisplay.textContent = `Total Protein: ${totalProtein} g`;
        totalCarbsDisplay.textContent = `Total Carbs: ${totalCarbs} g`;
        totalFatsDisplay.textContent = `Total Fats: ${totalFats} g`;
    }

    if (addFoodButton) {
        addFoodButton.addEventListener('click', () => {
            const name = foodNameInput.value.trim();
            const calories = parseInt(caloriesInput.value);
            const protein = parseInt(proteinInput.value);
            const carbs = parseInt(carbsInput.value);
            const fats = parseInt(fatsInput.value);

            if (name && !isNaN(calories) && !isNaN(protein) && !isNaN(carbs) && !isNaN(fats)) {
                foodEntries.push({ name, calories, protein, carbs, fats });
                renderFoodEntries();
                foodNameInput.value = '';
                caloriesInput.value = '';
                proteinInput.value = '';
                carbsInput.value = '';
                fatsInput.value = '';
            } else {
                alert('Please enter valid food details.');
            }
        });
    }
});

// Weather API (using OpenWeatherMap)
const apiKey = '5c9e8a205015f3b159f07ff93eb55f20'; // Replace with a secure method in production
const city = 'Ahmedabad'; // Replace with dynamic user input if needed

// Fetch the weather data from the API
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)   
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        let description = data.weather[0].description;
        description = description.charAt(0).toUpperCase() + description.slice(1); // Capitalize first letter
        const weatherInfo = `${description}, ${data.main.temp}°C`; // Corrected string interpolation

        document.getElementById('weather-info').textContent = weatherInfo;
    })    
    .catch(error => {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-info').textContent = 'Failed to load weather.';
    });


document.addEventListener('DOMContentLoaded', () =>{
    const workoutTypeInput = document.getElementById('workout-type');
    const workoutDurationInput = document.getElementById('workout-duration');
    const workoutDateInput = document.getElementById('workout-date');
    const addWorkoutButton = document.getElementById('add-workout');
    const workoutList = document.getElementById('workout-list');
    const totalTimeDisplay = document.getElementById('total-time');

    let workouts = [];

    function renderWorkouts() {
        workoutList.innerHTML = '';
        let totalTime = 0;

        workouts.forEach(workout => {
            const listItem = document.createElement('li');
            listItem.textContent = `${workout.date} - ${workout.type} (${workout.duration} minutes)`;
            workoutList.appendChild(listItem);
            totalTime += workout.duration;
        });

        totalTimeDisplay.textContent = `Total Workout Time: ${totalTime} minutes`;
    }

    addWorkoutButton.addEventListener('click', () => {
        const type = workoutTypeInput.value.trim();
        const duration = parseInt(workoutDurationInput.value);
        const date = workoutDateInput.value;

        if (type && duration && date) {
            workouts.push({ type, duration, date });
            renderWorkouts();
            workoutTypeInput.value = '';
            workoutDurationInput.value = '';
            workoutDateInput.value = '';
        } else {
            alert('Please fill in all fields.');
        }
    });
});
function calculateSleep() {
    let sleepTime = document.getElementById("sleepTime").value;
    let wakeTime = document.getElementById("wakeTime").value;

    if (!sleepTime || !wakeTime) {
        document.getElementById("sleepResult").innerText = "Please enter both times.";
        return;
    }

    let sleep = new Date(`1970-01-01T${sleepTime}Z`);
    let wake = new Date(`1970-01-01T${wakeTime}Z`);

    if (wake < sleep) {
        wake.setDate(wake.getDate() + 1);
    }

    let sleepDuration = (wake - sleep) / (1000 * 60 * 60); // Convert ms to hours
    document.getElementById("sleepResult").innerText = `You slept for ${sleepDuration.toFixed(1)} hours.`;
}


    // MET (Metabolic Equivalent of Task) values for different workouts
const MET_VALUES = {
    running: 9.8,
    cycling: 7.5,
    yoga: 3.0,
    swimming: 8.0,
    strength: 6.0,
    walking: 3.8
};

// Function to calculate calories burned
function calculateCalories(workoutType, duration) {
    const weight = 70; // Assuming an average weight of 70 kg
    const met = MET_VALUES[workoutType.toLowerCase()] || 5; // Default MET if not listed
    return ((met * weight * 3.5) / 200) * duration; // Calories formula
}

// Function to add a workout entry
document.getElementById("add-workout").addEventListener("click", function () {
    const workoutType = document.getElementById("workout-type").value.trim();
    const duration = parseInt(document.getElementById("workout-duration").value);
    const date = document.getElementById("workout-date").value;

    if (!workoutType || isNaN(duration) || duration <= 0 || !date) {
        alert("Please enter valid workout details.");
        return;
    }

    // Calculate calories
    const caloriesBurned = calculateCalories(workoutType, duration).toFixed(2);

    // Display calories burned in input field
    document.getElementById("workout-type").value = workoutType; // Keep the same workout name
    document.getElementById("workout-duration").value = duration;
    document.getElementById("workout-date").value = date;
    document.getElementById("workout-type").nextElementSibling.value = `${caloriesBurned} kcal`; // Calories field

    // Create list item for workout history
    const listItem = document.createElement("li");
    listItem.textContent = `${date}: ${workoutType} - ${duration} min - ${caloriesBurned} kcal`;

    document.getElementById("workout-list").appendChild(listItem);

    // Update total workout time
    const totalTimeElem = document.getElementById("total-time");
    const currentTotal = parseInt(totalTimeElem.textContent.match(/\d+/)) || 0;
    totalTimeElem.textContent = `Total Workout Time: ${currentTotal + duration} minutes`;

    // Clear inputs
    document.getElementById("workout-type").value = "";
    document.getElementById("workout-duration").value = "";
    document.getElementById("workout-date").value = "";
});
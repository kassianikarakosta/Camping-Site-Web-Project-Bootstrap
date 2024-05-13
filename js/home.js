// Get all camping option elements
var campingOptions = document.querySelectorAll('.camping-option');

// Function to calculate and set equal height for all camping options
function setEqualHeight() {
    var maxHeight = 0;
    // Loop through all camping options to find the maximum height
    campingOptions.forEach(function(option) {
        var optionHeight = option.clientHeight;
        if (optionHeight > maxHeight) {
            maxHeight = optionHeight;
        }
    });
    // Set the maximum height to all camping options
    campingOptions.forEach(function(option) {
        option.style.height = maxHeight + 'px';
    });
}

// Call the function initially and on window resize
setEqualHeight();
window.addEventListener('resize', setEqualHeight);

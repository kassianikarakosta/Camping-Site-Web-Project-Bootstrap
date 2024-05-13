$(document).ready(function() {
    console.log("Document ready");
    // Bind calculateTotalPrice function to input event of each input field
    $('input').on('input', function() {
        calculateTotalPriceday();
    });
    
    // Function to calculate total price
    function calculateTotalPriceday() {
        // Get values of all input fields
        var persons = parseInt($('#number_of_persons').val());
        var sunnyCamping = parseInt($('#sunny_camping').val());
        var treeCamping = parseInt($('#tree_camping').val());
        var normalCamping = parseInt($('#normal_camping').val());
        var sunnyCampers = parseInt($('#sunny_campers').val());
        var treeCampers = parseInt($('#tree_campers').val());
        var normalCampers = parseInt($('#normal_campers').val());
        var twoPersonsBungalow = parseInt($('#2_persons').val());
        var threePersonsBungalow = parseInt($('#3_persons').val());
        var fourPersonsBungalow = parseInt($('#4_persons').val());
        var bellTent = parseInt($('#bell_tent').val());
        
        // Calculate total price based on input values
        var totalPrice = (persons * 8) + (sunnyCamping * 12) + (treeCamping * 11) + (normalCamping * 11) +
                         (sunnyCampers * 18) + (treeCampers * 17) + (normalCampers * 16) +
                         (twoPersonsBungalow * 60) + (threePersonsBungalow * 70) + (fourPersonsBungalow * 80) +
                         (bellTent * 60);
        
        // Update total price input field
        $('#total_price_day').val(totalPrice);
    }
    
    
});
// Add event listener for submit
const form = document.querySelector('#loan-form');

form.addEventListener('submit', function(e) {
    // Hide Results
    document.querySelector('#results').style.display = 'none';

    // Show loader gif 
    document.querySelector('#loading').style.display = 'block';


    setTimeout(calculateResults, 2000);
    e.preventDefault();
});
    
// Calculate Results
function calculateResults() { 
    // Form UI variables:
    const amountInput = document.querySelector('#loan-form #amount');
    const interestInput = document.querySelector('#loan-form #interest');
    const yearsInput = document.querySelector('#loan-form #years');

    const monthlyPaymentInput = document.querySelector('#results                                            #monthly-payment');
    const totalPaymentInput = document.querySelector('#results                                            #total-payment');
    const totalInterestInput = document.querySelector('#results                                            #total-interest');


    // Computation formulas
    const principal = parseFloat(amountInput.value);
    const calculatedInterest = (parseFloat(interestInput.value) / 100) / 12;
    const calculatePayments = (parseFloat(yearsInput.value)) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatePayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthly)) {
        monthlyPaymentInput.value = monthly.toFixed(2);
        totalPaymentInput.value = (monthly * calculatePayments).toFixed(2);
        totalInterestInput.value = ((monthly * calculatePayments) 
                                    - principal).toFixed(2);
        
        // Show Results
        document.querySelector('#results').style.display = 'block';

        // Hide loader gif 
        document.querySelector('#loading').style.display = 'none';
    } else {

        showError('Please check your numbers!');
        
        // Hide Results
        document.querySelector('#results').style.display = 'none';

        // Hide loader gif 
        document.querySelector('#loading').style.display = 'none';

        // Clear All fields
        const formInput = document.querySelectorAll('input[type="text"],input[type="number"]'); 

        for(var i = 0; i < formInput.length; i++) {
            formInput[i].value = '';
        }

        
    }

}

function showError(error) {
    // Create a div
    const errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to errorDiv
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Alert before card heading
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}

// Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}




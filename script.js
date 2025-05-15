        function calculateMortgage() {
            // Get input values
            const loanAmount = parseFloat(document.getElementById('loanAmount').value);
            const loanTerm = parseInt(document.getElementById('loanTerm').value);
            const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
            const mortgageType = document.querySelector('input[name="mortgageType"]:checked').value;
            
            // Calculate monthly interest rate
            const monthlyInterestRate = annualInterestRate / 12;
            const numberOfPayments = loanTerm * 12;
            
            let monthlyPayment, totalRepayment;
            
            if (mortgageType === 'repayment') {
                // Repayment mortgage calculation
                monthlyPayment = loanAmount * 
                    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
                
                totalRepayment = monthlyPayment * numberOfPayments;
            } else {
                // Interest only mortgage calculation
                monthlyPayment = loanAmount * monthlyInterestRate;
                totalRepayment = loanAmount + (monthlyPayment * numberOfPayments);
            }
            
            // Update the UI with formatted values
            document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);
            document.getElementById('totalRepayment').textContent = formatCurrency(totalRepayment);
        }
        
        function formatCurrency(amount) {
            return '£' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        }
        
        // Calculate on page load
        window.onload = calculateMortgage;
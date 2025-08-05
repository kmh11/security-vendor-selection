document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vendor-form');
    const progressContainer = document.getElementById('progress-container');
    const resultContainer = document.getElementById('result-container');
    const submitBtn = document.getElementById('submit-btn');
    const newAnalysisBtn = document.getElementById('new-analysis');

    const prioritySlider = document.getElementById('security-priority');
    const priorityValue = document.getElementById('priority-value');
    
    const budgetSlider = document.getElementById('budget-range');
    const budgetValue = document.getElementById('budget-value');
    
    const complexitySlider = document.getElementById('complexity');
    const complexityValue = document.getElementById('complexity-value');
    
    const codebaseSlider = document.getElementById('codebase-size');
    const codebaseValue = document.getElementById('codebase-value');
    
    const sensitivitySlider = document.getElementById('data-sensitivity');
    const sensitivityValue = document.getElementById('sensitivity-value');

    prioritySlider.addEventListener('input', function() {
        priorityValue.textContent = this.value;
    });

    budgetSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value >= 500000) {
            budgetValue.textContent = '$500K+';
        } else {
            budgetValue.textContent = '$' + (value / 1000) + 'K';
        }
    });

    complexitySlider.addEventListener('input', function() {
        complexityValue.textContent = this.value;
    });

    codebaseSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        if (value >= 1000000) {
            codebaseValue.textContent = '1M+';
        } else if (value >= 1000) {
            codebaseValue.textContent = (value / 1000) + 'K';
        } else {
            codebaseValue.textContent = value;
        }
    });

    sensitivitySlider.addEventListener('input', function() {
        sensitivityValue.textContent = this.value;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        form.style.display = 'none';
        progressContainer.style.display = 'block';
        
        simulateProgress();
        
        const formData = new FormData(form);
        
        fetch('/api/recommend', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('vendor-name').textContent = data.vendor;
            progressContainer.style.display = 'none';
            resultContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
            form.style.display = 'block';
            progressContainer.style.display = 'none';
        });
    });

    newAnalysisBtn.addEventListener('click', function() {
        form.reset();
        priorityValue.textContent = '5';
        budgetValue.textContent = '$50K';
        complexityValue.textContent = '5';
        codebaseValue.textContent = '50K';
        sensitivityValue.textContent = '3';
        
        resultContainer.style.display = 'none';
        form.style.display = 'block';
    });

    function simulateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        const steps = [
            { percent: 10, text: 'Analyzing project requirements...' },
            { percent: 25, text: 'Evaluating security priorities...' },
            { percent: 40, text: 'Matching technology stack...' },
            { percent: 55, text: 'Checking compliance requirements...' },
            { percent: 70, text: 'Calculating budget alignment...' },
            { percent: 85, text: 'Reviewing vendor capabilities...' },
            { percent: 100, text: 'Finalizing recommendation...' }
        ];
        
        let currentStep = 0;
        
        const updateProgress = () => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                progressFill.style.width = step.percent + '%';
                progressText.textContent = step.text;
                currentStep++;
                
                const delay = currentStep === steps.length ? 500 : 600 + Math.random() * 400;
                setTimeout(updateProgress, delay);
            }
        };
        
        updateProgress();
    }
});
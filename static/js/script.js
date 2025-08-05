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

    // Translation dictionary for dynamic content
    const translations = {
        'en': {
            'step1': 'Analyzing project requirements...',
            'step2': 'Evaluating security priorities...',
            'step3': 'Matching technology stack...',
            'step4': 'Checking compliance requirements...',
            'step5': 'Calculating budget alignment...',
            'step6': 'Reviewing vendor capabilities...',
            'step7': 'Finalizing recommendation...',
            'error': 'An error occurred while processing your request.'
        },
        'es': {
            'step1': 'Analizando requisitos del proyecto...',
            'step2': 'Evaluando prioridades de seguridad...',
            'step3': 'Comparando pila tecnológica...',
            'step4': 'Verificando requisitos de cumplimiento...',
            'step5': 'Calculando alineación presupuestaria...',
            'step6': 'Revisando capacidades del proveedor...',
            'step7': 'Finalizando recomendación...',
            'error': 'Ocurrió un error al procesar su solicitud.'
        },
        'fr': {
            'step1': 'Analyse des exigences du projet...',
            'step2': 'Évaluation des priorités de sécurité...',
            'step3': 'Comparaison de la pile technologique...',
            'step4': 'Vérification des exigences de conformité...',
            'step5': 'Calcul de l\'alignement budgétaire...',
            'step6': 'Examen des capacités du fournisseur...',
            'step7': 'Finalisation de la recommandation...',
            'error': 'Une erreur s\'est produite lors du traitement de votre demande.'
        }
    };

    // Get current language from data attribute
    function getCurrentLanguage() {
        const languageSelect = document.getElementById('language-select');
        return languageSelect ? languageSelect.value : 'en';
    }

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
            const currentLang = getCurrentLanguage();
            alert(translations[currentLang]['error']);
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
        const currentLang = getCurrentLanguage();
        
        const steps = [
            { percent: 10, text: translations[currentLang]['step1'] },
            { percent: 25, text: translations[currentLang]['step2'] },
            { percent: 40, text: translations[currentLang]['step3'] },
            { percent: 55, text: translations[currentLang]['step4'] },
            { percent: 70, text: translations[currentLang]['step5'] },
            { percent: 85, text: translations[currentLang]['step6'] },
            { percent: 100, text: translations[currentLang]['step7'] }
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

// Language switching function
function changeLanguage(lang) {
    window.location.href = '/set_language/' + lang;
}
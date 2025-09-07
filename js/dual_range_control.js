var dual_range = {}

dual_range.setup = function(minId, maxId, fillId, minValueId, maxValueId, prefix = '', suffix = ''){
    const minInput = document.getElementById(minId);
    const maxInput = document.getElementById(maxId);
    const fill = document.getElementById(fillId);
    const minValueSpan = document.getElementById(minValueId);
    const maxValueSpan = document.getElementById(maxValueId);

    function updateRange() {
        let minVal = parseFloat(minInput.value);
        let maxVal = parseFloat(maxInput.value);
        
        // Ensure min doesn't exceed max
        if (minVal > maxVal) {
            minInput.value = maxVal;
            minVal = maxVal;
        }
        
        // Ensure max doesn't go below min
        if (maxVal < minVal) {
            maxInput.value = minVal;
            maxVal = minVal;
        }
        
        // Update display values
        minValueSpan.textContent = prefix + minVal + suffix;
        maxValueSpan.textContent = prefix + maxVal + suffix;
        
        // Calculate fill bar position and width
        const min = parseFloat(minInput.min);
        const max = parseFloat(minInput.max);
        const range = max - min;
        
        const leftPercent = ((minVal - min) / range) * 100;
        const rightPercent = ((maxVal - min) / range) * 100;
        
        fill.style.left = leftPercent + '%';
        fill.style.width = (rightPercent - leftPercent) + '%';
    }

    minInput.addEventListener('input', updateRange);
    maxInput.addEventListener('input', updateRange);
    
    // Initial update
    updateRange();
}

        // Initialize both sliders
        setupDualRange('volumeMin', 'volumeMax', 'volumeFill', 'volumeMinValue', 'volumeMaxValue');
        setupDualRange('priceMin', 'priceMax', 'priceFill', 'priceMinValue', 'priceMaxValue', '$');
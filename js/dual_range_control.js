function setup_dual_range_controls(rangeId, initialMin, initialMax, span, convertor, minChangeListener, maxChangeListener){

    const range = $(rangeId);
    const minInput = range.getElementsByTagName('input')[0];
    const maxInput = range.getElementsByTagName('input')[1];
    const valueSpan = range.getElementsByTagName('span')[1];

    minInput.value = initialMin;
    maxInput.value = initialMax;

    function updateRange() {
        let minVal = parseFloat(minInput.value);
        let maxVal = parseFloat(maxInput.value);
        let minLimitVal = parseFloat(minInput.min);
        let maxLimitVal = parseFloat(maxInput.min);
    
        if (minVal > maxVal - span) {
            let newValue = maxVal - span;
            if (newValue < minLimitVal) {
                minInput.value = minLimitVal;
                minVal = minLimitVal;
            } else {
                minInput.value = newValue;
                minVal = newValue;
            }
        }
        if (maxVal < minVal + span + 1) {
            var newValue = minVal + span;
            if (newValue < minLimitVal+span+1) {
                maxInput.value = minLimitVal+span+1;
                maxVal = minLimitVal+span+1;
            } else {
                maxInput.value = newValue;
                maxVal = newValue;
            }
        }
        valueSpan.textContent = convertor(minVal, maxVal);
    }


    minInput.addEventListener('input', updateRange);
    maxInput.addEventListener('input', updateRange);
    minInput.addEventListener('change', minChangeListener);
    maxInput.addEventListener('change', maxChangeListener);
    
    updateRange();
}
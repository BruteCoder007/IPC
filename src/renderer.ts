document.addEventListener('DOMContentLoaded', () => {
    const counterDisplay = document.getElementById('counterDisplay');
    const incrementButton = document.getElementById('incrementButton');
    const decrementButton = document.getElementById('decrementButton');

    window.electron.onCounterValue((event, value) => {
        if (counterDisplay) {
            counterDisplay.innerText = value.toString();
        }
    });

    incrementButton?.addEventListener('click', () => {
        window.electron.incrementCounter();
    });

    decrementButton?.addEventListener('click', () => {
        window.electron.decrementCounter();
    });

    // Request initial counter value
    window.electron.getCounter();
});

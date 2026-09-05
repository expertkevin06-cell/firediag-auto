if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker enregistré:', registration.scope);
            })
            .catch(error => {
                console.error('Échec enregistrement ServiceWorker:', error);
            });
    });
}

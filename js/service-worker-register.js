if ('serviceWorker' in navigator) {
    const basePath = window.location.pathname.includes('/firediag-auto') ? '/firediag-auto' : '';
    
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(basePath + '/sw.js')
            .then(registration => {
                console.log('ServiceWorker enregistré:', registration.scope);
            })
            .catch(error => {
                console.error('Échec enregistrement ServiceWorker:', error);
            });
    });
}

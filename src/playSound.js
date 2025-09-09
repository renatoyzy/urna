let audios = {}; // escopo global, mas vazio até inicializar

/**
 * Inicializa os áudios no cliente
 */
export function initSounds() {
    if (typeof window === 'undefined') return; // garante que só roda no browser

    const audioFiles = ['UrnaConfirm'];
    audios = {}; // reseta para garantir

    audioFiles.forEach(name => {
        audios[name] = new Audio(`/sfx/${name}.mp3`);
    });
}

/**
 * Toca um som para o usuário
 * @param {string} sound - Nome do áudio (ex.: 'PixelPlace')
 */
export default function playSound(sound) {
    if (typeof window === 'undefined') return;

    audios[sound]?.play().catch(err => console.warn(`Erro ao tocar som ${sound}:`, err));
}
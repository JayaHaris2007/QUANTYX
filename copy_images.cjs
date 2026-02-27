const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Jaya Haris\\.gemini\\antigravity\\brain\\101c6458-4723-4e4f-b370-162640a97966';
const destDir = 'C:\\Users\\Jaya Haris\\Desktop\\Projects\\QUANTYX\\public\\images\\products';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const prefixes = [
    'keyboard_phantom', 'keyboard_shadow', 'keyboard_apex', 'keyboard_raider',
    'mouse_vortex', 'mouse_viper', 'headphones_cloud', 'headphones_echo',
    'mouse_titan', 'headphones_sonic', 'controller_nexus', 'controller_scuf',
    'console_quantum', 'console_nano', 'pad_flux', 'pad_glide'
];

prefixes.forEach(prefix => {
    // Find the newest file with this prefix
    const matchingFiles = files.filter(f => f.startsWith(prefix + '_') && f.endsWith('.png'));
    if (matchingFiles.length > 0) {
        // Sort by modification time (most recent first)
        matchingFiles.sort((a, b) => {
            return fs.statSync(path.join(srcDir, b)).mtimeMs - fs.statSync(path.join(srcDir, a)).mtimeMs;
        });
        const srcFile = path.join(srcDir, matchingFiles[0]);
        const destFile = path.join(destDir, prefix + '.png');
        fs.copyFileSync(srcFile, destFile);
        console.log('Copied ' + matchingFiles[0] + ' to ' + prefix + '.png');
    } else {
        console.log('No file found for ' + prefix);
    }
});
console.log('Done.');

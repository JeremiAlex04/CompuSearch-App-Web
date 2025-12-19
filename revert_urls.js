const fs = require('fs');
const path = require('path');

const dir = 'e:/UTP/CICLO 6/Curso Integrador I/CompuSearch/Frontend/src';
const search = 'http://localhost:8081';
const replace = 'http://localhost:8080';

function walk(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const filepath = path.join(directory, file);
        const stat = fs.statSync(filepath);
        if (stat.isDirectory()) {
            walk(filepath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            let content = fs.readFileSync(filepath, 'utf8');
            if (content.includes(search)) {
                content = content.split(search).join(replace);
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`Updated ${filepath}`);
            }
        }
    }
}

walk(dir);

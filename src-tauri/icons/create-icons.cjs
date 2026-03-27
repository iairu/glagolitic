const fs = require('fs');
const { PNG } = require('pngjs');

async function createPNG(size, color = [102, 126, 234, 255]) {
  const png = new PNG({
    width: size,
    height: size,
    filterType: -1,
  });

  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) * 4;
      png.data[idx] = color[0];
      png.data[idx + 1] = color[1];
      png.data[idx + 2] = color[2];
      png.data[idx + 3] = color[3];
    }
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    png.pack()
      .on('data', chunk => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks)))
      .on('error', reject);
  });
}

async function main() {
  const sizes = [32, 128, 256];
  const names = ['32x32.png', '128x128.png', '128x128@2x.png'];

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const pngBuffer = await createPNG(size);
    fs.writeFileSync(names[i], pngBuffer);
    console.log(`Created ${names[i]} (${size}x${size})`);
  }
  
  console.log('Done!');
}

main().catch(console.error);

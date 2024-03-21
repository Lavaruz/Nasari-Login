# Bagaimana cara menjalankan program ??
Video demo bisa dilihat pada file mp.4 diatas, dengan cara mendownloadnya

## Penting
pastikan dalam komputer sudah terinstall Node JS & MySQL

## Username & Password
Ketika menjalankan applikasi untuk pertamakali server akan langsung membuat user untuk login, gunakan user ini untuk melakukan login pada applikasi
- username: nasari
- password: 123

## Instalasi prosess
- Lakukan clone terhadap repository ini
- Masuk ke dalam folder dan buka CMD dan ketikan `npm install`
- Sebelum memulai applikasi buatlah terlebih dahulu database bernama "nasari" dalam MySQL
- ATAU ubah nama database dalam file /utils/config.json:development.database sesuai keinginan dan buat database sesuai nama yang diinput dalam config
- Lakuakn setting config untuk menyesuaikan dengan database, seperti username, password
- jalankan applikasi dengan command `node ./server.js`

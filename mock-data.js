// MOCK DATA - Buat testing frontend (nanti diganti pake backend real)

const MOCK_USERS = [
    { id: 1, username: "arka_senja", email: "arka@email.com", role: "author", bio: "Penulis fantasi" },
    { id: 2, username: "baca_yuk", email: "baca@email.com", role: "reader", bio: "Pembaca setia" }
];

const MOCK_NOVELS = [
    {
        id: 1,
        title: "Petualangan di Negeri Awan",
        author_id: 1,
        author_name: "arka_senja",
        genre: "Fantasi",
        description: "Cerita tentang seorang pemuda yang menemukan dunia tersembunyi di atas awan. Penuh dengan petualangan, persahabatan, dan misteri.",
        cover: null,
        status: "published",
        views: 1234,
        likes: 89,
        rating: 4.8,
        created_at: "2025-04-01",
        chapters: [
            { id: 101, title: "Bab 1: Awal Mula", order: 1, views: 567 },
            { id: 102, title: "Bab 2: Pertemuan", order: 2, views: 432 },
            { id: 103, title: "Bab 3: Rahasia", order: 3, views: 321 }
        ]
    },
    {
        id: 2,
        title: "Cinta di Kota Tua",
        author_id: 1,
        author_name: "arka_senja",
        genre: "Roman",
        description: "Kisah cinta yang terjadi di antara lorong-lorong kota tua. Dua insan yang dipertemukan oleh takdir.",
        cover: null,
        status: "published",
        views: 2345,
        likes: 156,
        rating: 4.9,
        created_at: "2025-03-15",
        chapters: [
            { id: 201, title: "Bab 1: Pertemuan", order: 1, views: 890 },
            { id: 202, title: "Bab 2: Kenangan", order: 2, views: 678 }
        ]
    },
    {
        id: 3,
        title: "Detektif Mata Hati",
        author_id: 2,
        author_name: "baca_yuk",
        genre: "Misteri",
        description: "Seorang detektif buta yang punya kemampuan luar biasa memecahkan kasus.",
        cover: null,
        status: "published",
        views: 876,
        likes: 45,
        rating: 4.2,
        created_at: "2025-04-05",
        chapters: [
            { id: 301, title: "Bab 1: Kasus Hilang", order: 1, views: 234 }
        ]
    }
];

const MOCK_CHAPTERS = {
    101: {
        id: 101,
        novel_id: 1,
        title: "Bab 1: Awal Mula",
        content: `Pada suatu hari, di sebuah desa yang jauh di pegunungan, hiduplah seorang pemuda bernama Arka. Ia dikenal sebagai pemuda yang pemberani dan selalu ingin tahu. Suatu malam, saat bulan purnama bersinar terang, Arka melihat cahaya aneh dari puncak gunung. Tanpa berpikir panjang, ia memutuskan untuk mendaki gunung sendirian.

Setelah berjam-jam berjalan, Arka sampai di sebuah gua yang mengeluarkan cahaya keemasan. Saat ia masuk, ia tidak percaya dengan apa yang dilihatnya. Di dalam gua itu, ada sebuah dunia yang sangat indah, dengan awan-awan yang bisa dipijak dan rumah-rumah yang terbuat dari kristal.

"Selamat datang di Negeri Awan, wahai pendatang," sambut seorang perempuan tua dengan senyum ramah. "Kami sudah menunggumu sejak lama."`,
        views: 567,
        created_at: "2025-04-01"
    },
    102: {
        id: 102,
        novel_id: 1,
        title: "Bab 2: Pertemuan",
        content: `Perempuan tua itu bernama Nenek Widya. Ia adalah penjaga Negeri Awan. "Kamu adalah anak yang terpilih, Arka," katanya. "Negeri Awan sedang terancam oleh kegelapan yang datang dari timur. Hanya kamu yang bisa menyelamatkannya."

Arka terkejut. "Tapi saya hanya pemuda biasa, Nek. Saya tidak punya kekuatan apa-apa."

"Kamu punya hati yang murni dan keberanian, Nak. Itu sudah cukup," jawab Nenek Widya sambil memberikan Arka sebuah liontin berbentuk awan. "Liontin ini akan membantumu dalam perjalanan."

Arka menerima liontin itu dengan tangan gemetar. Liontin itu hangat di tangannya, seolah memiliki kehidupan sendiri. Cahaya keemasan memancar dari dalamnya, membuat sekitar Arka tampak bersinar.`,
        views: 432,
        created_at: "2025-04-02"
    },
    103: {
        id: 103,
        novel_id: 1,
        title: "Bab 3: Rahasia",
        content: `Malam itu, Nenek Widya membawa Arka ke sebuah ruangan besar yang penuh dengan cermin. Di setiap cermin, terpantul gambar-gambar yang berbeda — bukan Arka yang biasa, melainkan sosok yang lebih besar, lebih kuat, dengan sayap yang membentang lebar.

"Inilah dirimu yang sebenarnya," kata Nenek Widya. "Darah leluhur Penjaga Awan mengalir dalam tubuhmu, Arka. Nenek moyangmu adalah penguasa langit yang dulunya melindungi negeri ini."

Arka terdiam. Selama ini ia hanya tahu dirinya anak yatim piatu yang dibesarkan di desa kecil. Tidak ada yang pernah menceritakan soal keturunan dan asal-usulnya.

"Kegelapan sudah semakin dekat," lanjut Nenek Widya. "Kamu harus belajar menggunakan kekuatanmu sebelum terlambat. Besok, perjalananmu dimulai."`,
        views: 321,
        created_at: "2025-04-03"
    },
    201: {
        id: 201,
        novel_id: 2,
        title: "Bab 1: Pertemuan",
        content: `Di sudut kota tua yang penuh kenangan, ada sebuah kafe kecil bernama "Senja di Ujung Jalan". Kafe itu terkenal dengan kopi robusta-nya yang kuat dan udara yang selalu sejuk karena pepohonan besar di sekelilingnya.

Rara tidak pernah berniat masuk ke kafe itu. Ia hanya berlindung dari hujan deras yang tiba-tiba turun, berdiri di bawah teras sempit dengan payung yang sudah rusak di tangannya.

"Masuk saja," kata seseorang dari dalam. Sebuah suara yang dalam, tenang, dan entah kenapa terasa seperti sudah ia kenal lama.

Rara menatap ke dalam dan melihat seorang pria muda sedang membaca buku sambil menikmati kopi hitamnya. Ia mengangkat kepala, tersenyum singkat, lalu kembali ke bukunya.

Rara masuk. Dan sejak saat itu, hidupnya tidak pernah sama lagi.`,
        views: 890,
        created_at: "2025-03-15"
    },
    202: {
        id: 202,
        novel_id: 2,
        title: "Bab 2: Kenangan",
        content: `Tiga bulan berlalu sejak Rara pertama kali masuk ke kafe itu. Sekarang, nyaris setiap sore ia duduk di meja pojok yang sama, memesan es kopi susu yang sama, dan menghabiskan waktu membaca buku atau mengerjakan desain grafis untuk kliennya.

Pria itu bernama Farhan. Pemilik kafe sekaligus barista. Mereka jarang berbicara panjang, tapi setiap kali bertatap mata, ada sesuatu yang tidak bisa Rara jelaskan.

Suatu hari, Farhan duduk di depannya tanpa diundang. "Kamu selalu kelihatan seperti orang yang menyimpan banyak cerita," katanya.

Rara menatapnya. "Semua orang punya cerita."

"Tapi tidak semua orang membawa beratnya seperti kamu," jawab Farhan pelan.

Rara tidak bisa berkata apa-apa. Karena untuk pertama kalinya dalam waktu yang sangat lama, seseorang melihatnya — bukan hanya memandang.`,
        views: 678,
        created_at: "2025-03-16"
    },
    301: {
        id: 301,
        novel_id: 3,
        title: "Bab 1: Kasus Hilang",
        content: `Detektif Rama tidak bisa melihat dengan matanya. Sebuah kecelakaan tujuh tahun lalu merenggut penglihatannya. Tapi justru sejak itu, ia bisa "melihat" hal-hal yang tidak bisa dilihat orang lain.

Indera penciumannya bisa mendeteksi jenis parfum langka dari jarak dua meter. Telinganya bisa membedakan suara langkah kaki dari lantai atas gedung empat tingkat. Dan hatinya — kata orang-orang di kantor — bisa membaca kebohongan lebih cepat dari alat poligraf manapun.

Pagi itu, seorang wanita datang ke kantornya di Jalan Bougenvile nomor 12. Langkahnya tergesa-gesa, napasnya tidak teratur, dan berdasarkan aroma yang ia bawa, wanita itu baru saja menangis dalam waktu kurang dari satu jam.

"Anak saya hilang," katanya tanpa basa-basi. "Polisi bilang belum bisa diproses. Tapi saya tahu ini bukan kasus biasa."

Rama mengangguk pelan. "Ceritakan semuanya dari awal."`,
        views: 234,
        created_at: "2025-04-05"
    }
};

// Helper functions untuk mock data
function getNovels() {
    return MOCK_NOVELS;
}

function getNovelById(id) {
    return MOCK_NOVELS.find(n => n.id === id);
}

function getChapterById(id) {
    return MOCK_CHAPTERS[id];
}

function getChaptersByNovelId(novelId) {
    const novel = getNovelById(novelId);
    if (!novel) return [];
    return novel.chapters.map(ch => ({
        ...ch,
        content: MOCK_CHAPTERS[ch.id]?.content || ""
    }));
}

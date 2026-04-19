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

"Kamu punya hati yang murni dan keberanian, Nak. Itu sudah cukup," jawab Nenek Widya sambil memberikan Arka sebuah liontin berbentuk awan. "Liontin ini akan membantumu dalam perjalanan."`,
        views: 432,
        created_at: "2025-04-02"
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
export interface Lesson {
  id: string;
  title: string;
  level: number;
  vocabulary: { turkish: string; kyrgyz: string; audio?: string }[];
  grammarNote: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export const turkishLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: '1-сабак: Саламдашуу жана Негизги сөздөр',
    level: 1,
    vocabulary: [
      { turkish: 'Merhaba', kyrgyz: 'Салам' },
      { turkish: 'Nasılsın?', kyrgyz: 'Кандайсың?' },
      { turkish: 'İyiyim', kyrgyz: 'Жакшымын' },
      { turkish: 'Teşekkür ederim', kyrgyz: 'Рахмат' },
      { turkish: 'Görüşürüz', kyrgyz: 'Көрүшкөнчө' },
      { turkish: 'Günaydın', kyrgyz: 'Кутман таң' }
    ],
    grammarNote: 'Түрк тилинде "Merhaba" эң универсалдуу саламдашуу түрү. Ал эми "Nasılsın?" суроосуна адатта "İyiyim" деп жооп берилет.',
    questions: [
      { question: '"Салам" сөзүнүн түркчөсү?', options: ['Güle güle', 'Merhaba', 'Hayır', 'Evet'], correctAnswer: 'Merhaba' },
      { question: '"Nasılsın?" суроосуна туура жоопту танда:', options: ['İyiyim', 'Görüşürüz', 'Merhaba', 'Defter'], correctAnswer: 'İyiyim' },
      { question: '"Кутман таң" - бул...', options: ['İyi geceler', 'Günaydın', 'İyi akşamlar', 'Selam'], correctAnswer: 'Günaydın' },
      { question: '"Рахмат" сөзүнүн түркчөсү кандай?', options: ['Lütfen', 'Teşekkür ederim', 'Pardon', 'Tamam'], correctAnswer: 'Teşekkür ederim' },
      { question: 'Коштошуу учурунда кайсы сөз колдонулат?', options: ['Merhaba', 'Nasılsın', 'Görüşürüz', 'Evet'], correctAnswer: 'Görüşürüz' },
      { question: '"İyiyim" - кыргызча котормосу кандай?', options: ['Жакшымын', 'Жаманмын', 'Ооруп жатам', 'Билбейм'], correctAnswer: 'Жакшымын' },
      { question: '"Evet" - бул...', options: ['Жок', 'Ооба', 'Балким', 'Эч качан'], correctAnswer: 'Ооба' },
      { question: '"Hayır" - бул...', options: ['Ооба', 'Жок', 'Салам', 'Рахмат'], correctAnswer: 'Жок' },
      { question: '"Lütfen" - кыргызча котормосу?', options: ['Сураныч', 'Кечиресиз', 'Мүмкүн', 'Болду'], correctAnswer: 'Сураныч' },
      { question: 'Досуңа "Кандайсың?" деп кантип айтасың?', options: ['Nasılsın?', 'Neredesin?', 'Kimsin?', 'Nasılsınız?'], correctAnswer: 'Nasılsın?' }
    ]
  },
  {
    id: 'lesson-2',
    title: '2-сабак: Үй-бүлө жана Адамдар',
    level: 1,
    vocabulary: [
      { turkish: 'Anne', kyrgyz: 'Апа' },
      { turkish: 'Baba', kyrgyz: 'Ата' },
      { turkish: 'Kardeş', kyrgyz: 'Бир тууган' },
      { turkish: 'Çocuk', kyrgyz: 'Бала' },
      { turkish: 'Arkadaş', kyrgyz: 'Дос' }
    ],
    grammarNote: 'Үй-бүлө мүчөлөрүнө "-ым/-им" мүчөлөрүн кошуу менен "менин апам" (annem) же "менин атам" (babam) деп айтууга болот.',
    questions: [
      { question: '"Апа" - түркчө кандай?', options: ['Baba', 'Anne', 'Teyze', 'Hala'], correctAnswer: 'Anne' },
      { question: '"Дос" сөзүнүн котормосу?', options: ['Düşman', 'Arkadaş', 'Kardeş', 'Öğretmen'], correctAnswer: 'Arkadaş' },
      { question: '"Baba" - кыргызча ким?', options: ['Апа', 'Ата', 'Таяке', 'Чоң ата'], correctAnswer: 'Ата' },
      { question: '"Бир тууган" - түркчө кандай?', options: ['Anne', 'Kardeş', 'Bebek', 'Kız'], correctAnswer: 'Kardeş' },
      { question: '"Çocuk" - бул ким?', options: ['Бала', 'Киши', 'Карыя', 'Аял'], correctAnswer: 'Бала' },
      { question: '"Менин апам" - кантип айтылат?', options: ['Annem', 'Anneler', 'Annesiz', 'Annesi'], correctAnswer: 'Annem' },
      { question: '"Менин атам" - кантип айтылат?', options: ['Babalar', 'Babam', 'Babası', 'Babamlar'], correctAnswer: 'Babam' },
      { question: '"Кыз" сөзүнүн түркчөсү?', options: ['Erkek', 'Kız', 'Bayan', 'Adam'], correctAnswer: 'Kız' },
      { question: '"Эркек" сөзүнүн түркчөсү?', options: ['Erkek', 'Kız', 'Bebek', 'Kardeş'], correctAnswer: 'Erkek' },
      { question: '"Досум" - кантип айтылат?', options: ['Arkadaş', 'Arkadaşım', 'Arkadaşlar', 'Dost'], correctAnswer: 'Arkadaşım' }
    ]
  },
  {
    id: 'lesson-3',
    title: '3-сабак: Сандар жана Түстөр',
    level: 1,
    vocabulary: [
      { turkish: 'Bir', kyrgyz: 'Бир' },
      { turkish: 'İki', kyrgyz: 'Эки' },
      { turkish: 'Üç', kyrgyz: 'Үч' },
      { turkish: 'Kırmızı', kyrgyz: 'Кызыл' },
      { turkish: 'Mavi', kyrgyz: 'Көк' }
    ],
    grammarNote: 'Түрк тилинде сандар зат атоочтун алдында келет жана зат атооч көптүк түрдө (лар/лер) келбейт. Мисалы: "İki kitap" (Туура), "İki kitaplar" (Ката).',
    questions: [
      { question: '"Бир" - түркчө кандай?', options: ['Bir', 'İki', 'Üç', 'Dört'], correctAnswer: 'Bir' },
      { question: '"Кызыл" - түркчө кандай?', options: ['Mavi', 'Sarı', 'Kırmızı', 'Yeşil'], correctAnswer: 'Kırmızı' },
      { question: '"Üç" санын тап:', options: ['1', '2', '3', '5'], correctAnswer: '3' },
      { question: '"Көк" - түркчө кандай?', options: ['Mavi', 'Siyah', 'Beyaz', 'Mor'], correctAnswer: 'Mavi' },
      { question: '"Беш" - түркчө кандай?', options: ['Dört', 'Beş', 'Altı', 'Yedi'], correctAnswer: 'Beş' },
      { question: '"On" - кайсы сан?', options: ['5', '10', '20', '1'], correctAnswer: '10' },
      { question: '"Ак" - түркчө кандай?', options: ['Beyaz', 'Siyah', 'Gri', 'Kırmızı'], correctAnswer: 'Beyaz' },
      { question: '"Siyah" - кыргызча котормосу?', options: ['Ак', 'Көк', 'Кара', 'Сары'], correctAnswer: 'Кара' },
      { question: '"Эки китеп" - туура котормосу:', options: ['İki kitaplar', 'İki kitap', 'Bir kitap', 'Üç kitap'], correctAnswer: 'İki kitap' },
      { question: '"Yeşil" - кайсы түс?', options: ['Кызыл', 'Жашыл', 'Күрөң', 'Кызгылт'], correctAnswer: 'Жашыл' }
    ]
  },
  {
    id: 'lesson-4',
    title: '4-сабак: Мектеп жана Окуу куралдары',
    level: 1,
    vocabulary: [
      { turkish: 'Okul', kyrgyz: 'Мектеп' },
      { turkish: 'Öğretmen', kyrgyz: 'Мугалим' },
      { turkish: 'Öğrenci', kyrgyz: 'Окуучу' },
      { turkish: 'Kitap', kyrgyz: 'Китеп' },
      { turkish: 'Defter', kyrgyz: 'Дептер' }
    ],
    grammarNote: 'Мектепте колдонулган сөздөр. Көптүк санды жасоодо -lar/ler мүчөлөрүн унутпаңыз (Kitaplar, Defterler).',
    questions: [
      { question: '"Мектеп" - түркчө кандай?', options: ['Ev', 'Okul', 'Bahçe', 'Sokak'], correctAnswer: 'Okul' },
      { question: '"Мугалим" - түркчө кандай?', options: ['Öğrenci', 'Öğretmen', 'Müdür', 'Doktor'], correctAnswer: 'Öğretmen' },
      { question: '"Окуучу" - түркчө кандай?', options: ['Öğrenci', 'Öğretmen', 'Polis', 'Pilot'], correctAnswer: 'Öğrenci' },
      { question: '"Дептер" - түркчө кандай?', options: ['Kitap', 'Defter', 'Kalem', 'Silgi'], correctAnswer: 'Defter' },
      { question: '"Калем" - түркчө кандай?', options: ['Kalem', 'Masa', 'Sıra', 'Tahta'], correctAnswer: 'Kalem' },
      { question: '"Китептер" - кантип айтылат?', options: ['Kitaplar', 'Kitapler', 'Kitapım', 'Kitapta'], correctAnswer: 'Kitaplar' },
      { question: '"Мектепте" - кантип айтылат?', options: ['Okulda', 'Okulte', 'Okuldan', 'Okula'], correctAnswer: 'Okulda' },
      { question: '"Сызма" (Өчүргүч) - түркчө кандай?', options: ['Silgi', 'Kalem', 'Çanta', 'Harita'], correctAnswer: 'Silgi' },
      { question: '"Сумка" - түркчө кандай?', options: ['Çanta', 'Kutu', 'Masa', 'Kapı'], correctAnswer: 'Çanta' },
      { question: '"Окуучумун" - кантип айтылат?', options: ['Öğrenciyim', 'Öğretmenim', 'Okulum', 'Sınıfım'], correctAnswer: 'Öğrenciyim' }
    ]
  },

  // ... мурунку 4 сабактын уландысы
  {
    id: 'lesson-5',
    title: '5-сабак: Тамак-аш жана Суусундуктар',
    level: 1,
    vocabulary: [
      { turkish: 'Ekmek', kyrgyz: 'Нан' },
      { turkish: 'Su', kyrgyz: 'Суу' },
      { turkish: 'Yemek', kyrgyz: 'Тамак' },
      { turkish: 'Çay', kyrgyz: 'Чай' },
      { turkish: 'Süt', kyrgyz: 'Сүт' },
      { turkish: 'Elma', kyrgyz: 'Алма' }
    ],
    grammarNote: 'Түрк маданиятында "Afiyet olsun" (Тамагыңыз таттуу болсун) деген фраза тамак ичер алдында же андан кийин сөзсүз айтылат.',
    questions: [
      { question: '"Нан" сөзүнүн түркчөсү?', options: ['Su', 'Ekmek', 'Et', 'Tuz'], correctAnswer: 'Ekmek' },
      { question: '"Суу" - түркчө кандай?', options: ['Süt', 'Su', 'Çay', 'Kahve'], correctAnswer: 'Su' },
      { question: '"Чай ичүүнү каалайм" - кайсы сөз туура?', options: ['Çay', 'Su', 'Yemek', 'Çorba'], correctAnswer: 'Çay' },
      { question: '"Алма" - түркчө кандай?', options: ['Armut', 'Elma', 'Muz', 'Çilek'], correctAnswer: 'Elma' },
      { question: '"Тамагыңыз таттуу болсун" - кантип айтылат?', options: ['Günaydın', 'Afiyet olsun', 'Lütfen', 'Merhaba'], correctAnswer: 'Afiyet olsun' },
      { question: '"Süt" - кыргызча котормосу?', options: ['Айран', 'Суу', 'Сүт', 'Шире'], correctAnswer: 'Сүт' },
      { question: '"Yemek" - бул эмне?', options: ['Тамак', 'Идиш', 'Кашык', 'Бычак'], correctAnswer: 'Тамак' },
      { question: '"Шекер" (Кант) - түркчө кандай?', options: ['Tuz', 'Şeker', 'Biber', 'Yağ'], correctAnswer: 'Şeker' },
      { question: '"Ач калдым" (Мен ачмын) - кантип айтылат?', options: ['Tokum', 'Açım', 'Susadım', 'Yorgunum'], correctAnswer: 'Açım' },
      { question: '"Суусадым" - кантип айтылат?', options: ['Açım', 'Susadım', 'Uykum var', 'İyiyim'], correctAnswer: 'Susadım' }
    ]
  },
  {
    id: 'lesson-6',
    title: '6-сабак: Убакыт жана Күндөр',
    level: 1,
    vocabulary: [
      { turkish: 'Bugün', kyrgyz: 'Бүгүн' },
      { turkish: 'Yarın', kyrgyz: 'Эртең' },
      { turkish: 'Dün', kyrgyz: 'Кечээ' },
      { turkish: 'Saat', kyrgyz: 'Саат' },
      { turkish: 'Hafta', kyrgyz: 'Апта' }
    ],
    grammarNote: 'Күндөр дайыма баш тамга менен жазылбайт, эгерде так дата көрсөтүлбөсө. Мисалы: "Pazartesi günü" (Дүйшөмбү күнү).',
    questions: [
      { question: '"Бүгүн" - түркчө кандай?', options: ['Dün', 'Bugün', 'Yarın', 'Şimdi'], correctAnswer: 'Bugün' },
      { question: '"Эртең" - түркчө кандай?', options: ['Dün', 'Yarın', 'Sabah', 'Akşam'], correctAnswer: 'Yarın' },
      { question: '"Саат канча?" - кантип сурайбыз?', options: ['Saat kaç?', 'Kaç para?', 'Neredesin?', 'Kim o?'], correctAnswer: 'Saat kaç?' },
      { question: '"Pazartesi" - кайсы күн?', options: ['Шейшемби', 'Дүйшөмбү', 'Жекшемби', 'Ишемби'], correctAnswer: 'Дүйшөмбү' },
      { question: '"Кечээ" - түркчө кандай?', options: ['Bugün', 'Dün', 'Yarın', 'Önce'], correctAnswer: 'Dün' },
      { question: '"Жекшемби" - түркчө кандай?', options: ['Cuma', 'Cumartesi', 'Pazar', 'Salı'], correctAnswer: 'Pazar' },
      { question: '"Апта" - түркчө эмне деп аталат?', options: ['Ay', 'Yıl', 'Hafta', 'Gün'], correctAnswer: 'Hafta' },
      { question: '"Эртең көрүшкөнчө" - кантип айтылат?', options: ['Yarın görüşürüz', 'Dün gördüm', 'Bugün gel', 'Şimdi git'], correctAnswer: 'Yarın görüşürüz' },
      { question: '"Эртең менен" - кайсы сөз?', options: ['Akşam', 'Gece', 'Sabah', 'Öğle'], correctAnswer: 'Sabah' },
      { question: '"Түн" - түркчө кандай?', options: ['Gün', 'Gece', 'Sabah', 'Akşam'], correctAnswer: 'Gece' }
    ]
  },
  {
    id: 'lesson-7',
    title: '7-сабак: Негизги Этиштер (Аракеттер)',
    level: 2,
    vocabulary: [
      { turkish: 'Gelmek', kyrgyz: 'Келүү' },
      { turkish: 'Gitmek', kyrgyz: 'Кетүү' },
      { turkish: 'Okumak', kyrgyz: 'Окуу' },
      { turkish: 'Yazmak', kyrgyz: 'Жазуу' },
      { turkish: 'İçmek', kyrgyz: 'Ичүү' },
      { turkish: 'Yemek', kyrgyz: 'Жеш (Тамак)' }
    ],
    grammarNote: 'Түрк тилинде этиштин баштапкы формасы "-mak/-mek" мүчөлөрү менен бүтөт. Сүйлөмдө этиш дайыма аягында келет.',
    questions: [
      { question: '"Келүү" этишинин түркчөсү?', options: ['Gitmek', 'Gelmek', 'Bakmak', 'Gülmek'], correctAnswer: 'Gelmek' },
      { question: '"Китеп окуу" - кайсы этиш колдонулат?', options: ['Yazmak', 'Okumak', 'Koşmak', 'Uyumak'], correctAnswer: 'Okumak' },
      { question: '"Жазуу" - түркчө кандай?', options: ['Okumak', 'Yazmak', 'Anlamak', 'Bilmek'], correctAnswer: 'Yazmak' },
      { question: '"Суу ичүү" - кантип айтылат?', options: ['Su içmek', 'Su yemek', 'Su gitmek', 'Su gelmek'], correctAnswer: 'Su içmek' },
      { question: '"Кетүү" - түркчө кандай?', options: ['Gelmek', 'Gitmek', 'Kalmak', 'Durmak'], correctAnswer: 'Gitmek' },
      { question: '"Жүрү кеттик" - кантип айтылат?', options: ['Hadi gidelim', 'Hadi gel', 'Hadi oku', 'Hadi yaz'], correctAnswer: 'Hadi gidelim' },
      { question: '"Мен билем" - түркчө кандай?', options: ['Biliyorum', 'Bilmiyorum', 'Anlıyorum', 'Gidiyorum'], correctAnswer: 'Biliyorum' },
      { question: '"Түшүнүп жатам" - кайсы сөз?', options: ['Anlıyorum', 'Anlamıyorum', 'Yazıyorum', 'Okuyorum'], correctAnswer: 'Anlıyorum' },
      { question: '"Уктоо" - түркчө кандай?', options: ['Uyumak', 'Uyanmak', 'Kalkmak', 'Oturmak'], correctAnswer: 'Uyumak' },
      { question: '"Көрүү" - түркчө кандай?', options: ['Bakmak', 'Görmek', 'Duymak', 'Sevmek'], correctAnswer: 'Görmek' }
    ]
  },
  {
    id: 'lesson-8',
    title: '8-сабак: Сын атоочтор (Кандай?)',
    level: 2,
    vocabulary: [
      { turkish: 'Büyük', kyrgyz: 'Чоң' },
      { turkish: 'Küçük', kyrgyz: 'Кичинекей' },
      { turkish: 'Güzel', kyrgyz: 'Кооз/Сулуу' },
      { turkish: 'Eski', kyrgyz: 'Эски' },
      { turkish: 'Yeni', kyrgyz: 'Жаңы' }
    ],
    grammarNote: 'Сын атоочтор зат атоочтун сапатын билдирет жана түрк тилинде зат атоочтон мурун келет. Мисалы: "Güzel ev" (Кооз үй).',
    questions: [
      { question: '"Чоң" - түркчө кандай?', options: ['Küçük', 'Büyük', 'Uzun', 'Kısa'], correctAnswer: 'Büyük' },
      { question: '"Кооз/Сулуу" - түркчө кандай?', options: ['Çirkin', 'Güzel', 'Kötü', 'İyi'], correctAnswer: 'Güzel' },
      { question: '"Кичинекей" - түркчө кандай?', options: ['Büyük', 'Küçük', 'Ağır', 'Hafif'], correctAnswer: 'Küçük' },
      { question: '"Жаңы" - түркчө кандай?', options: ['Eski', 'Yeni', 'Genç', 'Yaşlı'], correctAnswer: 'Yeni' },
      { question: '"Эски" - түркчө кандай?', options: ['Yeni', 'Eski', 'Temiz', 'Kirli'], correctAnswer: 'Eski' },
      { question: '"Жакшы" - түркчө кандай?', options: ['İyi', 'Kötü', 'Zor', 'Kolay'], correctAnswer: 'İyi' },
      { question: '"Жаман" - түркчө кандай?', options: ['İyi', 'Kötü', 'Hızlı', 'Yavaş'], correctAnswer: 'Kötü' },
      { question: '"Ысык" - түркчө кандай?', options: ['Soğuk', 'Sıcak', 'Ilık', 'Serin'], correctAnswer: 'Sıcak' },
      { question: '"Суук" - түркчө кандай?', options: ['Sıcak', 'Soğuk', 'Rüzgarlı', 'Güneşli'], correctAnswer: 'Soğuk' },
      { question: '"Чоң үй" - кантип айтылат?', options: ['Büyük ev', 'Küçük ev', 'Eski ev', 'Yeni ev'], correctAnswer: 'Büyük ev' }
    ]
  },
  {
    id: 'lesson-9',
    title: '9-сабак: Аба ырайы',
    level: 1,
    vocabulary: [
      { turkish: 'Güneşli', kyrgyz: 'Күн ачык' },
      { turkish: 'Yağmurlu', kyrgyz: 'Жамгырлуу' },
      { turkish: 'Karlı', kyrgyz: 'Кардуу' },
      { turkish: 'Rüzgarlı', kyrgyz: 'Шамалдуу' },
      { turkish: 'Bulutlu', kyrgyz: 'Булуттуу' }
    ],
    grammarNote: 'Аба ырайы жөнүндө сураганда "Hava nasıl?" (Аба ырайы кандай?) деп сурайбыз.',
    questions: [
      { question: '"Аба ырайы кандай?" - түркчө кантип сурайбыз?', options: ['Hava nasıl?', 'Saat kaç?', 'Nasılsın?', 'Neredesin?'], correctAnswer: 'Hava nasıl?' },
      { question: '"Күн ачык" - түркчө кандай?', options: ['Yağmurlu', 'Güneşli', 'Karlı', 'Bulutlu'], correctAnswer: 'Güneşli' },
      { question: '"Жамгыр жаап жатат" - кайсы сөз туура?', options: ['Kar', 'Yağmur', 'Rüzgar', 'Güneş'], correctAnswer: 'Yağmur' },
      { question: '"Булуттуу" - түркчө кандай?', options: ['Açık', 'Bulutlu', 'Kapalı', 'Sisli'], correctAnswer: 'Bulutlu' },
      { question: '"Кардуу" - түркчө кандай?', options: ['Karlı', 'Buzlu', 'Sıcak', 'Soğuk'], correctAnswer: 'Karlı' },
      { question: '"Шамалдуу" - түркчө кандай?', options: ['Rüzgarlı', 'Fırtınalı', 'Sakin', 'Durgun'], correctAnswer: 'Rüzgarlı' },
      { question: '"Аба абдан ысык" - кантип айтылат?', options: ['Hava çok soğuk', 'Hava çok sıcak', 'Hava güzel', 'Hava kötü'], correctAnswer: 'Hava çok sıcak' },
      { question: '"Асман" - түркчө кандай?', options: ['Deniz', 'Gökyüzü', 'Yer', 'Su'], correctAnswer: 'Gökyüzü' },
      { question: '"Күн" (Асман денеси) - түркчө кандай?', options: ['Ay', 'Yıldız', 'Güneş', 'Bulut'], correctAnswer: 'Güneş' },
      { question: '"Ай" - түркчө кандай?', options: ['Güneş', 'Ay', 'Dünya', 'Mars'], correctAnswer: 'Ay' }
    ]
  },
  {
    id: 'lesson-10',
    title: '10-сабак: Дене мүчөлөрү',
    level: 2,
    vocabulary: [
      { turkish: 'Baş', kyrgyz: 'Баш' },
      { turkish: 'Göz', kyrgyz: 'Көз' },
      { turkish: 'El', kyrgyz: 'Кол' },
      { turkish: 'Ayak', kyrgyz: 'Бут' },
      { turkish: 'Ağız', kyrgyz: 'Ооз' },
      { turkish: 'Kulak', kyrgyz: 'Кулак' }
    ],
    grammarNote: 'Дене мүчөлөрүн айтканда, эгер алар экиден болсо (көз, кол ж.б.), көптүк түрдө же жеке түрдө да колдонулушу мүмкүн.',
    questions: [
      { question: '"Баш" - түркчө кандай?', options: ['Ayak', 'El', 'Baş', 'Kol'], correctAnswer: 'Baş' },
      { question: '"Көз" - түркчө кандай?', options: ['Göz', 'Kulak', 'Burun', 'Ağız'], correctAnswer: 'Göz' },
      { question: '"Кол" - түркчө кандай?', options: ['El', 'Ayak', 'Parmak', 'Diz'], correctAnswer: 'El' },
      { question: '"Бут" - түркчө кандай?', options: ['El', 'Ayak', 'Omuz', 'Sırt'], correctAnswer: 'Ayak' },
      { question: '"Кулак" - түркчө кандай?', options: ['Göz', 'Burun', 'Kulak', 'Dil'], correctAnswer: 'Kulak' },
      { question: '"Ооз" - түркчө кандай?', options: ['Diş', 'Ağız', 'Dudak', 'Yanak'], correctAnswer: 'Ağız' },
      { question: '"Мурун" - түркчө кандай?', options: ['Burun', 'Kulak', 'Göz', 'Baş'], correctAnswer: 'Burun' },
      { question: '"Тиш" - түркчө кандай?', options: ['Dil', 'Diş', 'Dudak', 'Çene'], correctAnswer: 'Diş' },
      { question: '"Чач" - түркчө кандай?', options: ['Sakal', 'Bıyık', 'Saç', 'Kaş'], correctAnswer: 'Saç' },
      { question: '"Жүрөк" - түркчө кандай?', options: ['Akciğer', 'Mide', 'Kalp', 'Böbrek'], correctAnswer: 'Kalp' }
    ]
  },
  // ... мурунку 10 сабактын уландысы
  {
    id: 'lesson-11',
    title: '11-сабак: Кесиптер (Meslekler)',
    level: 2,
    vocabulary: [
      { turkish: 'Doktor', kyrgyz: 'Дарыгер' },
      { turkish: 'Öğretmen', kyrgyz: 'Мугалим' },
      { turkish: 'Mühendis', kyrgyz: 'Инженер' },
      { turkish: 'Polis', kyrgyz: 'Милиция' },
      { turkish: 'Aşçı', kyrgyz: 'Ашпозчу' },
      { turkish: 'Şoför', kyrgyz: 'Айдоочу' }
    ],
    grammarNote: 'Кесипти айтканда "Мен ...мун" деп айтуу үчүн тиешелүү мүчөлөр кошулат. Мисалы: "Doktorum" (Мен дарыгермин).',
    questions: [
      { question: '"Дарыгер" - түркчө кандай?', options: ['Hemşire', 'Doktor', 'Eczacı', 'Hasta'], correctAnswer: 'Doktor' },
      { question: '"Ашпозчу" - түркчө кандай?', options: ['Garson', 'Aşçı', 'Kasap', 'Manav'], correctAnswer: 'Aşçı' },
      { question: '"Инженер" - түркчө кандай?', options: ['Mimar', 'Mühendis', 'İşçi', 'Memur'], correctAnswer: 'Mühendis' },
      { question: '"Айдоочу" - түркчө кандай?', options: ['Pilot', 'Kaptan', 'Şoför', 'Binici'], correctAnswer: 'Şoför' },
      { question: '"Мен мугалиммин" - кантип айтылат?', options: ['Öğretmenim', 'Öğretmensin', 'Öğretmeniz', 'Öğretmenler'], correctAnswer: 'Öğretmenim' },
      { question: '"Сиздин кесибиңиз эмне?" - кантип сурайбыз?', options: ['Mesleğiniz ne?', 'Adınız ne?', 'Nerelisiniz?', 'Kaç yaşındasınız?'], correctAnswer: 'Mesleğiniz ne?' },
      { question: '"Полис" - кыргызча ким?', options: ['Аскер', 'Милиция', 'Өрт өчүргүч', 'Күзөтчү'], correctAnswer: 'Милиция' },
      { question: '"Бизнесмен" - түркчө кандай?', options: ['İş adamı', 'Sanatçı', 'Yazar', 'Şair'], correctAnswer: 'İş adamı' },
      { question: '"Оорукана" - түркчө кандай?', options: ['Okul', 'Hastane', 'Postane', 'Banka'], correctAnswer: 'Hastane' },
      { question: '"Жумуш" - түркчө кандай?', options: ['Ev', 'İş', 'Oyun', 'Tatil'], correctAnswer: 'İş' }
    ]
  },
  {
    id: 'lesson-12',
    title: '12-сабак: Үй жана Эмеректер',
    level: 2,
    vocabulary: [
      { turkish: 'Ev', kyrgyz: 'Үй' },
      { turkish: 'Oda', kyrgyz: 'Бөлмө' },
      { turkish: 'Mutfak', kyrgyz: 'Ашкана' },
      { turkish: 'Yatak', kyrgyz: 'Кербет' },
      { turkish: 'Masa', kyrgyz: 'Үстөл' },
      { turkish: 'Sandalye', kyrgyz: 'Отургуч' }
    ],
    grammarNote: '"Бар" жана "Жок" сөздөрү: Түрк тилинде "Var" (бар) жана "Yok" (жок) сөздөрү сүйлөмдүн аягында колдонулат.',
    questions: [
      { question: '"Ашкана" - түркчө кандай?', options: ['Banyo', 'Mutfak', 'Salon', 'Bahçe'], correctAnswer: 'Mutfak' },
      { question: '"Үстөл" - түркчө кандай?', options: ['Sıra', 'Masa', 'Dolap', 'Halı'], correctAnswer: 'Masa' },
      { question: '"Отургуч" - түркчө кандай?', options: ['Koltuk', 'Sandalye', 'Yatak', 'Perde'], correctAnswer: 'Sandalye' },
      { question: '"Бөлмө" - түркчө кандай?', options: ['Ev', 'Oda', 'Kapı', 'Pencere'], correctAnswer: 'Oda' },
      { question: '"Үйдө нан бар" - туура котормосу:', options: ['Evde ekmek var', 'Evde ekmek yok', 'Mutfakta ekmek', 'Ekmek evde'], correctAnswer: 'Evde ekmek var' },
      { question: '"Кербет" - түркчө кандай?', options: ['Yastık', 'Yorgan', 'Yatak', 'Battaniye'], correctAnswer: 'Yatak' },
      { question: '"Терезе" - түркчө кандай?', options: ['Pencere', 'Kapı', 'Duvar', 'Tavan'], correctAnswer: 'Pencere' },
      { question: '"Эшик" - түркчө кандай?', options: ['Anahtar', 'Kilit', 'Kapı', 'Zil'], correctAnswer: 'Kapı' },
      { question: '"Муздаткыч" - түркчө кандай?', options: ['Buzdolabı', 'Televizyon', 'Fırın', 'Ütü'], correctAnswer: 'Buzdolabı' },
      { question: '"Бөлмөдө эч ким жок" - кантип айтылат?', options: ['Odada kimse yok', 'Odada biri var', 'Oda boş', 'Oda dolu'], correctAnswer: 'Odada kimse yok' }
    ]
  },
  {
    id: 'lesson-13',
    title: '13-сабак: Жаныбарлар дүйнөсү',
    level: 1,
    vocabulary: [
      { turkish: 'Kedi', kyrgyz: 'Мышык' },
      { turkish: 'Köpek', kyrgyz: 'Ит' },
      { turkish: 'At', kyrgyz: 'Ат' },
      { turkish: 'Kuş', kyrgyz: 'Куш' },
      { turkish: 'Balık', kyrgyz: 'Балык' },
      { turkish: 'İnek', kyrgyz: 'Уй' }
    ],
    grammarNote: 'Жаныбарлардын аттарына көптүк түр кошулганда -lar/ler колдонулат. Мисалы: "Kediler" (Мышыктар).',
    questions: [
      { question: '"Мышык" - түркчө кандай?', options: ['Köpek', 'Kedi', 'Fare', 'Tavşan'], correctAnswer: 'Kedi' },
      { question: '"Ит" - түркчө кандай?', options: ['Kurt', 'Köpek', 'Tilki', 'Ayı'], correctAnswer: 'Köpek' },
      { question: '"Ат" - түркчө кандай?', options: ['Eşek', 'Deve', 'At', 'Zebra'], correctAnswer: 'At' },
      { question: '"Балык" - түркчө кандай?', options: ['Balık', 'Deniz', 'Göl', 'Su'], correctAnswer: 'Balık' },
      { question: '"Куш" - түркчө кандай?', options: ['Böcek', 'Kuş', 'Kanat', 'Gaga'], correctAnswer: 'Kuş' },
      { question: '"Уй" - түркчө кандай?', options: ['Koyun', 'Keçi', 'İnek', 'Boğa'], correctAnswer: 'İnek' },
      { question: '"Козу" - түркчө кандай?', options: ['Kuzu', 'Oğlak', 'Tay', 'Civciv'], correctAnswer: 'Kuzu' },
      { question: '"Арстан" - түркчө кандай?', options: ['Kaplan', 'Aslan', 'Pars', 'Kurt'], correctAnswer: 'Aslan' },
      { question: '"Тоок" - түркчө кандай?', options: ['Horoz', 'Tavuk', 'Ördek', 'Kaz'], correctAnswer: 'Tavuk' },
      { question: '"Жылан" - түркчө кандай?', options: ['Yılan', 'Akrep', 'Kertenkele', 'Kurbağa'], correctAnswer: 'Yılan' }
    ]
  },
  {
    id: 'lesson-14',
    title: '14-сабак: Транспорт жана Саякат',
    level: 2,
    vocabulary: [
      { turkish: 'Araba', kyrgyz: 'Унаа' },
      { turkish: 'Otobüs', kyrgyz: 'Автобус' },
      { turkish: 'Uçak', kyrgyz: 'Учак' },
      { turkish: 'Gemi', kyrgyz: 'Кеме' },
      { turkish: 'Tren', kyrgyz: 'Поезд' },
      { turkish: 'Bilet', kyrgyz: 'Билет' }
    ],
    grammarNote: '"Минүү" этиши үчүн "-а/е" мүчөсү колдонулат. Мисалы: "Otobüse binmek" (Автобуска минүү).',
    questions: [
      { question: '"Унаа" - түркчө кандай?', options: ['Bisiklet', 'Araba', 'Motor', 'Kamyon'], correctAnswer: 'Araba' },
      { question: '"Учак" - түркчө кандай?', options: ['Kuş', 'Bulut', 'Uçak', 'Helikopter'], correctAnswer: 'Uçak' },
      { question: '"Автобус" - түркчө кандай?', options: ['Otobüs', 'Minibüs', 'Taksi', 'Tramvay'], correctAnswer: 'Otobüs' },
      { question: '"Билет" - түркчө кандай?', options: ['Para', 'Kağıt', 'Bilet', 'Kart'], correctAnswer: 'Bilet' },
      { question: '"Кеме" - түркчө кандай?', options: ['Gemi', 'Kayık', 'Yat', 'Sandal'], correctAnswer: 'Gemi' },
      { question: '"Кайда?" - кантип сурайбыз?', options: ['Nerede?', 'Nasıl?', 'Neden?', 'Ne zaman?'], correctAnswer: 'Nerede?' },
      { question: '"Аэропорт" - түркчө кандай?', options: ['Gar', 'Liman', 'Havalimanı', 'Durak'], correctAnswer: 'Havalimanı' },
      { question: '"Саякат" - түркчө кандай?', options: ['Yol', 'Yolculuk', 'Gezi', 'Seyahat'], correctAnswer: 'Seyahat' },
      { question: '"Мен кетип жатам" - кантип айтылат?', options: ['Geliyorum', 'Gidiyorum', 'Bakıyorum', 'Duruyorum'], correctAnswer: 'Gidiyorum' },
      { question: '"Токтоочу жай" (Stop) - түркчө кандай?', options: ['Durak', 'Park', 'Yol', 'Cadde'], correctAnswer: 'Durak' }
    ]
  },
  {
    id: 'lesson-15',
    title: '15-сабак: Кийим-кече',
    level: 1,
    vocabulary: [
      { turkish: 'Elbise', kyrgyz: 'Көйнөк (аялдар)' },
      { turkish: 'Gömlek', kyrgyz: 'Көйнөк (эркектер)' },
      { turkish: 'Pantolon', kyrgyz: 'Шым' },
      { turkish: 'Ayakkabı', kyrgyz: 'Бут кийим' },
      { turkish: 'Ceket', kyrgyz: 'Пиджак' },
      { turkish: 'Şapka', kyrgyz: 'Шляпа/Калпак' }
    ],
    grammarNote: 'Кийимдердин түсүн айтканда түсү биринчи келет. Мисалы: "Mavi gömlek" (Көк көйнөк).',
    questions: [
      { question: '"Шым" - түркчө кандай?', options: ['Etek', 'Pantolon', 'Şort', 'Tayt'], correctAnswer: 'Pantolon' },
      { question: '"Бут кийим" - түркчө кандай?', options: ['Çizme', 'Terlik', 'Ayakkabı', 'Bot'], correctAnswer: 'Ayakkabı' },
      { question: '"Калпак/Шляпа" - түркчө кандай?', options: ['Şapka', 'Bere', 'Eşarp', 'Kravat'], correctAnswer: 'Şapka' },
      { question: '"Ак көйнөк" - туура котормосу:', options: ['Beyaz gömlek', 'Siyah gömlek', 'Mavi gömlek', 'Al gömlek'], correctAnswer: 'Beyaz gömlek' },
      { question: '"Пальто" - түркчө кандай?', options: ['Palto', 'Mont', 'Hırka', 'Kazak'], correctAnswer: 'Palto' },
      { question: '"Байпак" - түркчө кандай?', options: ['Eldiven', 'Çorap', 'Kemer', 'Atkı'], correctAnswer: 'Çorap' },
      { question: '"Көз айнек" - түркчө кандай?', options: ['Gözlük', 'Saat', 'Kolye', 'Küpe'], correctAnswer: 'Gözlük' },
      { question: '"Көйнөк (эркектердики)" - түркчө кандай?', options: ['Elbise', 'Gömlek', 'Tişört', 'Atlet'], correctAnswer: 'Gömlek' },
      { question: '"Көйнөк (аялдардыки)" - түркчө кандай?', options: ['Etek', 'Elbise', 'Bluz', 'Fistan'], correctAnswer: 'Elbise' },
      { question: '"Мен кийинип жатам" - кантип айтылат?', options: ['Giyiniyorum', 'Soyunuyorum', 'Yıkıyorum', 'Bakıyorum'], correctAnswer: 'Giyiniyorum' }
    ]
  },
  {
    id: 'lesson-16',
    title: '16-сабак: Эмоциялар жана Сезимдер',
    level: 2,
    vocabulary: [
      { turkish: 'Mutlu', kyrgyz: 'Бактылуу' },
      { turkish: 'Üzgün', kyrgyz: 'Капалуу' },
      { turkish: 'Yorgun', kyrgyz: 'Чарчаган' },
      { turkish: 'Kızgın', kyrgyz: 'Ачууланган' },
      { turkish: 'Korkmuş', kyrgyz: 'Коркуу' },
      { turkish: 'Şaşırmış', kyrgyz: 'Таң калган' }
    ],
    grammarNote: 'Түрк тилинде сезимдерди билдиргенде "-ум/-үм" мүчөсү кошулат. Мисалы: "Mutluyum" (Бактылуумун).',
    questions: [
      { question: '"Бактылуу" - түркчө кандай?', options: ['Üzgün', 'Kızgın', 'Mutlu', 'Yorgun'], correctAnswer: 'Mutlu' },
      { question: '"Чарчадым" - кантип айтылат?', options: ['Yorgunum', 'Hastayım', 'Tokum', 'Açım'], correctAnswer: 'Yorgunum' },
      { question: '"Капалуу" - түркчө кандай?', options: ['Mutlu', 'Üzgün', 'Neşeli', 'Canlı'], correctAnswer: 'Üzgün' },
      { question: '"Ачууланган/Жинди болгон" - кайсы сөз?', options: ['Sakin', 'Kızgın', 'Korkmuş', 'Şaşırmış'], correctAnswer: 'Kızgın' },
      { question: '"Таң калдым" - кантип айтылат?', options: ['Şaşırdım', 'Korktum', 'Güldüm', 'Ağladım'], correctAnswer: 'Şaşırdım' },
      { question: '"Күркүү" - түркчө кандай?', options: ['Sevmek', 'Korkmak', 'Gülmek', 'Ağlamak'], correctAnswer: 'Korkmak' },
      { question: '"Күлкү" - түркчө кандай?', options: ['Gülmek', 'Ağlamak', 'Bağırmak', 'Susmak'], correctAnswer: 'Gülmek' },
      { question: '"Ыйлоо" - түркчө кандай?', options: ['Gülmek', 'Ağlamak', 'Uyumak', 'Koşmak'], correctAnswer: 'Ağlamak' },
      { question: '"Мен коркуп жатам" - кантип айтылат?', options: ['Korkuyorum', 'Seviyorum', 'Biliyorum', 'Gidiyorum'], correctAnswer: 'Korkuyorum' },
      { question: '"Сүйүү" - түркчө кандай?', options: ['Nefret', 'Sevgi', 'Öfke', 'Acı'], correctAnswer: 'Sevgi' }
    ]
  }
];
export interface GrammarTopic {
  id: string;
  title: string;
  description: string;
  rule: string;
  examples: {
    turkish: string;
    kyrgyz: string;
    note?: string;
  }[];
}

export const grammarData: GrammarTopic[] = [
  {
    id: 'plural',
    title: 'Көптүк сан (-lar, -ler)',
    description: 'Түрк тилинде көптүк санды жасоо үчүн сөздүн акыркы үндүү тамгасына карап "-lar" же "-ler" мүчөсү уланат.',
    rule: 'Эгер акыркы үндүү (a, ı, o, u) болсо -> -lar. Эгер (e, i, ö, ü) болсо -> -ler.',
    examples: [
      { turkish: 'Kitap - Kitaplar', kyrgyz: 'Китеп - Китептер' },
      { turkish: 'Kedi - Kediler', kyrgyz: 'Мышык - Мышыктар' },
      { turkish: 'Araba - Arabalar', kyrgyz: 'Унаа - Унаалар' }
    ]
  },
  {
    id: 'present-continuous',
    title: 'Учур чак (-yor)',
    description: 'Учурда жасалып жаткан иш-аракетти билдирет.',
    rule: 'Этиштин уңгусуна -iyor, -uyor, -üyor же -ıyor мүчөлөрү кошулат.',
    examples: [
      { turkish: 'Geliyorum', kyrgyz: 'Келе жатам' },
      { turkish: 'Okuyor', kyrgyz: 'Окуп жатат' },
      { turkish: 'Bakıyorsun', kyrgyz: 'Карап жатасың' }
    ]
  },
  {
    id: 'question-particle',
    title: 'Суроо мүчөсү (-mı, -mi)',
    description: 'Ооба же жок деп жооп бериле турган суроолорду түзүү үчүн колдонулат.',
    rule: 'Сөздөн бөлөк жазылат: mı, mi, mu, mü.',
    examples: [
      { turkish: 'Bu kalem mi?', kyrgyz: 'Бул калемби?' },
      { turkish: 'Anladın mı?', kyrgyz: 'Түшүндүңбү?' },
      { turkish: 'Gidiyor muyuz?', kyrgyz: 'Кетип жатабызбы?' }
    ]
  },
  {
    id: 'possessive',
    title: 'Тиешелүүлүк мүчөлөрү (İyelik Ekleri)',
    description: 'Заттын кимге таандык экенин билдирүү үчүн колдонулат.',
    rule: 'Менин (-ım/im/um/üm), Сенин (-ın/in/un/ün), Анын (-ı/i/u/ü).',
    examples: [
      { turkish: 'Benim evim', kyrgyz: 'Менин үйүм' },
      { turkish: 'Senin adın', kyrgyz: 'Сенин атың' },
      { turkish: 'Onun arabası', kyrgyz: 'Анын унаасы', note: 'Үндүү менен бүтсө "s" кирет' }
    ]
  },
  {
    id: 'locative',
    title: 'Жаттык жөндөмөсү (-da, -de)',
    description: 'Заттын кайда же кимде экенин көрсөтөт.',
    rule: 'Катуу үнсүздөрдөн кийин -ta, -te болуп өзгөрөт.',
    examples: [
      { turkish: 'Okulda', kyrgyz: 'Мектепте' },
      { turkish: 'Evde', kyrgyz: 'Үйдө' },
      { turkish: 'Mutfakta', kyrgyz: 'Ашканада', note: 'k - катуу үнсүз' }
    ]
  },
  {
    id: 'dative',
    title: 'Багыттоо жөндөмөсү (-a, -e)',
    description: 'Иш-аракеттин багытын (кайда?) билдирет.',
    rule: 'Үндүү тамга менен бүткөн сөздөргө "-ya, -ye" кошулат.',
    examples: [
      { turkish: 'Eve gidiyorum', kyrgyz: 'Үйгө бара жатам' },
      { turkish: 'Okula bak', kyrgyz: 'Мектепке кара' },
      { turkish: 'Sinemaya', kyrgyz: 'Киного (Синемага)', note: 'Үндүүдөн кийин "y" кирет' }
    ]
  },
  {
    id: 'ablative',
    title: 'Чыгыш жөндөмөсү (-dan, -den)',
    description: 'Иш-аракеттин кайдан башталганын билдирет.',
    rule: 'Катуу үнсүздөрдөн кийин -tan, -ten болот.',
    examples: [
      { turkish: 'Evden çıkıyorum', kyrgyz: 'Үйдөн чыгып жатам' },
      { turkish: 'Marketten geldim', kyrgyz: 'Маркеттен келдим' },
      { turkish: 'Senden aldım', kyrgyz: 'Сенден алдым' }
    ]
  },
  {
    id: 'past-tense',
    title: 'Өткөн чак (-di, -dı)',
    description: 'Мурда болуп өткөн так ишти билдирет.',
    rule: 'Этишке -di, -dı, -du, -dü же катуулардан кийин -ti, -tı кошулат.',
    examples: [
      { turkish: 'Gittim', kyrgyz: 'Кеттим' },
      { turkish: 'Yaptın', kyrgyz: 'Жасадың' },
      { turkish: 'Okudu', kyrgyz: 'Окуду' }
    ]
  },
  {
    id: 'negative-verb',
    title: 'Этиштин терс түрү (-ma, -me)',
    description: 'Иш-аракеттин жасалбаганын билдирет.',
    rule: 'Этиштин уңгусунан кийин дароо кошулат.',
    examples: [
      { turkish: 'Bilmiyorum', kyrgyz: 'Билбейм' },
      { turkish: 'Gitme', kyrgyz: 'Кетпе' },
      { turkish: 'Okumadı', kyrgyz: 'Окуган жок' }
    ]
  }
];
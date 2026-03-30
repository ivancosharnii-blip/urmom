"use client";

import Image from "next/image";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  description?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/photos/1.avif",
    alt: "Библейская гравюра, файл 1.avif",
    title: "Библейская гравюра",
    category: "Гравюра",
    description:
      "Монохромная гравюра в духе больших иллюстрированных изданий XIX века: очень плотная перекрёстная штриховка, резкий контраст света и тени и театральная постановка фигур. Несколько планов — от переднего плана с персонажами до дальнего пейзажа или неба — создают глубину; детали одежды и облаков прорисованы мелкой линией, типичной для гравюры на дереве или металле.",
  },
  {
    id: 2,
    src: "/photos/2.jpeg",
    alt: "Архангел Михаил побеждает сатану, гравюра в стиле Доре",
    title: "Архангел Михаил и поверженный сатана",
    category: "Гравюра",
    description:
      "Сцена в манере классических библейских иллюстраций (близко к работам Гюстава Доре): вверху — крылатый архангел Михаил в доспехах и с нимбом, с размахом поднятым мечом; ногой он опирается на поверженного соперника. Внизу — мускулистая фигура демона с рогами и крыльями летучей мыши, в позе поражения. Небо в кружащихся облаках, слева — удар молнии; вся композиция построена на противопоставлении света и тьмы через штриховку.",
  },
  {
    id: 3,
    src: "/photos/3.jpeg",
    alt: "Искушение Христа на горе, гравюра Доре",
    title: "Искушение Христа",
    category: "Гравюра",
    description:
      "Иллюстрация к евангельскому эпизоду: Иисус стоит на краю скалы, вокруг головы — яркий нимб; поза спокойная, взгляд устремлён вверх. Слева сзади — на коленях крылатый сатана с рогами, он указывает на простор долины и далёкие города — момент искушения царствами мира. Скалы и облака выведены плотной штриховкой; горизонт уходит в дымку.",
  },
  {
    id: 4,
    src: "/photos/4.jpeg",
    alt: "Вознесение Христа, рисунок карандашом или углём",
    title: "Вознесение (или слава Христа)",
    category: "Рисунок",
    description:
      "Вертикальная композиция: фигура Христа в длинных складках одежды поднимается навстречу сиянию сверху. Руки раскинуты, голова откинута к источнику света; от него расходятся прямые лучи, образуя ореол. Нижняя часть кадра — тёмные объёмные облака, отделяющие небесное от земного.",
  },
  {
    id: 5,
    src: "/photos/5.jpeg",
    alt: "Фрагмент потолка Палаццо Барберини, Давид с головой Голиафа",
    title: "Давид и голова Голиафа (фреска Кортоны)",
    category: "Фреска",
    description:
      "Фрагмент потолка Палаццо Барберини в Риме — Триумф Божественного Провидения и власти Барберини, фреска Пьетро да Кортона, 1630-е. Внизу — юный Давид с отсечённой головой гиганта Голиафа в руках: голова крупная, с длинными волосами и бородой; жест Давида — победа слабого над сильным. В аллегории фрески это триумф церкви и рода Барберини; вокруг — множество фигур, квадратура и барочный каменный каркас.",
  },
  {
    id: 6,
    src: "/photos/6.avif",
    alt: "Библейская гравюра, файл 6.avif",
    title: "Библейская гравюра",
    category: "Гравюра",
    description:
      "Монохромная работа из того же визуального ряда: масштабная сцена с множеством фигур и деталей фона. Свет и тень делят плоскость на выразительные пятна; персонажи связаны динамикой жестов. Техника — уверенная линия и насыщенная штриховка без цвета.",
  },
];

export function MasonryGallery() {
  return (
    <section id="gallery" className="py-12 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-2">Мои работы</h2>
        <p className="text-muted-foreground mb-8">
          Избранные проекты и фотографии
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer group"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-20 pb-3 px-3 md:pt-24 md:pb-4 md:px-4 pointer-events-none">
                {item.category && (
                  <span className="inline-block px-2 py-0.5 bg-amber-500/85 text-black/90 text-[10px] md:text-xs font-semibold uppercase mb-1.5 w-fit">
                    {item.category}
                  </span>
                )}
                {item.title && (
                  <h3 className="text-white/85 text-sm md:text-base font-bold leading-tight">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-white/45 text-[11px] md:text-xs mt-1.5 leading-snug line-clamp-6 md:line-clamp-7">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

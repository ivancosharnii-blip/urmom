import { MasonryGallery } from "@/components/masonry-gallery";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <section
        id="about"
        className="scroll-mt-20 border-b border-border"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2
            id="about-heading"
            className="text-3xl font-bold text-foreground mb-4"
          >
            Обо мне
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-4">
            Привет, я Ваня Кошарный — начинающий миллионер. Ставлю амбициозные
            цели, пробую новое и делюсь путём: проекты, идеи и то, что вдохновляет
            двигаться вперёд.
          </p>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Здесь собраны мои работы и фотографии. Если хочешь связаться —
            пиши на почту или в соцсетях, ссылки в шапке и внизу страницы.
          </p>
        </div>
      </section>
      <MasonryGallery />
    </div>
  );
}

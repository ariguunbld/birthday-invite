import { notFound } from "next/navigation";
import { findGuest } from "@/lib/db";
import Confetti from "@/components/Confetti";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function InvitePage({ params }: Readonly<Props>) {
  const { id } = await params;
  const guest = await findGuest(id);

  if (!guest) notFound();

  return (
    <div className="relative min-h-screen bg-white text-[#0F172A] selection:bg-pink-100">
      <Confetti />

      {/* Background Mesh */}
      <div className="mesh-bg">
        <div className="mesh-blob blob-1" />
        <div className="mesh-blob blob-2" />
        <div className="mesh-blob blob-3" />
      </div>

      <main className="relative z-10 mx-auto max-w-2xl px-6 py-12">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <div className="mb-12">
            <div className="hero-photo-wrap">
              <div className="hero-photo-ring" />
              <div className="hero-photo-frame">
                <Image
                  src="/child.jpeg"
                  alt="Birthday Child"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hero-badge">
                <span className="badge-num text-2xl leading-none">1</span>
                <span className="text-[8px] font-black uppercase tracking-tighter text-gray-400">
                  Нас
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#3B82F6]">
              Урилга
            </p>
            <h1 className="hero-line leading-tight">{guest.name}</h1>
            <h2 className="hero-line hero-line--coral text-4xl sm:text-6xl">
              Таныг урьж байна
            </h2>
          </div>
        </section>

        {/* Poem Section */}
        <section className="mb-24 text-center">
          <div className="mx-auto max-w-sm space-y-4 px-4">
            <div className="h-px w-12 bg-pink-200 mx-auto" />
            <p className="text-sm font-medium leading-relaxed italic text-gray-500">
              &quot;Алтан наран мандахад алгаан тосож угтсан,
              <br />
              Ариун цагаан сүүн соёлтой монгол хүү болон төрсөн.
              <br />
              Анхны минь төрсөн өдөр - амьдралын минь нэгэн баяр,
              <br />
              Аав ээжийнхээ хамт таныг бид хүлээж байна.&quot;
            </p>
            <div className="h-px w-12 bg-pink-200 mx-auto" />
          </div>
        </section>

        {/* Photo Gallery (Polaroids) */}
        <section className="mb-24 -mx-6">
          <div className="px-6 mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Миний нэг жил
            </h3>
          </div>
          <div className="photos-scroll">
            {[
              {
                src: "/image1.jpeg",
                rot: "-2deg",
                cap: "Миний анхны инээмсэглэл",
              },
              {
                src: "/with-parents.jpeg",
                rot: "3deg",
                cap: "Аав ээжтэйгээ хамт",
              },
              { src: "/image2.jpeg", rot: "-1deg", cap: "Тоглох хамгийн гоё" },
              { src: "/image3.jpeg", rot: "2deg", cap: "Анхны алхам" },
            ].map((p) => (
              <div
                key={p.src}
                className="polaroid-card"
                style={{ "--rot": p.rot } as React.CSSProperties}
              >
                <div className="tape" />
                <div className="photo-frame">
                  <Image
                    src={p.src}
                    alt={p.cap}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="polaroid-caption">{p.cap}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Details Grid */}
        <section className="relative z-10 py-20 px-6 max-w-sm mx-auto">
          <div className="detail-grid">
            {/* Date */}
            <div className="detail-card">
              <p className="detail-label">Хэзээ</p>
              <div className="detail-divider" />
              <p className="detail-val">5 сарын 2</p>
              <p className="detail-sub text-[0.65rem] text-[#64748B] italic">
                Бямба
              </p>
            </div>

            {/* Time */}
            <div className="detail-card">
              <p className="detail-label">Хэдэн цагт</p>
              <div className="detail-divider" />
              <p className="detail-val">12:00</p>
              <p className="detail-sub text-[0.65rem] text-[#64748B] italic">
                Үдийн зоог
              </p>
            </div>

            {/* Location */}
            <div className="detail-card detail-card--full">
              <p className="detail-label">Байршил</p>
              <div className="detail-divider" />
              <p className="detail-val text-balance text-[1rem]">
                Зайсан, Хан голомт резиденс
              </p>
              <p className="detail-sub not-italic font-medium mt-1 text-[#64748B] text-[0.75rem]">
                Club House, 1-р давхар
              </p>
              <a
                href="https://www.google.com/maps/search/Khan+Golomt+Residence+Zaisan+Ulaanbaatar"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 text-[#3B82F6] text-[0.65rem] font-bold tracking-widest uppercase border border-[rgba(59,130,246,0.15)] px-4 py-2 rounded-full transition-colors hover:bg-[rgba(59,130,246,0.05)] active:scale-95 mx-auto w-fit"
              >
                <span>📍 Google Map харах</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 px-5 pb-24 flex justify-center">
          <div className="cta-card">
            <div className="cta-inner">
              <p className="font-(family-name:--font-playfair) text-xl italic text-[#0F172A] mb-2 text-center">
                Та бүхнийг тэсэн ядан хүлээж байна! 🥳
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

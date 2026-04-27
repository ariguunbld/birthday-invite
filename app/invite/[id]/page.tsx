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
        <section className="mb-24">
          <div className="detail-grid">
            <div className="detail-card">
              <p className="detail-label">Огноо</p>
              <div className="detail-divider" />
              <p className="detail-val">2026.04.27</p>
            </div>
            <div className="detail-card">
              <p className="detail-label">Цаг</p>
              <div className="detail-divider" />
              <p className="detail-val">15:00</p>
            </div>
            <div className="detail-card detail-card--full">
              <p className="detail-label">Байршил</p>
              <div className="detail-divider" />
              <p className="detail-val">&quot;Sky Garden&quot; Ресторан</p>
              <p className="mt-2 text-[10px] text-gray-400">
                Сүхбаатар дүүрэг, 1-р хороо
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

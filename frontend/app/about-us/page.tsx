"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Mail, Code, Palette, Database, Layers } from "lucide-react"
import { useTheme } from "next-themes"

export default function AboutPage() {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    // Cores dinâmicas
    const accent = isDark ? "#FF96B2" : "#FF96B2"
    const accentBg = isDark ? "#FF96B2" : "#FF96B2"
    const accentBgLight = isDark ? "#FF96B2" : "#FF96B2"
    const textMain = isDark ? "#F3F3F3" : "#313131"
    const textSub = isDark ? "#F3F3F3B3" : "#313131B3"
    const cardBg = isDark ? "#23232B" : "#FFFFFF"
    const sectionBg = isDark ? "#18181B" : "#EFEFEF"
    const borderColor = isDark ? "#FF96B2" : "#FF96B2"

    const team = [
        {
            name: "Rafael Almeida",
            role: "Supervisor & Fullstack Developer",
            bio: "Líder técnico com mais de 5 anos de experiência em desenvolvimento web. Responsável pela arquitetura do sistema e supervisão da equipe.",
            image: "/rafa.png?height=300&width=300",
            instagram: "rafokes",
            email: " raphael.k.business@gmail.com",
            
        },
        {
            name: "Gustavo Robrigus",
            role: "Frontend Developer",
            bio: "Especialista em React e Next.js com paixão por criar interfaces intuitivas e responsivas. Responsável por toda a experiência do usuário.",
            image: "/eu.jpg?height=300&width=300",
            instagram: "gustav_grs",
            email: "guta.gu.112007.55@gmail.com",
            
        },
        {
            name: "Otavio Emanoel",
            role: "Backend Developer",
            bio: "Engenheiro de software com foco em APIs robustas e seguras. Especialista em Node.js e bancos de dados. Responsável pela infraestrutura do sistema.",
            image: "/otavio.jpg?height=300&width=300",
            instagram: "_otavio.js",
            email: "otavioemanuel6b@gmail.com",
            
        },
        {
            name: "Maykon Sullyvan",
            role: "UI/UX Designer",
            bio: "Designer criativo com olhar apurado para detalhes e usabilidade. Responsável pelo visual elegante e experiência fluida da plataforma.",
            image: "/mayko.jpg?height=300&width=300",
            instagram: "sullyvan_mk",
            email: "maykonsullyvan12@gmail.com",
            
        },
    ]

    return (
        <div className={isDark ? "min-h-screen bg-[#18181B]" : "min-h-screen bg-white"}>
            {/* Hero Section */}
            <section
            className="relative text-white py-16 md:py-20"
            style={{
                background: isDark
                ? "linear-gradient(135deg, #FF96B2 0%, #18181B 100%)"
                : "linear-gradient(135deg, #FF96B2 0%, #FF96B2cc 100%)",
            }}
            >
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Sobre a Beyond</h1>
                <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">Transformando ideias em soluções digitais inovadoras</p>
                </div>
            </div>
            </section>

            {/* About Company */}
            <section className="py-12 md:py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
                    <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <div className="relative h-56 sm:h-72 md:h-80 w-full">
                        <div
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        style={{ background: `${accent}/10` }}
                        ></div>
                        <div
                        className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-full h-full border-2 rounded-lg"
                        style={{ borderColor: accent }}
                        ></div>
                        <div
                        className="absolute top-2 left-2 sm:top-4 sm:left-4 w-full h-full shadow-lg rounded-lg flex items-center justify-center"
                        style={{ background: cardBg }}
                        >
                        <div className="text-center p-4 sm:p-8">
                            <img src="/beyond.png" alt="Beyond Logo" className="w-20 sm:w-28 md:w-32 mb-4 rounded-lg mx-auto" />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="w-full md:w-1/2">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6" style={{ color: textMain }}>
                        Nossa Missão
                    </h2>
                    <p className="mb-3 md:mb-4 text-base sm:text-lg" style={{ color: textSub }}>
                        Na Beyond, acreditamos que a tecnologia deve ser acessível e transformadora. Nossa missão é criar
                        soluções digitais que vão além das expectativas, combinando design elegante com funcionalidade
                        robusta.
                    </p>
                    <p className="mb-4 md:mb-6 text-base sm:text-lg" style={{ color: textSub }}>
                        Fundada em 2022, nossa empresa nasceu da paixão por criar experiências digitais excepcionais que
                        resolvem problemas reais e impulsionam o sucesso dos nossos clientes.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-2 sm:mr-3"
                            style={{ background: `${accent}1A` }}
                        >
                            <span className="font-bold text-base sm:text-lg" style={{ color: accent }}>
                            50+
                            </span>
                        </div>
                        <span className="text-sm sm:text-base" style={{ color: textMain }}>Projetos Entregues</span>
                        </div>
                        <div className="flex items-center">
                        <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-2 sm:mr-3"
                            style={{ background: `${accent}1A` }}
                        >
                            <span className="font-bold text-base sm:text-lg" style={{ color: accent }}>
                            100%
                            </span>
                        </div>
                        <span className="text-sm sm:text-base" style={{ color: textMain }}>Satisfação</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

            {/* Team Section */}
            <section className="py-20" style={{ background: sectionBg }}>
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4" style={{ color: textMain }}>
                            Conheça Nossa Equipe
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: textSub }}>
                            Profissionais apaixonados por tecnologia e inovação, trabalhando juntos para criar soluções excepcionais
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <Card
                                key={index}
                                className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                                style={{ background: cardBg }}
                            >
                                <div
                                    className="relative h-64 flex items-center justify-center"
                                    style={{
                                        background: isDark
                                            ? "linear-gradient(135deg, #FF96B233 0%, #23232B 100%)"
                                            : "linear-gradient(135deg, #FF96B233 0%, #FF96B21A 100%)",
                                    }}
                                >
                                    {/* No icon property for member */}
                                    <Image
                                        src={member.image || "/placeholder.svg"}
                                        alt={member.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-1" style={{ color: textMain }}>
                                        {member.name}
                                    </h3>
                                    <p className="font-medium mb-3" style={{ color: accent }}>
                                        {member.role}
                                    </p>
                                    <p className="text-sm mb-4" style={{ color: textSub }}>
                                        {member.bio}
                                    </p>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="hover:text-white"
                                            style={{
                                                borderColor: borderColor,
                                                color: accent,
                                                background: isDark ? "#23232B" : "#fff",
                                                ...(isDark
                                                    ? { "--tw-border-opacity": "1" }
                                                    : {}),
                                            }}
                                            asChild
                                        >
                                            <Link
                                                href={`https://instagram.com/${member.instagram}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Instagram className="w-4 h-4 mr-2" />
                                                Instagram
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="hover:text-white"
                                            style={{
                                                borderColor: borderColor,
                                                color: accent,
                                                background: isDark ? "#23232B" : "#fff",
                                                ...(isDark
                                                    ? { "--tw-border-opacity": "1" }
                                                    : {}),
                                            }}
                                            asChild
                                        >
                                            <Link href={`mailto:${member.email}`}>
                                                <Mail className="w-4 h-4 mr-2" />
                                                Email
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4" style={{ color: textMain }}>
                            Nossos Valores
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto" style={{ color: textSub }}>
                            Princípios que guiam nosso trabalho e relacionamento com clientes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((num, idx) => (
                            <div className="text-center p-6" key={num}>
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ background: `${accent}1A` }}
                                >
                                    <span className="text-2xl font-bold" style={{ color: accent }}>
                                        {num}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: textMain }}>
                                    {idx === 0 && "Inovação"}
                                    {idx === 1 && "Qualidade"}
                                    {idx === 2 && "Colaboração"}
                                </h3>
                                <p style={{ color: textSub }}>
                                    {idx === 0 &&
                                        "Buscamos constantemente novas tecnologias e abordagens para oferecer soluções de ponta aos nossos clientes."}
                                    {idx === 1 &&
                                        "Comprometimento com a excelência em cada linha de código e em cada pixel de design que entregamos."}
                                    {idx === 2 &&
                                        "Acreditamos no poder do trabalho em equipe e na parceria próxima com nossos clientes para alcançar resultados extraordinários."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-20 text-white"
                style={{
                    background: isDark ? "#23232B" : "#313131",
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Vamos trabalhar juntos?</h2>
                    <p className="text-xl mb-8 opacity-90">Entre em contato para discutir seu próximo projeto</p>
                    <Link href="https://mail.google.com/">
                        <Button
                            size="lg"
                            className="font-semibold"
                            style={{
                                background: accent,
                                color: "#fff",
                                borderColor: accent,
                            }}
                        >
                            Fale Conosco
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

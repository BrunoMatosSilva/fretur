import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer">
        <div className="footer-brand">
          <Image src="/images/logo-fretur.png" alt="Fretur Fretamento e Turismo" width={560} height={346} />
          <p>
            Transporte executivo, turismo, transfer para aeroportos, fretamento de ônibus e atendimento para eventos em
            São Paulo.
          </p>
        </div>

        <div className="footer-col">
          <strong>Navegação</strong>
          <Link href="/#servicos">Serviços</Link>
          <Link href="/#frota">Frota</Link>
          <Link href="/#vantagens">Vantagens</Link>
          <Link href="/#quem-somos">Quem somos</Link>
          <Link href="/noticias">Notícias</Link>
          <Link href="/#contato">Contato</Link>
        </div>

        <div className="footer-col">
          <strong>Base de atendimento</strong>
          <div className="footer-place">
            <Icon name="i-pin" />
            <p>
              <b>Guarulhos · SP</b>Pessoas movem grandes histórias.
            </p>
          </div>
          <p style={{ marginTop: 14 }}>
            <b style={{ color: "#fff", fontWeight: 500 }}>Atuação</b>
            <br />
            Corporativo, turismo, eventos, receptivo e viagens em grupo
          </p>
        </div>

        <div className="footer-col">
          <strong>WhatsApp</strong>
          <a
            className="footer-contact"
            href={waLink("Olá! Vim pelo site da Fretur e gostaria de solicitar um orçamento.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="i-wa" />
            (11) 97745-2500
          </a>
          <p>Atendimento rápido para orçamentos e reservas.</p>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Fretur Fretamento e Turismo LTDA. Todos os direitos reservados.</span>
        <span>Fretamento · Turismo · Traslados</span>
      </div>
    </footer>
  );
}

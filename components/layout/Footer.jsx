import Link from 'next/link';
import Container from './Container';

const FOOTER_LINKS = {
  Shop: [
    { label: 'Women', href: '/shop/women' },
    { label: 'Men', href: '/shop/men' },
    { label: 'Kids', href: '/shop/kids' },
    { label: 'Bags', href: '/shop/bags' },
    { label: 'Customize', href: '/customize' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Help: [
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'FAQ', href: '/faq' },
  ],
};

export default function Footer() {
  return (
    <footer
      className="mt-24 text-white"
      style={{ background: '#3b544d' }}
    >
      <Container className="py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-display text-2xl sm:text-3xl tracking-wide text-[#F8F4ED]">
              Skein &amp; Stitch
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#D8D2C7]">
              Handmade knitwear and crochet pieces crafted slowly,
              thoughtfully, and designed to last.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#C8B38B]">
                {heading}
              </h3>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#ECE7DE] transition-colors duration-300 hover:text-[#E7C98C]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="my-14 flex justify-center">
          <div className="h-px w-24 bg-[#C8B38B]/30" />
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-xs tracking-wide text-[#A8B2AE]">
            © {new Date().getFullYear()} Skein &amp; Stitch. All rights reserved.
          </p>

          <p className="text-xs uppercase tracking-[0.25em] text-[#8FA49A]">
            Handmade • Made To Order
          </p>
        </div>
      </Container>
    </footer>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

import Container from './Container';
import DesktopNav from './DesktopNav';
import HeaderActions from './HeaderActions';
import MobileNav from './MobileNav';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAdmin(!!session);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: scrolled
            ? 'rgba(255,253,250,.94)'
            : 'rgb(138,153,77)',
          backdropFilter: scrolled ? 'blur(18px)' : 'blur(0px)',
          boxShadow: scrolled
            ? '0 8px 30px rgba(0,0,0,.08)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.35 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Announcement */}

        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ height: 44, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-b border-white/10"
            >
              <div className="relative flex h-11 items-center justify-center px-8 sm:px-10">
                <p
                  className={`text-center text-[8px] xs:text-[9px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.28em] uppercase leading-tight ${
                    scrolled ? 'text-ink-900/70' : 'text-white/90'
                  }`}
                >
                  <span className="hidden sm:inline">Complimentary Shipping on Orders Over $75 • Handmade to Order</span>
                  <span className="sm:hidden">Free Shipping Over $75</span>
                </p>

                <button
                  onClick={() => setShowAnnouncement(false)}
                  className="absolute right-5 rounded-full p-1 hover:bg-white/10"
                >
                  <XMarkIcon
                    className={`h-4 w-4 ${
                      scrolled ? 'text-ink-900' : 'text-white'
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo */}

        <Container className="flex h-20 items-center justify-between xs:relative xs:justify-center">
          <Link
            href="/"
            className={`font-display text-[16px] xs:text-[19px] sm:text-[22px] lg:text-[26px] tracking-[0.04em] xs:tracking-[0.06em] sm:tracking-[0.08em] transition-colors duration-300 ${
              scrolled ? 'text-ink-900' : 'text-white'
            }`}
          >
            Skein &amp; Stitch
          </Link>

          <div className="xs:absolute xs:right-3 sm:right-6 lg:right-8">
            <HeaderActions
              scrolled={scrolled}
              isAdmin={isAdmin}
              setMobileOpen={setMobileOpen}
            />
          </div>
        </Container>
        

        {/* Desktop Navigation */}

        <div
          className={`hidden lg:block border-t transition-colors duration-300 ${
            scrolled ? 'border-stone-200' : 'border-white/15'
          }`}
        >
          <Container className="flex h-14 items-center justify-center">
            <DesktopNav scrolled={scrolled} />
          </Container>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileNav
            isAdmin={isAdmin}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
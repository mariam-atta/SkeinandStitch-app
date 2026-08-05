import Link from 'next/link';
import WishlistButton from './WishlistButton';

export default function WishlistProductCard({ product, onRemove }) {
  const { slug, name, price, salePrice, stock } = product;
  const isOutOfStock = stock === 0;
  const displayPrice = salePrice ?? price;

  return (
    <div className="group">
      <div className="relative aspect-[3/4] w-full rounded-lg bg-stone-200/60 mb-3 overflow-hidden flex items-center justify-center">
        <Link href={`/product/${slug}`}>
          {/* Placeholder image block — swap for real product image via next/image */}
          <span className="text-xs text-ink-900/40">Image</span>
        </Link>

        <div className="absolute top-3 right-3">
          <WishlistButton
            isSaved={true}
            onToggle={() => onRemove(product)}
            className="h-8 w-8 rounded-full bg-cream-0/90 shadow-sm"
          />
        </div>

        {isOutOfStock && (
          <span className="absolute top-3 left-3 rounded-full bg-ink-900 px-3 py-1 text-[11px] font-medium text-cream-0">
            Out of stock
          </span>
        )}
      </div>

      <Link href={`/product/${slug}`}>
        <p className="text-sm font-medium text-ink-900 group-hover:text-juniper-700 transition-colors mb-1">
          {name}
        </p>
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-sm text-ink-900/70">${displayPrice.toFixed(2)}</span>
        {salePrice && (
          <span className="text-sm text-ink-900/40 line-through">${price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
}